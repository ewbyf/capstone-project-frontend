import AccordionSteps from '@/components/AccordionSteps';
import FAQ from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import GetStartedButton from '@/components/buttons/GetStartedButton';
import MobileNavbar from '@/components/MobileNavbar';
import Navbar from '@/components/Navbar';
import { Testimonials } from '@/components/Testimonials';
import { BenefitsGrid } from '@/components/benefits-grid/BenefitsGrid';
import { useMediaQuery } from 'usehooks-ts';

export default function Home() {
	const matches = useMediaQuery('(max-width: 1145px)');
	const mobile = useMediaQuery('(max-width: 1145px)');

	return (
		<div className='h-full'>
			{matches && <MobileNavbar />}
			{!matches && <Navbar></Navbar>}
			<div>
				<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
				<div className='flex flex-col items-center w-full h-full z-[99]'>
					{mobile && (
						<section className='flex px-[5%] w-full items-center justify-center min-h-screen flex-wrap pt-48' id='home'>
							<div className='flex flex-col gap-4 min-w-[350px] items-center'>
								<p className='text-4xl font-bold text-[#3C3C3C] text-center'>
									Transform comments into{' '}
									{/* <span className='bg-gradient-to-r from-[#ff00b2] to-[#60F] inline-block text-transparent bg-clip-text'>actionable</span> */}
									<span className='text-[#4F46E5]'>actionable </span>
									tasks
								</p>
								<p className='text-gray-500 text-center'>
									No more manual task creation—just code, comment, and let Codeban handle the rest for you.
								</p>
								<GetStartedButton></GetStartedButton>
							</div>
							<div className='flex-[1] min-w-[350px] mt-[-200px]'>
								<object data='test.svg' type='' className='flex-1'></object>
							</div>
						</section>
					)}
					{!mobile && (
						<section className='flex px-[10%] w-full items-center min-h-screen gap-24 flex-wrap' id='home'>
							<div className='flex flex-col gap-4 items-start flex-[8] min-w-[350px]'>
								<p className='text-4xl font-bold text-[#3C3C3C]'>
									Transform comments into{' '}
									{/* <span className='bg-gradient-to-r from-[#ff00b2] to-[#60F] inline-block text-transparent bg-clip-text'>actionable</span> */}
									<span className='text-[#4F46E5]'>actionable </span>
									tasks
								</p>
								<p className='text-gray-500'>No more manual task creation—just code, comment, and let Codeban handle the rest for you.</p>
								<GetStartedButton></GetStartedButton>
							</div>
							<div className='flex-[12] min-w-[450px]'>
								<object data='test.svg' type='' className='flex-1'></object>
							</div>
						</section>
					)}

					<section className='flex flex-col w-full items-center bg-[#EEF2FF] px-[20%] py-24 gap-6' id='how'>
						<p className='font-inter font-medium text-xl text-[#A7AEBA]'>How it works</p>
						<p className='font-inter font-bold text-3xl text-[#3C3C3C] text-center'>Turn comments into cards with just 3 steps</p>
						<AccordionSteps></AccordionSteps>
					</section>
					<section className='flex flex-col w-full items-center px-[20%] py-24 gap-6' id='benefits'>
						<p className='font-inter font-medium text-xl text-[#A7AEBA]'>Benefits</p>
						<p className='font-inter font-bold text-3xl text-[#3C3C3C] text-center'>Here is how Codeban can help you</p>
						<BenefitsGrid></BenefitsGrid>
					</section>
					<section className='flex flex-col w-full items-center bg-[#EEF2FF] py-24 gap-6' id='testimonials'>
						<p className='font-inter font-medium text-xl text-[#A7AEBA]'>Testimonials</p>
						<p className='font-inter font-bold text-3xl text-[#3C3C3C] text-center'>See why users love Codeban</p>
						<Testimonials></Testimonials>
					</section>
					<section className='flex flex-col w-full items-center px-[20%] py-24 gap-6' id='faq'>
						<p className='font-inter font-bold text-3xl text-[#3C3C3C] text-center'>Frequently Asked Questions</p>
						<FAQ></FAQ>
					</section>
					<section className='flex w-full justify-center bg-[#111827] py-24 gap-6' id='testimonials'>
						<Footer></Footer>
						{/* <div className='flex flex-col'>
                        <div className="flex items-center gap-2">
                            <img src="logo.svg" alt="" height={60} width={60}/>
                            <p className="text-2xl font-bold text-[#3C3C3C]">Codeban</p>
                        </div>
                        <p>© 2024 Codeban. All rights reserved.</p>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2">
                            <img src="logo.svg" alt="" height={60} width={60}/>
                            <p className="text-2xl font-bold text-[#3C3C3C]">Codeban</p>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className="flex items-center gap-2">
                            <img src="logo.svg" alt="" height={60} width={60}/>
                            <p className="text-2xl font-bold text-[#3C3C3C]">Codeban</p>
                        </div>
                    </div> */}
					</section>
				</div>
			</div>
		</div>
	);
}
