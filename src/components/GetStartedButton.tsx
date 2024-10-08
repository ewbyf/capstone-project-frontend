import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const GetStartedButton = () => {
	const signin = () => {};

	return (
		<div
			onClick={signin}
			className='justify-center bg-gradient-to-r from-[#ff00b2] to-[#60F] text-white font-bold py-3 px-8 rounded-3xl hover:cursor-pointer hover:bg-gray-700 min-w-48 flex items-center gap-2'
		>
			<p>Get Started</p>
            <FaArrowRight />
		</div>
	);
};

export default GetStartedButton;
