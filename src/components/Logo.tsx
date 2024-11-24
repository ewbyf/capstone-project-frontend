const Logo = ({ dest }: {dest: string}) => {
	return (
		<a className='flex items-center gap-2 cursor-pointer' href={dest}>
			<img src='logo.svg' alt='' height={60} width={60} />
			<p className='text-2xl font-bold text-[#3C3C3C]'>Codeban</p>
		</a>
	);
};

export default Logo;
