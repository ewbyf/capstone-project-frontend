import Loader from '@/components/Loader';

const Loading = () => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center gap-4 bg-[#EEF2FF]'>
			<Loader></Loader>
		</div>
	);
};

export default Loading;
