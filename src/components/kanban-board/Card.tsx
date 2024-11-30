import { Button } from '@/components/ui/button';
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { CardProps } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { MultiSelect } from '../MultiSelect';
import { DropIndicator } from './DropIndicator';

export const Card = ({ message, id, projectId, type, completed, handleDragStart, setCards, collaborators, assignees }: CardProps) => {
	const [checked, setChecked] = useState(completed);
	const [todoMessage, setTodoMessage] = useState(message);
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState(message);
	const [open, setOpen] = useState(false);
	const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
	const [savedAssignees, setSavedAssignees] = useState<string[]>([]);
	const [init, setInit] = useState(true);
	const [color, setColor] = useState<string>('hsl(0,0%,100%)');

	const { toast } = useToast();

	useEffect(() => {
		if (assignees.length > 0) {
			const newUsers = assignees.map(({ id }) => id);
			setSelectedAssignees(newUsers);
			setSavedAssignees(newUsers);
			const tempColor = assignees[0].color;
			setColor(`hsl(${tempColor.split(' ')[0]},${tempColor.split(' ')[1]}%,${tempColor.split(' ')[2]}%)`);
		}

		setInit(false);
	}, []);

	const markAsComplete = () => {
		if (checked) {
			api.post(`/projects/${projectId}/todos/${id}/uncomplete?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					toast({
						title: 'Success!',
						description: `Task has been successfully unmarked as completed!`
					});
				})
				.catch((err) => {
					console.log(err);
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: 'Error occured while unmarking card as completed.'
					});
				});
		} else {
			api.post(`/projects/${projectId}/todos/${id}/complete?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					toast({
						title: 'Success!',
						description: `Task has been successfully marked as completed!`
					});
				})
				.catch((err) => {
					console.log(err);
					toast({
						variant: 'destructive',
						title: 'Uh oh! Something went wrong.',
						description: 'Error occured while marking card as completed.'
					});
				});
		}

		setChecked(!checked);
	};

	const saveMessage = () => {
		api.post(`/projects/${projectId}/todos/${id}/edit?token=${localStorage.getItem('token')}`, {
			message: editText,
			type
		})
			.then((resp) => {
				setTodoMessage(editText);
				setEditing(false);
				toast({
					title: 'Success!',
					description: `Task has been successfully updated!`
				});
			})
			.catch((err) => {
				console.log(err);
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'Error occured while updating card.'
				});
			});
	};

	const deleteCard = () => {
		setCards((pv) => pv.filter((c) => c.id !== id));
		api.delete(`/projects/${projectId}/todos/${id}?token=${localStorage.getItem('token')}`)
			.then((resp) => {
				console.log(resp.data);
				toast({
					title: 'Success!',
					description: `Task has been successfully deleted!`
				});
			})
			.catch((err) => {
				console.log(err);
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'Error occured while deleting card.'
				});
			});
	};

	const addAssignee = () => {
		api.put(`/projects/${projectId}/todos/${id}/assignees?token=${localStorage.getItem('token')}`, {
			assigneeIds: selectedAssignees
		})
			.then((resp) => {
				if (resp.data.length > 0) {
					const tempColor = resp.data[0].color;
					setColor(`hsl(${tempColor.split(' ')[0]},${tempColor.split(' ')[1]}%,${tempColor.split(' ')[2]}%)`);
				}
                else {
                    setColor('hsl(0,0%,100%)')
                }
				setSavedAssignees(selectedAssignees);
				setOpen(false);
				toast({
					title: 'Success!',
					description: `Assignees have been successfully updated!`
				});
			})
			.catch((err) => {
				console.log(err);
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: 'Error occured while updating assignees.'
				});
			});
	};

	if (init) return null;

	return (
		<>
			<DropIndicator beforeId={id} column={type} />
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className='sm:max-w-md bg-[#ffffff]'>
					<DialogHeader>
						<DialogTitle>Edit Assignees</DialogTitle>
						<DialogDescription>Choose who you want to assign to this task!</DialogDescription>
					</DialogHeader>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='name'>Assignees</Label>
								<MultiSelect
									options={collaborators}
									onValueChange={setSelectedAssignees}
									defaultValue={savedAssignees}
									placeholder='Select assignees'
									variant='inverted'
									animation={2}
									maxCount={3}
								/>
							</div>
						</div>
					</form>
					<DialogFooter>
						<Button className='w-full' onClick={addAssignee}>
							Save changes
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<ContextMenu>
				<ContextMenuTrigger>
					<motion.div
						layout
						layoutId={id}
						draggable={editing ? 'false' : 'true'}
						onDragStart={(e) => handleDragStart(e, { message, id, type })}
						className={`cursor-grab rounded p-3 active:cursor-grabbing flex flex-col gap-2`}
						style={{ backgroundColor: color }}
					>
						{checked && (
							<div className='bg-green-300 rounded flex w-fit py-1 px-2'>
								<p className='text-xs text-green-800'>Completed</p>
							</div>
						)}
						<div className='flex'>
							<TooltipProvider>
								{collaborators
									.filter((collab) => savedAssignees.find((assign) => assign === collab.id))
									.map((collab) => (
										<Tooltip key={collab.id}>
											<TooltipTrigger asChild>
												<img src={collab.avatar} className='h-6 w-6 mr-2 rounded-xl'></img>
											</TooltipTrigger>
											<TooltipContent>{collab.name}</TooltipContent>
										</Tooltip>
									))}
							</TooltipProvider>
						</div>
						{editing && (
							<>
								<textarea
									value={editText}
									onChange={(e) => setEditText(e.target.value)}
									autoFocus
									placeholder='Add new task...'
									className='w-full rounded border border-neutral-50 bg-neutral-50/20 p-3 text-sm text-black placeholder-gray-200 focus:outline-0 z-10'
								/>
								<div className='mt-1.5 flex items-center justify-end gap-1.5'>
									<button
										onClick={() => setEditing(false)}
										className='px-3 py-1.5 text-xs text-black transition-colors hover:bg-gray-100/50 rounded'
									>
										Cancel
									</button>
									<button
										type='submit'
										className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
										onClick={saveMessage}
									>
										<span>Save</span>
									</button>
								</div>
							</>
						)}
						{!editing && <p className='text-sm text-black'>{todoMessage}</p>}
					</motion.div>
				</ContextMenuTrigger>
				<ContextMenuContent className='w-48'>
					<ContextMenuItem
						onClick={() => {
							setEditText(todoMessage);
							setEditing(true);
						}}
						className='cursor-pointer'
					>
						<FiEdit2 className='mr-[10px]'></FiEdit2>
						Edit
					</ContextMenuItem>
					<ContextMenuSeparator />

					<ContextMenuItem onClick={() => setOpen(true)} className='cursor-pointer'>
						<FiPlus className='mr-[10px]'></FiPlus>
						Edit assignees
					</ContextMenuItem>
					<ContextMenuCheckboxItem onCheckedChange={markAsComplete} checked={checked} className='cursor-pointer'>
						Mark as completed
					</ContextMenuCheckboxItem>
					<ContextMenuSeparator />

					<ContextMenuItem onClick={deleteCard} className='cursor-pointer'>
						<FiTrash className='mr-[10px]'></FiTrash>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</>
	);
};
