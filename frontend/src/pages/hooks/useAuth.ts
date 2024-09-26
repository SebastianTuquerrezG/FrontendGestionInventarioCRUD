import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && router.pathname !== "/log") {
        router.push('/log');
        }
    }, [router]);

    return null;
};

export default useAuth;
