import { AddCardButton } from '@/components/buttons/AddCardButton';
import { AddColumnButton } from '@/components/buttons/AddColumnButton';
import LogoutButton from '@/components/buttons/LogoutButon';
import { BurnBarrel } from '@/components/kanban-board/BurnBarrel';
import { Column } from '@/components/kanban-board/Column';
import Logo from '@/components/Logo';
import api from '@/services/axiosConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Board = () => {
	const [id, setId] = useState('');
	const [columns, setColumns] = useState<any>([]);
	const [items, setItems] = useState<any>([]);
	const [collaborators, setCollaborators] = useState([]);

	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) {
			return;
		}
		if (router.query.id && typeof router.query.id === 'string') {
			setId(router.query.id);
			api.get(`/projects/${router.query.id}/todos?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					setItems(resp.data);
                    console.log(resp.data)
					api.get(`/projects/${router.query.id}/types?token=${localStorage.getItem('token')}`)
						.then((resp1) => {
							setColumns(resp1.data);
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
			api.get(`/projects/${router.query.id}/collaborators?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					console.log(resp.data);
					setCollaborators(resp.data);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		}
	}, [router.isReady]);

	return (
		<div className='flex flex-col h-full w-full'>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
			<div className='bg-white w-full flex items-center shadow px-12 py-2 z-50 gap-12 z-[49]'>
				<Logo dest='/projects' />
				<div className='flex ml-auto gap-4'>
					<AddCardButton setItems={setItems} projectId={id} columns={columns} />
					<AddColumnButton setColumns={setColumns} projectId={id} />
					<LogoutButton />
				</div>
			</div>
			<div className='py-6 px-14 w-full h-full gap-8 flex flex-col'>
				<div className='w-full'>
					<p className='text-2xl font-bold'>{router.query.name}</p>
					{typeof router.query.url === "string" && <a href={router.query.url} className='hover:underline'>{router.query.url}</a>}
				</div>
				<div className='flex gap-3 flex-wrap'>
					{columns.map((col: any) => (
						<Column
							title={col.name}
							column={col.name}
							backgroundColor={`hsl(${col.color.split(' ')[0]},${col.color.split(' ')[1]}%,${col.color.split(' ')[2]}%)`}
							cards={items}
							setCards={setItems}
                            collaborators={collaborators}
							id={id}
							key={col.name}
                            setColumns={setColumns}
						/>
					))}
					<BurnBarrel setCards={setItems} />
				</div>
			</div>
		</div>
	);
};

export default Board;
