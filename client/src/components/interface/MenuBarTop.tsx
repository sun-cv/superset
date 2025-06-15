import { View, TouchableOpacity, StyleSheet }   from '../../lib/ReactIndex';
import { theme }                                from '#styles'
import { Ionicons }                             from '@expo/vector-icons';


export default function MenuBarTop()
{
    return (
    <View style={styles.container}>
        <View style={styles.menuBar}>
            <TouchableOpacity onPress={() => {}}>
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

        backgroundColor:        'transparent'
    },
})