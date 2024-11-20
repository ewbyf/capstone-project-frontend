import { CreateProjectButton } from '@/components/buttons/CreateProjectButton';
import LogoutButton from '@/components/buttons/LogoutButon';
import { BurnBarrel } from '@/components/kanban-board/BurnBarrel';
import { Column } from '@/components/kanban-board/Column';
import Logo from '@/components/Logo';
import { CardType } from '@/interfaces/Kanban';
import api from '@/services/axiosConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Board = () => {
	const [id, setId] = useState('');
    const [columns, setColumns] = useState<any>([]);
	const [items, setItems] = useState<any>([]);
	const router = useRouter();
	useEffect(() => {
		if (!router.isReady) {
			return;
		}
		if (router.query.id && typeof router.query.id === 'string') {
			setId(router.query.id);
			api.get(`/projects/${router.query.id}/todos?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					console.log(resp.data);
					setItems(resp.data);
                    api.get(`/projects/${router.query.id}/types?token=${localStorage.getItem('token')}`)
                    .then((resp1) => {
                        console.log(resp1.data)
                        setColumns(resp1.data)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [router.isReady]);

	return (
		<div className='flex flex-col h-full w-full'>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
			<div className='bg-white w-full flex items-center shadow px-12 py-2 z-50 gap-12 z-[100]'>
				<Logo />
				<div className='flex ml-auto gap-4'>
					<CreateProjectButton />
					<LogoutButton />
				</div>
			</div>
			<div className='py-6 px-14 w-full h-full gap-8 flex flex-col'>
				<div className='w-full'>
					<p className='text-2xl font-bold'>{router.query.name}</p>
					<p>{router.query.url}</p>
				</div>
				<div className='flex gap-3 flex-wrap'>
					{/* <Column title="Backlog" column="backlog" backgroundColor={`bg-[${items.typeData.color}hsl(210,60%,50%)]`} cards={cards} setCards={setCards} /> */}

                    {columns.map((col: any) => (
                        <Column
								title={col.name}
								column={col.name}
								backgroundColor={`hsl(${col.color.split(' ')[0]},${col.color.split(' ')[1]}%,${
									col.color.split(' ')[2]
								}%)`}
								cards={items}
								setCards={setItems}
							/>
                    ))}
					<Column title='In progress' column='doing' backgroundColor='hsl(210,60%,50%)' cards={items} setCards={setItems} />
					<Column title='Complete' column='done' backgroundColor='hsl(210,60%,50%)' cards={items} setCards={setItems} />
					<BurnBarrel setCards={setItems} />
				</div>
			</div>
		</div>
	);
};

export default Board;
