import { useEffect }    from 'react';
import { useRouter }    from 'expo-router';
import suppressLog      from '#utils/suppressLog.js'

suppressLog();

export default function index()
{
    const router = useRouter();

    useEffect(() => 
    {
        const timeout = setTimeout(() => 
        {
            router.replace('/intro');
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return null;
}

