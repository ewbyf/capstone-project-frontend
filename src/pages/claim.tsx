import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Claim = () => {
    const router = useRouter();

    useEffect(() => {
        const arr = router.asPath.split('=')
        if (arr.length == 2) {
            localStorage.setItem('token', arr[1])
        }
        router.push('/board')
    }, [])
  
    return (
        <div className='h-full w-full bg-[#EEF2FF] flex flex-col justify-center items-center gap-4'>
            <Loader></Loader>
        </div>
    );
}
 
export default Claim;