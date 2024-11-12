import { Project } from '@/interfaces/Project';
import { motion } from 'framer-motion';

const ProjectRow = ({ proj }: { proj: Project }) => {
	return (
		<motion.tr layoutId={`row-${proj.id}`} className={`text-sm bg-white}`}>
            <td className="pl-2"></td>
			<td className='p-4 flex items-center gap-3 overflow-hidden'>
				<div>
					<span className='block mb-1 font-medium'>{proj.name}</span>
					<a className='block text-xs text-slate-500 hover:underline' href={proj.url} target='_blank'>
						{proj.url}
					</a>
				</div>
			</td>

			<td className='p-4 font-medium'>
				<div>
					<span className='block mb-1 font-medium'>{proj.name}</span>
					<a className='block text-xs text-slate-500' href={proj.url} target='_blank'>
						{proj.url}
					</a>
				</div>
			</td>
		</motion.tr>
	);
};

export default ProjectRow;
