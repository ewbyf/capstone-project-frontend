import Loader from '@/components/Loader';

const Loading = () => {
	return (
		<div className='h-full w-full flex flex-col justify-center items-center gap-4'>
			<div className='pattern-cross pattern-gray-500 pattern-bg-gray-300 pattern-size-8 pattern-opacity-10 h-full absolute w-full'></div>
			<Loader></Loader>
		</div>
	);
};

export default Loading;
