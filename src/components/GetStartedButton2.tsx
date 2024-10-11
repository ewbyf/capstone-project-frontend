import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const GetStartedButton2 = () => {
	const signin = () => {};

	return (
		<div
			onClick={signin}
			className='justify-center bg-[#4F46E5] text-white font-bold text-sm py-3 px-5 rounded-xl hover:cursor-pointer hover:bg-gray-700 flex items-center gap-2 ml-auto hover:bg-[#4035DA]'
		>
			<p>Login</p>
            <FaArrowRight />
		</div>
	);
};

export default GetStartedButton2;
