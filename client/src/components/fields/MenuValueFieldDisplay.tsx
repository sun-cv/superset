import { MenuValueFieldDisplayProps } from "#types/components.ts";
import { StyleSheet, View, Text } from '#lib/ReactIndex.ts'
import { Ionicons } from "@expo/vector-icons";
import { theme } from "#styles";



export default function MenuValueFieldDisplay({ label }: MenuValueFieldDisplayProps)
{
    return (
        <View style={layout.container}>
            <View style={layout.field}>
                <View style={layout.text}>
                    <Text style={text.label}>{label}</Text>
                    <Ionicons name={'chevron-down-outline'} style={text.icon} />
                </View>
            </View>
        </View>
    )
}

const layout = StyleSheet.create(
{

    container: 
    {
    },

    field: 
    {
        borderRadius:           theme.sizing.radius.md,
        paddingVertical:        theme.spacing.padding.sm,
        paddingHorizontal:      theme.spacing.padding.lg,
        backgroundColor:        theme.colors.accent.white,
    },

    text:
    {
        flexDirection:          'row',
        justifyContent:         'space-between', 
        alignItems:             'center',
    }

})


const text = StyleSheet.create(
{
    
    label: 
    {
        fontFamily: 'Oxygen',
        color:                  theme.colors.text.primary,
     ...theme.typography.label
    },

    icon:
    {
        color:                  theme.colors.text.primary,
     ...theme.typography.small,
    }

})