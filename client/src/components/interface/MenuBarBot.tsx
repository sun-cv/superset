import { View, TouchableOpacity, StyleSheet }   from '../../lib/ReactIndex'
import { theme }                                from '#styles'
import { Ionicons }                             from '@expo/vector-icons';


export default function MenuBarBot()
{
    return (
    <View style={styles.container}>
        <View style={styles.menuBar}>
            <TouchableOpacity onPress={() => {}}>
            <Ionicons name='person' size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
            <Ionicons name='barbell' size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
            <Ionicons name='add' size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create(
{
    container: 
    {
        height:                 60,
    },  

    menuBar:    
    {   
        flex:                   1,
        flexDirection:          'row',
        alignItems:             'center',
        justifyContent:         'space-between',

        paddingHorizontal:      15,
        
        backgroundColor:        'transparent'
    },
})