import { useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import GetStartedButton2 from './buttons/GetStartedButton2';
import LoginButton from './buttons/LoginButton';

const MobileNavbarDropdown = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			{!open && <IoMenu color='#4F46E5' size={32} onClick={() => setOpen(true)} className='z-[99] hover:cursor-pointer' />}
			{open && (
				<div className='fixed left-0 top-0 bg-[#111827] w-full h-full flex flex-col items-center z-[98] px-[1.25em] py-[1.75em] gap-[2em] transition-all ease-in-out'>
					<div className='w-full flex justify-between mb-[3em]'>
						<IoClose
							color='white'
							size={32}
							onClick={() => setOpen(false)}
							className='fixed w-[2em] h-[2em] top-[1.25em] left-[1.75em] z-[99] hover:cursor-pointer'
						/>
					</div>
					<a href='#' className='text-gray-500 font-medium text-2xl hover:underline hover:text-white z-[99]' onClick={() => setOpen(false)}>
						Try it
					</a>
					<a href='#how' className='text-gray-500 font-medium text-2xl hover:underline hover:text-white' onClick={() => setOpen(false)}>
						How it works
					</a>
					<a href='#benefits' className='text-gray-500 font-medium text-2xl hover:underline hover:text-white' onClick={() => setOpen(false)}>
						Benefits
					</a>
					<a href='#testimonials' className='text-gray-500 font-medium text-2xl hover:underline hover:text-white' onClick={() => setOpen(false)}>
						Testimonials
					</a>
					<a href='#faq' className='text-gray-500 font-medium text-2xl hover:underline hover:text-white' onClick={() => setOpen(false)}>
						FAQ
					</a>
					<LoginButton></LoginButton>
					<GetStartedButton2></GetStartedButton2>
				</div>
			)}
		</>
	);
};

export default MobileNavbarDropdown;
