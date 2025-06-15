import { ScrollView, StyleSheet, SafeAreaProvider, SafeAreaView, LinearGradient, Slot} from '#lib/ReactIndex.ts';
import { theme }                            from '#styles';
import { MenuBarTop, MenuBarBot }           from '#components';



export default function Layout() 
{

    return (
        <SafeAreaProvider>
            <LinearGradient colors={[theme.colors.main.gradient.start, theme.colors.main.gradient.stop]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} >
                <SafeAreaView style={layout.safeArea} >
                    <MenuBarTop />

                    <ScrollView contentContainerStyle={layout.container} showsVerticalScrollIndicator={false}>
                        <Slot />
                    </ScrollView>

                    <MenuBarBot />
                </SafeAreaView>
            </LinearGradient>
        </SafeAreaProvider>
    );
}


const layout = StyleSheet.create(
{    
    safeArea:
    {
        flex:                   1,
    },      
    container:     
    {       
        flex:                   1,
        backgroundColor:        theme.colors.background.surface,
    },
})

