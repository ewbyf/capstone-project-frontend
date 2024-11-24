import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger
} from '@/components/ui/context-menu';
import { CardProps } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { DropIndicator } from './DropIndicator';

export const Card = ({ message, id, projectId, type, completed, handleDragStart, setCards }: CardProps) => {
	const [checked, setChecked] = useState(false);
	const [isCompleted, setIsCompleted] = useState(completed);
	const [todoMessage, setTodoMessage] = useState(message);
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState(message);

	const markAsComplete = () => {
		// if (checked) {

		// } else {

		// }
		api.post(`/projects/${projectId}/todos/${id}/complete?token=${localStorage.getItem('token')}`)
			.then((resp) => {
				setIsCompleted(true);
			})
			.catch((err) => {
				console.log(err);
			});

		setChecked(!checked);
	};

    const saveMessage = () => {
        api.post(`/projects/${projectId}/todos/${id}/edit?token=${localStorage.getItem('token')}`, {
            message: editText,
            type
        })
        .then((resp) => {
            setTodoMessage(editText);
            setEditing(false)
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const deleteCard = () => {
        setCards((pv) => pv.filter((c) => c.id !== id));
        api.delete(`/projects/${projectId}/todos/${id}?token=${localStorage.getItem('token')}`)
        .then((resp) => {
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }

	return (
		<>
			<DropIndicator beforeId={id} column={type} />
			<ContextMenu>
				<ContextMenuTrigger>
					<motion.div
						layout
						layoutId={id}
						draggable={editing ? 'false' : 'true'}
						onDragStart={(e) => handleDragStart(e, { message, id, type })}
						className='cursor-grab rounded bg-white p-3 active:cursor-grabbing flex flex-col gap-2'
					>
						{isCompleted && (
							<div className='bg-green-300 rounded flex w-fit py-1 px-2'>
								<p className='text-xs text-green-800'>Completed</p>
							</div>
						)}
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
					>
						<FiEdit2 className='mr-[10px]'></FiEdit2>
						Edit
					</ContextMenuItem>
					<ContextMenuSeparator />

					<ContextMenuItem>
						<FiPlus className='mr-[10px]'></FiPlus>
						Add assignee
					</ContextMenuItem>
					<ContextMenuCheckboxItem onCheckedChange={markAsComplete} checked={checked}>
						Mark as completed
					</ContextMenuCheckboxItem>
					<ContextMenuSeparator />

					<ContextMenuItem onClick={deleteCard}>
						<FiTrash className='mr-[10px]'></FiTrash>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</>
	);
};
