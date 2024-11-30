import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { CardType, ColumnProps } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { DragEvent, useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { Card } from './Card';
import { DropIndicator } from './DropIndicator';
import { useToast } from '@/hooks/use-toast';

export const Column = ({ title, backgroundColor, cards, column, setCards, id, setColumns, collaborators }: ColumnProps) => {
	const [active, setActive] = useState(false);
    const { toast } = useToast()

	const handleDragStart = (e: DragEvent, card: CardType) => {
		e.dataTransfer.setData('cardId', card.id);
		e.dataTransfer.setData('projectId', id);
	};

	const handleDragEnd = (e: DragEvent) => {
		const cardId = e.dataTransfer.getData('cardId');

		setActive(false);
		clearHighlights();

		const indicators = getIndicators();
		const { element } = getNearestIndicator(e, indicators);

		const before = element.dataset.before || '-1';

		if (before !== cardId) {
			let copy = [...cards];

			let cardToTransfer = copy.find((c) => c.id === cardId);
			if (!cardToTransfer) return;
			cardToTransfer = { ...cardToTransfer, type: column };

			copy = copy.filter((c) => c.id !== cardId);

			const moveToBack = before === '-1';

			if (moveToBack) {
				copy.push(cardToTransfer);
			} else {
				const insertAtIndex = copy.findIndex((el) => el.id === before);
				if (insertAtIndex === undefined) return;

				copy.splice(insertAtIndex, 0, cardToTransfer);
			}
            console.log(cardToTransfer.message)
            console.log(column)
			api.post(`/projects/${cardToTransfer.projectId}/todos/${cardToTransfer.id}/edit?token=${localStorage.getItem('token')}`, {
				message: cardToTransfer.message,
				type: column
			})
				.then((resp) => {
					console.log(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});

			setCards(copy);
		}
	};

	const handleDragOver = (e: DragEvent) => {
		e.preventDefault();
		highlightIndicator(e);

		setActive(true);
	};

	const clearHighlights = (els?: HTMLElement[]) => {
		const indicators = els || getIndicators();

		indicators.forEach((i) => {
			i.style.opacity = '0';
		});
	};

	const highlightIndicator = (e: DragEvent) => {
		const indicators = getIndicators();

		clearHighlights(indicators);

		const el = getNearestIndicator(e, indicators);

		el.element.style.opacity = '1';
	};

	const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
		const DISTANCE_OFFSET = 50;

		const el = indicators.reduce(
			(closest, child) => {
				const box = child.getBoundingClientRect();

				const offset = e.clientY - (box.top + DISTANCE_OFFSET);

				if (offset < 0 && offset > closest.offset) {
					return { offset: offset, element: child };
				} else {
					return closest;
				}
			},
			{
				offset: Number.NEGATIVE_INFINITY,
				element: indicators[indicators.length - 1]
			}
		);

		return el;
	};

	const getIndicators = () => {
		return Array.from(document.querySelectorAll(`[data-column="${column}"]`) as unknown as HTMLElement[]);
	};

	const handleDragLeave = () => {
		clearHighlights();
		setActive(false);
	};

	const filteredCards = cards.filter((c) => c.type === column);

	const deleteColumn = () => {
        api.delete(`/projects/${id}/types/${title}?token=${localStorage.getItem('token')}`)
        .then((resp) => {
            setColumns(resp.data)
            toast({
                title: "Success!",
                description: `'${title}' column was successfully deleted!`,
              })
        })
        .catch((err) => {
            toast({
                variant: 'destructive',
                title: "Uh oh! Something went wrong.",
                description: "Make sure to delete all cards inside the column before deleting the column!",
              })
        })
    };

	return (
		<ContextMenu>
			<ContextMenuTrigger>
				<div className={`w-56 shrink-0 rounded-lg flex flex-col`} style={{ backgroundColor }}>
					<div className='flex items-center justify-between bg-black/30 p-4 rounded-t-md'>
						<h3 className={`font-bold text-white`}>{title}</h3>
						<span className='rounded text-sm text-neutral-100'>{filteredCards.length}</span>
					</div>
					<div
						onDrop={handleDragEnd}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						className={`h-full w-full p-4 transition-colors ${active ? 'bg-white/20' : 'bg-neutral-800/0'}`}
					>
						{filteredCards.map((c) => {
							return <Card key={c.id} {...c} setCards={setCards} collaborators={collaborators} handleDragStart={handleDragStart} />;
						})}
						<DropIndicator beforeId={null} column={column} />
					</div>
				</div>
			</ContextMenuTrigger>
			<ContextMenuContent className='w-48'>
				<ContextMenuItem onClick={deleteColumn} className='cursor-pointer'>
					<FiTrash className='mr-[10px]'></FiTrash>
					Delete
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	);
};
