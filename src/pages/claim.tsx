import Loader from '@/components/Loader';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Claim = () => {
    const searchParams = useSearchParams();
    const { push } = useRouter();

    useEffect(() => {
        const queryParamValue = searchParams.get('token');
        if (queryParamValue) {
            localStorage.setItem('token', queryParamValue)
        }
        push('/board')
    }, [])
  
    return (
        <div className='h-full w-full bg-[#EEF2FF] flex flex-col justify-center items-center gap-4'>
            <Loader></Loader>
        </div>
    );
}
 
export default Claim;