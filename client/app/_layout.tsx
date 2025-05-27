import { Slot }             from 'expo-router';
import { GlobalProvider }   from '#contexts/globalContext.tsx';
import { UserProvider }     from '#contexts/userContext.tsx';

import { Provider as PaperProvider } from 'react-native-paper';


export default function Layout() {
  return (
    <GlobalProvider>
    <PaperProvider>
    <UserProvider>
        <Slot />
    </UserProvider>
    </PaperProvider>
    </GlobalProvider>
  );
}
