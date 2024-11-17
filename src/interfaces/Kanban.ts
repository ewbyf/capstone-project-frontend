import { Dispatch, SetStateAction } from 'react';

export type ColumnType = 'backlog' | 'todo' | 'doing' | 'done';

export type CardType = {
	title: string;
	id: string;
	column: ColumnType;
};

export type ColumnProps = {
	title: string;
	backgroundColor: string;
	cards: CardType[];
	column: ColumnType;
	setCards: Dispatch<SetStateAction<CardType[]>>;
};

export type CardProps = CardType & {
	handleDragStart: Function;
};

export type DropIndicatorProps = {
	beforeId: string | null;
	column: string;
};

export type AddCardProps = {
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
  };