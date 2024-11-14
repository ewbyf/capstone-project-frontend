import { useMediaQuery } from 'usehooks-ts';
import GetStartedButton2 from './buttons/GetStartedButton2';
import LoginButton from './buttons/LoginButton';
import MobileNavbarDropdown from './MobileNavbarDropdown';

const MobileNavbar = () => {
	const matches = useMediaQuery('(max-width: 670px)');

	return (
		<nav className='bg-white w-full h-[76px] flex items-center fixed top-0 shadow px-8 py-2 z-50 gap-12 z-[100]'>
			<div className='flex items-center gap-2'>
				<img src='logo.svg' alt='' height={60} width={60} />
				<p className='text-2xl font-bold text-[#3C3C3C]'>Codeban</p>
			</div>
			{/* <a href="#" className="font-inter font-[500] hover:text-[#4F46E5]">Try it</a>
            <a href="#how" className="font-inter font-[500] hover:text-[#4F46E5]">How it works</a>
            <a href="#benefits" className="font-inter font-[500] hover:text-[#4F46E5]">Benefits</a>
            <a href="#testimonials" className="font-inter font-[500] hover:text-[#4F46E5]">Testimonials</a>
            <a href="#faq" className="font-inter font-[500] hover:text-[#4F46E5]">FAQ</a> */}

			<div className='flex ml-auto gap-4 items-center'>
				{!matches && (
					<>
						<LoginButton></LoginButton>
						<GetStartedButton2></GetStartedButton2>
					</>
				)}
				<MobileNavbarDropdown></MobileNavbarDropdown>
			</div>
		</nav>
	);
};

export default MobileNavbar;
