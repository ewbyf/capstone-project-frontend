import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/services/axiosConfig';
import { SetStateAction, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Tree from '../Tree';

export function AddCardButton({ setItems, projectId, columns }: { setItems: React.Dispatch<SetStateAction<[]>>, projectId: string, columns: any }) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<a className='justify-center bg-[#4F46E5] text-white font-bold text-md py-3 px-5 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-[#382EDD]'>
					<FaPlus />
					<p>Add Card</p>
				</a>
			</DialogTrigger>
			<DialogContent className='w-[95vw] max-w-[100vw] flex bg-[#ffffff] p-0'>
                <DialogTitle hidden={true}></DialogTitle>
                <Tree setItems={setItems} projectId={projectId} columns={columns}></Tree>
			</DialogContent>
		</Dialog>
	);
}
