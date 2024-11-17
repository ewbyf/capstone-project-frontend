import { DropIndicatorProps } from '@/interfaces/Kanban';

export const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
	return <div data-before={beforeId || '-1'} data-column={column} className='my-0.5 h-0.5 w-full bg-white opacity-0' />;
};
