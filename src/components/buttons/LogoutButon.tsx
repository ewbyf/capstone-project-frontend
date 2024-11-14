import { useRouter } from 'next/router';

const LogoutButton = () => {
	const router = useRouter();

	const logout = () => {
		localStorage.removeItem('token');
		router.push('/');
	};

	return (
		<div
			className='justify-center bg-[#EEF2FF] text-[#4F46E5] font-bold text-md py-3 px-5 rounded-lg hover:cursor-pointer flex items-center gap-2 hover:bg-[#E0E7FF] transition-all'
			onClick={logout}
		>
			<p>Logout</p>
		</div>
	);
};

export default LogoutButton;
