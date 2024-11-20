export interface ListItem {
	id: string;
	message: string;
	projectId: string;
	type: string;
    typeData: {
        color: string;
    };
}