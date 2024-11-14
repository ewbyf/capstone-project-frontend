import { CreateProjectButton } from '@/components/buttons/CreateProjectButton';
import LogoutButton from '@/components/buttons/LogoutButon';
import { BurnBarrel } from '@/components/kanban-board/BurnBarrel';
import { Column } from '@/components/kanban-board/Column';
import Logo from '@/components/Logo';
import { CardType } from '@/interfaces/Kanban';
import { ListItem } from '@/interfaces/ListItem';
import api from '@/services/axiosConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Board = () => {
	const [id, setId] = useState('');
	const [items, setItems] = useState<ListItem[]>([]);
	const [cards, setCards] = useState(DEFAULT_CARDS);
	const router = useRouter();
	useEffect(() => {
		if (router.query.id && typeof router.query.id === 'string') {
			setId(router.query.id);
			api.get(`/projects/${router.query.id}/todos?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					console.log(resp.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

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
			{/* py-6 px-14 */}
			<div className='w-full my-8'>
				<p className='text-2xl font-bold'>{router.query.name}</p>
				<p>{router.query.url}</p>
			</div>
			<div className='flex gap-3 flex-wrap'>
				<Column title='Backlog' column='backlog' headingColor='text-neutral-500' cards={cards} setCards={setCards} />
				<Column title='TODO' column='todo' headingColor='text-yellow-200' cards={cards} setCards={setCards} />
				<Column title='In progress' column='doing' headingColor='text-blue-200' cards={cards} setCards={setCards} />
				<Column title='Complete' column='done' headingColor='text-emerald-200' cards={cards} setCards={setCards} />
				<BurnBarrel setCards={setCards} />
			</div>
		</div>
	);
};

const DEFAULT_CARDS: CardType[] = [
	// BACKLOG
	{ title: 'Look into render bug in dashboard', id: '1', column: 'backlog' },
	{ title: 'SOX compliance checklist', id: '2', column: 'backlog' },
	{ title: '[SPIKE] Migrate to Azure', id: '3', column: 'backlog' },
	{ title: 'Document Notifications service', id: '4', column: 'backlog' },
	// TODO
	{
		title: 'Research DB options for new microservice',
		id: '5',
		column: 'todo'
	},
	{ title: 'Postmortem for outage', id: '6', column: 'todo' },
	{ title: 'Sync with product on Q3 roadmap', id: '7', column: 'todo' },

	// DOING
	{
		title: 'Refactor context providers to use Zustand',
		id: '8',
		column: 'doing'
	},
	{ title: 'Add logging to daily CRON', id: '9', column: 'doing' },
	// DONE
	{
		title: 'Set up DD dashboards for Lambda listener',
		id: '10',
		column: 'done'
	}
];

export default Board;
