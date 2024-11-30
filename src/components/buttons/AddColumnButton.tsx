import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/services/axiosConfig';
import { SetStateAction, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useToast } from '@/hooks/use-toast';

export function AddColumnButton({ setColumns, projectId }: { setColumns: React.Dispatch<SetStateAction<[]>>, projectId: string }) {
	const [name, setName] = useState('');
	const [open, setOpen] = useState(false);
    const { toast } = useToast()

	const createColumn = () => {
        api.post(`/projects/${projectId}/types/new?token=${localStorage.getItem('token')}`, {
            name
        })
        .then((resp) => {
            setColumns(resp.data)
            setOpen(false);
            setName('');
            toast({
                title: "Success!",
                description: `'${name}' column was successfully created!`,
              })
        })
        .catch((err) => {
            console.log(err)
        })
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<a className='justify-center bg-[#4F46E5] text-white font-bold text-md py-3 px-5 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-[#382EDD]'>
					<FaPlus />
					<p>Add Column</p>
				</a>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md bg-[#ffffff]'>
				<DialogHeader>
					<DialogTitle>Add Column</DialogTitle>
					<DialogDescription>Create a new column for your kanban board!</DialogDescription>
				</DialogHeader>
				<div>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' placeholder='Name of your column' maxLength={24} value={name} onChange={(e) => setName(e.target.value)} />
						</div>
					</div>
				</div>
				<DialogFooter>
					<Button className='w-full' onClick={createColumn}>
						Create Column
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
