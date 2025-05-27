import { View, TouchableOpacity, StyleSheet }  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme        from '#theme';


export default function MenuBarBot()
{
    return (
    <View style={styles.container}>
        <View style={styles.menuBar}>
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name='person' size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Ionicons name='barbell' size={theme.sizing.icon.md} color={theme.colors.accent.white} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Menu pressed')}>
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
        height:                     60,
    },  

    menuBar:    
    {   
        flex:                       1,
        flexDirection:              'row',
        alignItems:                 'center',
        justifyContent:             'space-between',

        paddingHorizontal:          15,
        borderTopWidth:             2,
        borderColor:                theme.colors.accent.subtle,

        backgroundColor:            'transparent'
    },
})