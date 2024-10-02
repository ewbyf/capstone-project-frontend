import localFont from 'next/font/local';
import GithubButton from '@/components/GithubButton';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900'
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900'
});

export default function Home() {
	return (
		<div className='flex flex-col justify-center items-center w-full h-screen'>
			<p className='text-5xl'>Todo Kanban</p>
			<GithubButton></GithubButton>
		</div>
	);
}

