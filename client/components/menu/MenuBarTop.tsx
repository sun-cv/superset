import { View, TouchableOpacity, StyleSheet }  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme        from '#theme';


export default function MenuBarTop()
{
    return (
    <View style={styles.container}>
        <View style={styles.menuBar}>
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name="menu" size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create(
{
    container: 
    {
        height:                     60,
    },  

    menuBar:    
    {   
        flex:                       1,
        flexDirection:              'row',
        alignItems:                 'center',
        justifyContent:             'space-between',

        paddingHorizontal:          15,
        borderBottomWidth:          2,
        borderColor:                theme.colors.accent.subtle

        // backgroundColor:            theme.colors.menu.background
    },
})