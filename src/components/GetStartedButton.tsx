const GetStartedButton = () => {
	const signin = () => {};

	return (
		<div
			onClick={signin}
			className='justify-center bg-gradient-to-r from-[#ff00b2] to-[#60F] text-white font-bold py-3 px-8 rounded-3xl hover:cursor-pointer hover:bg-gray-700 min-w-48  flex'
		>
			<p>Get Started</p>
		</div>
	);
};

export default GetStartedButton;
