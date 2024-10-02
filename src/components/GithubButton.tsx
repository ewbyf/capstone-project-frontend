const GithubButton = () => {
	const signin = () => {};

	return (
		<div onClick={signin} className='bg-black text-white font-bold p-4 px-8 rounded-2xl hover:cursor-pointer hover:bg-gray-700 min-w-48 justify-center flex'>
			<p>Sign in with Github</p>
		</div>
	);
};

export default GithubButton;
