import api from '@/services/axiosConfig';
import Editor from '@monaco-editor/react';
import { SetStateAction, useEffect, useState } from 'react';
import TreeView, { flattenTree, ITreeViewOnNodeSelectProps } from 'react-accessible-treeview';
import { BiLogoTypescript } from 'react-icons/bi';
import { DiCss3, DiJavascript, DiNpm } from 'react-icons/di';
import { FaFileImage, FaFont, FaGitAlt, FaNodeJs, FaReact, FaRegFolder, FaRegFolderOpen, FaStar } from 'react-icons/fa';
import Loading from './Loading';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';

function Tree({ setItems, projectId, columns, setOpen }: { setItems: React.Dispatch<SetStateAction<[]>>; projectId: string, columns: any, setOpen: React.Dispatch<SetStateAction<boolean>> }) {
	const [directory, setDirectory] = useState();
	const [init, setInit] = useState(true);
	const [language, setLanguage] = useState('javascript');
	const [code, setCode] = useState('');
	const [selectedPath, setSelectedPath] = useState('');
	const [comment, setComment] = useState('');
	const [lineNumber, setLineNumber] = useState('0');
    const [selectedColumn, setSelectedColumn] = useState('')
    const { toast } = useToast()

	useEffect(() => {
		api.get(`/projects/${projectId}/tree?token=${localStorage.getItem('token')}`)
			.then((resp) => {
				console.log(resp.data);
				setDirectory(resp.data);
				setInit(false);
                console.log(columns)
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const fileClick = ({ element, isBranch, isSelected, treeState }: ITreeViewOnNodeSelectProps) => {
		if (!isBranch) {
			const extension = element.name.slice(element.name.lastIndexOf('.') + 1);
			switch (extension) {
				case 'jsx':
				case 'js':
					setLanguage('javascript');
					break;
				case 'css':
				case 'json':
				case 'html':
					setLanguage(extension);
					break;
				case 'ts':
				case 'tsx':
					setLanguage('typescript');
					break;
				case 'py':
					setLanguage('python');
					break;
				case 'cs':
					setLanguage('c#');
					break;
				case 'cpp':
					setLanguage('c++');
					break;
			}
			if (typeof element.metadata!.pathname === 'string') {
				setSelectedPath(element.metadata!.pathname);
			}
			api.get(`/projects/${projectId}/tree/${element.metadata!.pathname}?token=${localStorage.getItem('token')}`)
				.then((resp) => {
					setCode(resp.data);
					console.log(language);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const addCard = () => {
		api.post(`/projects/${projectId}/todos/new?token=${localStorage.getItem('token')}`, {
			ln: (parseInt(lineNumber) - 1).toString(),
			message: comment,
			file: selectedPath,
			type: selectedColumn
		})
			.then((resp) => {
				setItems(resp.data);
                setOpen(false)
                toast({
                    title: "Success!",
                    description: `Task was successfully created!`,
                  })
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (init) {
		return (
			<div className='flex w-full h-[75vh]'>
				<Loading></Loading>
			</div>
		);
	}

	return (
		<div className='flex flex-col max-h-[75vh]'>
			<div className='flex'>
				<TreeView
					data={flattenTree(directory!)}
					aria-label='directory tree'
					className='bg-neutral-200 py-2 overflow-scroll w-[15vw] max-h-[65vh] rounded-l-[5px]'
					onNodeSelect={fileClick}
					nodeRenderer={({ element, isBranch, isExpanded, getNodeProps, level }) => (
						<div
							{...getNodeProps()}
							style={{ paddingLeft: 20 * level }}
							className='flex items-center gap-2 cursor-pointer hover:bg-neutral-300 focus:bg-blue-300'
						>
							{isBranch ? <FolderIcon isOpen={isExpanded} /> : <FileIcon filename={element.name} />}
							{element.name}
						</div>
					)}
				/>
				<Editor
					height='65vh'
					width='75vw'
					className='p-2'
					defaultLanguage='javascript'
					defaultValue='// Add a new card by selecting a file, inputting the line number, and a message!'
					value={code}
					language={language}
					options={{ minimap: { enabled: false }, quickSuggestions: false, domReadOnly: true, readOnly: true }}
				/>
			</div>
			<div className='h-[10vh] flex mx-8 w-full items-center gap-4'>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Selected File</Label>
					<Input
						id='name'
						className='border'
						readOnly={true}
						placeholder='No file selected yet...'
						value={selectedPath}
					/>
				</div>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Column</Label>
					<Select value={selectedColumn} onValueChange={(e) => setSelectedColumn(e)}>
						<SelectTrigger className='w-[280px]'>
							<SelectValue placeholder='Select a column' />
						</SelectTrigger>
						<SelectContent>
                            {columns.map((col: any) => (
							<SelectItem value={col.name}>{col.name}</SelectItem>
                            ))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Task</Label>
					<Input id='name' className='border' placeholder='Add new task...' value={comment} onChange={(e) => setComment(e.target.value)} />
				</div>
				<div className='flex flex-col space-y-1.5'>
					<Label htmlFor='name'>Line Number</Label>
					<Input
						id='name'
						type='number'
						className='border'
						min='1'
						placeholder='1'
						value={lineNumber}
						onChange={(e) => setLineNumber(e.target.value)}
					/>
				</div>
				<div className='flex gap-4 ml-auto'>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>&nbsp;</Label>
						<Button className='justify-end' variant='secondary'>
							Cancel
						</Button>
					</div>
					<div className='flex flex-col space-y-1.5'>
						<Label htmlFor='name'>&nbsp;</Label>
						<Button className='justify-end' onClick={addCard} disabled={selectedPath === '' || selectedColumn === ''}>
							Add Task
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

const FolderIcon = ({ isOpen }: { isOpen: boolean }) =>
	isOpen ? <FaRegFolderOpen color='e8a87c' className='' /> : <FaRegFolder color='e8a87c' className='' />;

const FileIcon = ({ filename }: { filename: string }) => {
	const extension = filename.slice(filename.lastIndexOf('.') + 1);
	switch (extension) {
		case 'js':
			return <DiJavascript color='yellow' className='shrink-0' />;
		case 'css':
			return <DiCss3 color='turquoise' className='shrink-0' />;
		case 'json':
			return <FaNodeJs color='green' className='shrink-0' />;
		case 'npmignore':
			return <DiNpm color='red' className='shrink-0' />;
		case 'ts':
			return <BiLogoTypescript color='#0583C8' className='shrink-0' />;
		case 'tsx':
		case 'jsx':
			return <FaReact color='#0583C8' className='shrink-0' />;
		case 'ico':
			return <FaStar color='orange' className='shrink-0' />;
		case 'png':
		case 'jpeg':
		case 'jpg':
			return <FaFileImage color='turquoise' className='shrink-0' />;
		case 'otf':
		case 'ttf':
			return <FaFont color='red' className='shrink-0' />;
		case 'gitignore':
			return <FaGitAlt color='red' className='shrink-0' />;
		default:
			return null;
	}
};

export default Tree;
