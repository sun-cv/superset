import { SplashScreen, useEffect, useState }   from '#lib/ReactIndex.ts';
import getLoader                    from '#features/boot/core/getLoader.ts';

export default function useBoot()
{
    const [booting, setBooting] = useState(true);

    useEffect(() => 
    {
        const run = async () =>
        {           
            await getLoader().data();
            await getLoader().user();
        }

        run().then(() => { setBooting(false); SplashScreen.hideAsync() }).catch((error) => console.log(error))
    }, [])

    return booting
}
