import { CardType, ColumnProps } from '@/interfaces/Kanban';
import { DragEvent, useEffect, useState } from 'react';
import { Card } from './Card';
import { AddCard } from './AddCard';
import { DropIndicator } from './DropIndicator';

export const Column = ({ title, backgroundColor, cards, column, setCards }: ColumnProps) => {
	const [active, setActive] = useState(false);

	const handleDragStart = (e: DragEvent, card: CardType) => {
		e.dataTransfer.setData('cardId', card.id);
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

	return (
		<div className={`w-56 shrink-0 rounded-lg flex flex-col`} style={{backgroundColor}}>
			<div className='flex items-center justify-between bg-black/30 p-4 rounded-t-md'>
				<h3 className={`font-bold text-white`}>{title}</h3>
				<span className='rounded text-sm text-neutral-400'>{filteredCards.length}</span>
			</div>
			<div
				onDrop={handleDragEnd}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				className={`h-full w-full p-4 transition-colors ${active ? 'bg-white/20' : 'bg-neutral-800/0'}`}
			>
				{filteredCards.map((c) => {
					return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
				})}
				<DropIndicator beforeId={null} column={column} />
				<AddCard column={column} setCards={setCards} />
			</div>
		</div>
	);
};
