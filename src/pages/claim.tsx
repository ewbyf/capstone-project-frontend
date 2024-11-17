import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Claim = () => {
	const router = useRouter();

	useEffect(() => {
        if (!router.isReady) {
            return;
        }
        console.log(router.query.token)
		if (router.query.token && typeof router.query.token === "string") {
            console.log(router.query.token)
			localStorage.setItem('token', router.query.token);
			router.push('/projects');
		}
	}, [router.isReady]);

	return <Loading />;
};

export default Claim;
