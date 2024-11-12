import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/services/axiosConfig';
import { useEffect, useState } from 'react';

export function CreateProjectButton() {
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
        console.log(name)
        console.log(selectedRepo)
        api.post(`/projects/new?token=${localStorage.getItem('token')}`, {
            name,
            url: selectedRepo
        })
        .then((resp) => {
            console.log(resp.data)
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
				<Button>Create Project</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md bg-[#ffffff]'>
				<DialogHeader>
					<DialogTitle>Create Project</DialogTitle>
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
