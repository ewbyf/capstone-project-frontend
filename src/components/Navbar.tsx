import GetStartedButton2 from './buttons/GetStartedButton2';
import LoginButton from './buttons/LoginButton';
import Logo from './Logo';

const Navbar = () => {
	return (
		<nav className='bg-white w-full flex items-center fixed top-0 shadow px-12 py-2 z-50 gap-12 z-[100]'>
			<Logo dest="#"/>
			<a href='#' className='font-inter font-[500] hover:text-[#4F46E5]'>
				Try it
			</a>
			<a href='#how' className='font-inter font-[500] hover:text-[#4F46E5]'>
				How it works
			</a>
			<a href='#benefits' className='font-inter font-[500] hover:text-[#4F46E5]'>
				Benefits
			</a>
			<a href='#testimonials' className='font-inter font-[500] hover:text-[#4F46E5]'>
				Testimonials
			</a>
			<a href='#faq' className='font-inter font-[500] hover:text-[#4F46E5]'>
				FAQ
			</a>
			<div className='flex ml-auto gap-4'>
				<LoginButton></LoginButton>
				<GetStartedButton2></GetStartedButton2>
			</div>
		</nav>
	);
};

export default Navbar;
