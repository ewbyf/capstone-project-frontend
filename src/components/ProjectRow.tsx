import { Project } from '@/interfaces/Project';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const ProjectRow = ({ proj }: { proj: Project }) => {
    const router = useRouter();

	return (
		<motion.tr layoutId={`row-${proj.id}`} className={`text-sm bg-white} cursor-pointer hover:bg-gray-100`} onClick={() => {router.push({pathname: '/board', query: {id: proj.id, name: proj.name, url: proj.url}})}}>
            <td className="pl-2"></td>
			<td className='p-4 flex items-center gap-3 overflow-hidden'>
				<div>
					<a className='block mb-1 font-medium'>{proj.name}</a>
					<a className='block text-xs text-slate-500 hover:underline' href={proj.url} onClick={(e) => e.stopPropagation()} target='_blank'>
						{proj.url}
					</a>
				</div>
			</td>

			<td className='p-4 font-medium'>
				<div>
					<span className='block mb-1 font-medium'>{proj.lastCommitter}</span>
					<p className='block text-xs text-slate-500'>
						{new Date(proj.lastCommit).toLocaleString()}
					</p>
				</div>
			</td>
		</motion.tr>
	);
};

export default ProjectRow;
