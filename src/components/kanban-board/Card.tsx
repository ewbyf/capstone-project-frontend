import { CardProps } from '@/interfaces/Kanban';
import { motion } from 'framer-motion';
import { DropIndicator } from './DropIndicator';

export const Card = ({ message, id, type, handleDragStart }: CardProps) => {
	return (
		<>
			<DropIndicator beforeId={id} column={type} />
			<motion.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={(e) => handleDragStart(e, { message, id, type })}
				className='cursor-grab rounded bg-white p-3 active:cursor-grabbing'
			>
				<p className='text-sm text-black'>{message}</p>
			</motion.div>
		</>
	);
};



