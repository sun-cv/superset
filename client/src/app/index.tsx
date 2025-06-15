import { SplashScreen, useEffect} from '#lib/ReactIndex.ts';
import LoadingScreen                        from './loading';
import useBoot                              from '#features/boot/hooks/useBoot.ts';
import useRoute                             from '#features/boot/hooks/useRoute.ts';


SplashScreen.preventAutoHideAsync()


export default function Main()
{

    const booting = useBoot();

    useRoute(!booting)

    return (
        <LoadingScreen/>
    )
}


