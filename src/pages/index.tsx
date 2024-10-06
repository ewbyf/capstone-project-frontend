import GetStartedButton from '@/components/GetStartedButton';
import GithubButton from '@/components/GithubButton';
import Navbar from '@/components/Navbar';

export default function Home() {
	return (
        <div>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
            <div className='flex flex-col items-center w-full h-full'>
                <Navbar></Navbar>
                <section className='flex px-[20%] w-full h-screen items-center min-h-screen'>
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
        </div>

	);
}

