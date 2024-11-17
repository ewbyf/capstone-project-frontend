import { CardProps } from '@/interfaces/Kanban';
import { motion } from 'framer-motion';
import { DropIndicator } from './DropIndicator';

export const Card = ({ title, id, column, handleDragStart }: CardProps) => {
	return (
		<>
			<DropIndicator beforeId={id} column={column} />
			<motion.div
				layout
				layoutId={id}
				draggable='true'
				onDragStart={(e) => handleDragStart(e, { title, id, column })}
				className='cursor-grab rounded bg-white p-3 active:cursor-grabbing'
			>
				<p className='text-sm text-black'>{title}</p>
			</motion.div>
		</>
	);
};



