import { CardType } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

export const BurnBarrel = ({ setCards }: { setCards: Dispatch<SetStateAction<CardType[]>> }) => {
	const [active, setActive] = useState(false);

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		setActive(true);
	};

	const handleDragLeave = () => {
		setActive(false);
	};

	const handleDragEnd = (e: DragEvent) => {
		const id = e.dataTransfer.getData('cardId');
        const projectId = e.dataTransfer.getData('projectId');


        setCards((pv) => pv.filter((c) => c.id !== id));
        api.delete(`/projects/${projectId}/todos/${id}?token=${localStorage.getItem('token')}`)
        .then((resp) => {
            console.log(resp.data)
        })
        .catch((err) => {
            console.log(err);
        })

		setActive(false);
	};

	return (
		<div
			onDrop={handleDragEnd}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
				active ? 'border-red-800 bg-red-800/20 text-red-500' : 'border-neutral-500 bg-neutral-500/20 text-neutral-500'
			}`}
		>
			{active ? <FaFire className='animate-bounce' /> : <FiTrash />}
		</div>
	);
};
