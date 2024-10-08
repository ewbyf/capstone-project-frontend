import AccordionSteps from '@/components/AccordionSteps';
import GetStartedButton from '@/components/GetStartedButton';
import GithubButton from '@/components/GithubButton';
import Navbar from '@/components/Navbar';

export default function Home() {
	return (
        <div>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
            <div className='flex flex-col items-center w-full h-full'>
                <Navbar></Navbar>
                <section className='flex px-[20%] w-full h-screen items-center min-h-screen' id="home">
                    <div className='flex flex-col w-1/2 gap-4 items-start'>
                        <p className='text-4xl font-bold text-[#3C3C3C]'>
                            Transform comments into{' '}
                            {/* <span className='bg-gradient-to-r from-[#ff00b2] to-[#60F] inline-block text-transparent bg-clip-text'>actionable</span> */}
                            <span className='text-[#4F46E5]'>actionable </span> 
                            tasks
                        </p>
                        <p className='text-gray-500'>No more manual task creation—just code, comment, and let Codeban handle the rest for you.</p>
                        <GetStartedButton></GetStartedButton>
                    </div>
                    <div>{/* img */}</div>
                </section>
                <section className='flex flex-col w-full items-center bg-[#EEF2FF] px-[20%] py-24 gap-6'>
                    <p className='font-inter font-medium text-xl text-[#A7AEBA]'>How it works</p>
                    <p className='font-inter font-bold text-3xl text-[#3C3C3C]'>Turn comments into cards with just 3 steps</p>
                    <AccordionSteps></AccordionSteps>
                </section>
                <section className='flex flex-col w-full items-center px-[20%] py-24 gap-6'>
                    <p className='font-inter font-medium text-xl text-[#A7AEBA]'>Benefits & Features</p>
                    <p className='font-inter font-bold text-3xl text-[#3C3C3C]'>Here is how Codeban can help you</p>
                    <AccordionSteps></AccordionSteps>
                </section>
            </div>
        </div>

	);
}

