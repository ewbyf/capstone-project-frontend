import { AddCardProps } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { motion } from 'framer-motion';
import { FormEvent, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

export const AddCard = ({ column, setCards, id }: AddCardProps) => {
	const [text, setText] = useState('');
	const [adding, setAdding] = useState(false);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text.trim().length) return;

		const newCard = {
			type: column,
			message: text.trim(),
			completed: false,
			projectId: id
		};

		// setCards((pv) => [...pv, newCard]);

		api.post(`/projects/${id}/todos/new?token=${localStorage.getItem('token')}`, newCard)
			.then((resp) => {
				console.log(resp);
			})
			.catch((err) => {
				console.log(err);
			});

		setAdding(false);
	};

	return (
		<>
			{adding ? (
				<motion.form layout onSubmit={handleSubmit}>
					<textarea
						onChange={(e) => setText(e.target.value)}
						autoFocus
						placeholder='Add new task...'
						className='w-full rounded border border-neutral-50 bg-neutral-50/20 p-3 text-sm text-white placeholder-gray-200 focus:outline-0'
					/>
					<div className='mt-1.5 flex items-center justify-end gap-1.5'>
						<button onClick={() => setAdding(false)} className='px-3 py-1.5 text-xs text-white transition-colors hover:bg-gray-100/20 rounded'>
							Close
						</button>
						<button
							type='submit'
							className='flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300'
						>
							<span>Add</span>
							<FiPlus />
						</button>
					</div>
				</motion.form>
			) : (
				<motion.button
					layout
					onClick={() => setAdding(true)}
					className='flex w-full items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-gray-100/20 rounded'
				>
					<span>Add card</span>
					<FiPlus />
				</motion.button>
			)}
		</>
	);
};
