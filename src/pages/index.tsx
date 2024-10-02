import GetStartedButton from '@/components/GetStartedButton';
import GithubButton from '@/components/GithubButton';

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center w-full h-screen'>
			<div className='pattern-cross pattern-gray-400 pattern-bg-white pattern-size-8 pattern-opacity-10 h-screen absolute w-full'></div>
			{/* <p className='text-5xl font-roboto font-bold'>Codeban</p> */}

			<section className='flex px-[20%] w-full'>
				<div className='flex flex-col w-1/2 gap-4 items-start'>
					<p className='text-4xl font-bold'>
						Transform comments into{' '}
						<span className='bg-gradient-to-r from-[#ff00b2] to-[#60F] inline-block text-transparent bg-clip-text'>actionable</span> tasks
					</p>
					<p className='text-gray-500'>No more manual task creation—just code, comment, and let Codeban handle the rest for you.</p>
                    <GetStartedButton></GetStartedButton>
				</div>
				<div>{/* img */}</div>
			</section>
			{/* <GithubButton></GithubButton> */}
		</div>
	);
}

