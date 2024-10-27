import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const GetStartedButton = () => {
	return (
		<a
			href="https://github.com/apps/todo-kanban-board/installations/new"
            target="_blank"
			className='justify-center bg-gradient-to-r from-[#ff00b2] to-[#60F] text-white font-bold py-3 px-12 rounded-3xl hover:cursor-pointer hover:bg-gray-700 flex items-center gap-2'
		>
			<p>Get Codeban</p>
            <FaArrowRight />
		</a>
	);
};

export default GetStartedButton;
