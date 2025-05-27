import { ScrollView, StyleSheet }           from 'react-native';
import { SafeAreaProvider, SafeAreaView }   from 'react-native-safe-area-context';
import { Slot }                             from 'expo-router';
import { UserProvider }                     from '#contexts/userContext.tsx';

import theme        from '#theme';
import MenuBarTop      from '#components/menu/MenuBarTop.tsx';
import MenuBarBot from '#components/menu/MenuBarBot.tsx';
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout() 
{
    return (
    <UserProvider>

        <SafeAreaProvider>
            <LinearGradient
                colors={[theme.colors.main.gradient.start, theme.colors.main.gradient.stop]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
            >
            <SafeAreaView style={styles.safeArea}>
    
            <MenuBarTop />
                      
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                <Slot />
            </ScrollView>

            <MenuBarBot />
            </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    </UserProvider>
    );
}


const styles = StyleSheet.create(
{

    safeArea:
    {
        flex:                       1,
    },      
    container:     
    {       
        flexGrow:                   1,
        padding:                    10,
        backgroundColor:            theme.colors.background.surface,
    },

})