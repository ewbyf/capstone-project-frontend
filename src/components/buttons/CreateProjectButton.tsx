import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/services/axiosConfig';
import { SetStateAction, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Project } from '@/interfaces/Project';

export function CreateProjectButton({ setFilteredProjects, setProjects, projects, searchValue } : {setFilteredProjects: React.Dispatch<SetStateAction<Project[]>>, setProjects: React.Dispatch<SetStateAction<Project[]>>, projects: Project[], searchValue: string}) {
	const [repos, setRepos] = useState([]);
	const [name, setName] = useState('');
	const [selectedRepo, setSelectedRepo] = useState('');
    const [open, setOpen] = useState(false)

	useEffect(() => {
		api.get(`/projects/available?token=${localStorage.getItem('token')}`)
			.then((resp) => {
				setRepos(resp.data);
				console.log(resp.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

    const createProject = () => {
        api.post(`/projects/new?token=${localStorage.getItem('token')}`, {
            name,
            url: selectedRepo
        })
        .then((resp) => {
            console.log(resp.data)
            const temp = [...projects, resp.data]
            setProjects(temp)
            setFilteredProjects(temp.filter((proj) => proj.name.startsWith(searchValue)));
            setName('')
            setSelectedRepo('')
            setOpen(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
            <a
	
			className='justify-center bg-[#4F46E5] text-white font-bold text-md py-3 px-5 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-[#382EDD]'
		>
            <FaPlus />
			<p>New Project</p>
		</a>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md bg-[#ffffff]'>
				<DialogHeader>
					<DialogTitle>New Project</DialogTitle>
					<DialogDescription>Get started by creating a name and selecting a repository for your new project!</DialogDescription>
				</DialogHeader>
				<form>
					<div className='grid w-full items-center gap-4'>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' placeholder='Name of your project' value={name} onChange={(e) => setName(e.target.value)} />
						</div>
						<div className='flex flex-col space-y-1.5'>
							<Label htmlFor='framework'>GitHub Repository</Label>
							<Select value={selectedRepo} onValueChange={(e) => setSelectedRepo(e)}>
								<SelectTrigger id='framework'>
									<SelectValue placeholder='Select' />
								</SelectTrigger>
								<SelectContent position='popper'>
									{repos.map((repo: any) => (
										<SelectItem value={repo.html_url} key={repo.id}>
											{repo.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
				</form>
				<DialogFooter>
					<Button className='w-full' onClick={createProject}>Create Project</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
