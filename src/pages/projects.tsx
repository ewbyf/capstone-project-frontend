import { CreateProjectButton } from '@/components/buttons/CreateProjectButton';
import Loading from '@/components/Loading';
import Logo from '@/components/Logo';
import ProjectRow from '@/components/ProjectRow';
import { Input } from '@/components/ui/input';
import { Project } from '@/interfaces/Project';
import api from '@/services/axiosConfig';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Projects = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
	const [init, setInit] = useState(true);
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/');
		}
		api.get(`/projects?token=${token}`)
			.then((resp) => {
				setProjects(resp.data);
				setFilteredProjects(resp.data);
				setInit(false);
			})
			.catch((err) => [console.log(err)]);
	}, []);

	if (init) {
		return <Loading />;
	}

	return (
		<div className='h-full w-full flex flex-col items-center bg-[#EEF2FF]'>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
            <div className='w-full flex items-center px-12 py-2 z-50 gap-12 z-[100]'>
				<Logo dest="/projects"/>
			</div>
			<div className='h-full w-full flex flex-col items-center gap-4 max-w-[75em] px-4 pb-16'>
				<div className='flex justify-between w-full mb-4'>
					<p className='text-3xl font-bold'>All Projects</p>
				</div>
				<div className='flex justify-between w-full gap-8'>
					<div className='bg-white max-w-[20em] w-full flex items-center rounded px-4'>
						<FaSearch />
						<Input
							placeholder='Search...'
							className='bg-white w-full border-none'
							value={searchValue}
							onChange={(e) => {
								setFilteredProjects([...projects.filter((proj) => proj.name.startsWith(e.target.value))]);
								setSearchValue(e.target.value);
							}}
						></Input>
					</div>
					<CreateProjectButton></CreateProjectButton>
				</div>
				<div className='w-full bg-white shadow-lg rounded-lg'>
					<table className='w-full'>
						<thead>
							<tr className='border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase'>
								<th className='pl-2'></th>
								<th className='text-start p-4 font-medium'>Project</th>
								<th className='text-start p-4 font-medium'>Last Commit</th>
							</tr>
						</thead>

						<tbody>
							{filteredProjects.map((proj, index) => {
								return <ProjectRow key={proj.name} proj={proj} />;
							})}
							{filteredProjects.length == 0 && (
								<motion.tr layoutId={`row`} className={`text-sm bg-white}`}>
									<td className='pl-2'></td>
									<td className='p-4 flex items-center gap-3 justify-center' colSpan={3}>
										<p className='block mb-1 font-medium text-center'>No projects found</p>
									</td>
								</motion.tr>
							)}
						</tbody>
					</table>
				</div>

				{/* <p>You have not created any projects yet</p> */}
			</div>
		</div>
	);
};

export default Projects;
