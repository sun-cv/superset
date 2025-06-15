import { Slot }             from 'expo-router';
import { GlobalProvider }   from '#utils/contexts/globalContext.tsx';
import { UserProvider }     from '#features/user/context/userContext.tsx';



export default function Layout() 
{
    return (
        <GlobalProvider>
            <UserProvider>
                <Slot />
            </UserProvider>
        </GlobalProvider>
    );
}
