import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Claim = () => {
	const router = useRouter();

	useEffect(() => {
		if (router.query.token && typeof router.query.token === "string") {
			localStorage.setItem('token', router.query.token);
			router.push('/projects');
		}
	}, []);

	return <Loading />;
};

export default Claim;
