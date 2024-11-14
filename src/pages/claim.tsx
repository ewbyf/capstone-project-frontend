import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';

const Claim = () => {
    const router = useRouter();

    useEffect(() => {
        const arr = router.asPath.split('=')
        if (arr.length == 2) {
            localStorage.setItem('token', arr[1])
        }
        router.push('/projects')
    }, [])
  
    return (
        <Loading/>
    );
}
 
export default Claim;