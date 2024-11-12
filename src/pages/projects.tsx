import { CreateProjectButton } from '@/components/CreateProjectButton';
import ProjectRow from '@/components/ProjectRow';
import api from '@/services/axiosConfig';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Project } from '@/interfaces/Project';
import { Input } from '@/components/ui/input';

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [repos, setRepos] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/');
		}
		api.get(`/projects?token=${token}`)
			.then((resp) => {
				console.log(resp.data);
				setProjects(resp.data);
			})
			.catch((err) => [console.log(err)]);
	}, []);

	return (
        <div className='h-full w-full flex flex-col items-center gap-8 bg-[#EEF2FF] px-4 py-16'>
		<div className='h-full w-full flex flex-col items-center gap-8 bg-[#EEF2FF] max-w-[75em]'>
			<div className='flex justify-between w-full'>
				<p className='text-3xl font-bold'>All Projects</p>
			</div>
			<div className='flex justify-between w-full gap-8'>
				<Input placeholder='Search' className='bg-white max-w-[50em]'></Input>
				<CreateProjectButton></CreateProjectButton>
			</div>
			<div className='w-full bg-white shadow-lg rounded-lg'>
				<table className='w-full'>
					<thead>
						<tr className='border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase'>
                        <th className="pl-2"></th>
							<th className='text-start p-4 font-medium'>Project</th>
							<th className='text-start p-4 font-medium'>Last Commit</th>
						</tr>
					</thead>

					<tbody>
						{projects.map((proj, index) => {
							return <ProjectRow key={proj.name} proj={proj} />;
						})}
					</tbody>
				</table>
			</div>

			{/* <p>You have not created any projects yet</p> */}
		</div>
        </div>

	);
};

export default Projects;
