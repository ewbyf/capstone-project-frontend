import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const GetStartedButton2 = () => {
	return (
		<a
			href="https://github.com/apps/todo-kanban-board/installations/new"
            target="_blank"
			className='justify-center bg-[#4F46E5] text-white font-bold text-md py-3 px-5 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-[#382EDD]'
		>
			<p>Get Codeban</p>
            <FaArrowRight />
		</a>
	);
};

export default GetStartedButton2;
