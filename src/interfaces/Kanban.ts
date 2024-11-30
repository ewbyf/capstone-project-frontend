import { Dispatch, SetStateAction } from 'react';

export type ColumnType = string;

export type CardType = {
	completed: boolean;
	id: string;
	message: string;
	projectId: string;
	type: ColumnType;
	setCards: Dispatch<SetStateAction<CardType[]>>;
	collaborators: CollaboratorProps[];
	assignees: IncomingCollaboratorProps[];
};

export type ColumnProps = {
	title: string;
	backgroundColor: string;
	cards: CardType[];
	column: ColumnType;
	setCards: Dispatch<SetStateAction<CardType[]>>;
	id: string;
	setColumns: Dispatch<SetStateAction<CardType[]>>;
	collaborators: CollaboratorProps[];
};

export type CollaboratorProps = {
	avatar: string;
	color: string;
	id: string;
	name: string;
};

export type IncomingCollaboratorProps = {
    color: string;
	id: string;
	name: string;
}

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
	id: string;
};
