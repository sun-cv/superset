import { useEffect, useRouter } from '#lib/ReactIndex.ts'

const debug     = true
const signedIn  = false;

export default function useRoute(initialized: boolean) 
{
    const router = useRouter();

    useEffect(() => 
    {
        if (!initialized) return;

        if (debug) 
        {
            router.replace('/root/test/interface');
        } 
        else 
        {
            router.replace(signedIn ? '/root/dashboard/dashboard' : '/root/signup/landing');
        }
    }, [initialized, router]);
}