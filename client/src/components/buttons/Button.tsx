import { React, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from '../../lib/ReactIndex'
import { theme } from '#styles'
import { Style } from '#types';

type Variants    = 'primary' | 'secondary' | 'light' | 'icon' | 'text';


type ButtonProps = 
{
    style:      Style
    label:      string;
    icon?:      React.ReactNode;
    variant:    Variants
    loading?:   boolean;
    disabled?:  boolean;
    onPress:    () => void;
};

export default function Button({ style, label, icon, variant, loading, disabled, onPress}: ButtonProps) 
{
    const isDisabled = disabled || loading;

    const { containerStyle, touchableStyle, textStyle } = styles(style, variant, isDisabled);

    return (
        <View style={containerStyle}>
            <TouchableOpacity disabled={isDisabled} onPress={onPress} activeOpacity={0.8} style= {touchableStyle} >
                {loading ?
                (
                    <ActivityIndicator color={variant === 'light' ? theme.colors.accent.dark : theme.colors.accent.light } />
                )
                :
                (
                    <View style={grid.row}>
                        {icon && <View style={grid.icon}>{icon}</View>}
                        <Text style={textStyle}>{label}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}


const styles = (style: Style, variant: Variants, isDisabled: boolean) => 
{
    const containerStyle    = style.merge([grid.container, style.wrap?.container]);
    const touchableStyle    = style.merge([grid.button, type[variant], isDisabled && grid.disabled, style.wrap?.button, style.cast.get(0)]);
    const textStyle         = style.merge([text.label, text[variant], style.text?.label]);

    return { containerStyle, touchableStyle, textStyle}
}

const grid = StyleSheet.create(
{
    container:
    {
        backgroundColor:        'transparent',
    },

    button: 
    {
        flexDirection:          'row',
        alignItems:             'center',
        justifyContent:         'center',
        paddingVertical:        theme.spacing.padding.md,
        paddingHorizontal:      theme.spacing.padding.lg,
        borderRadius:           theme.sizing.radius.md,
        height:                 theme.sizing.button.height,
    },

    icon: 
    {
        marginRight:            2,
    },

    row:
    {
        flexDirection:          'row',
        alignItems:             'center', 
    },

    disabled: 
    {
        opacity:                0.5,
    },

});

const type = StyleSheet.create(
{
    primary:    
    { 
        backgroundColor:        theme.colors.accent.primary
    },

    secondary: 
    {
        backgroundColor:        theme.colors.accent.secondary    
    },

    light: 
    {
        backgroundColor:        'transparent',
        borderColor:            theme.colors.accent.light,
     ...theme.shadows.get(1)
    },

    icon: 
    {
        backgroundColor:        'transparent',
     ...theme.shadows.get(1)
    },

    dropdown:
    {
        justifyContent:         'space-between',
        backgroundColor:        'transparent',
     ...theme.shadows.get(1)
    },


});

const text = StyleSheet.create(
{
    primary:    { color:        theme.colors.text.light     },
    secondary:  { color:        theme.colors.text.light     },
    light:      { color:        theme.colors.text.primary   },
    icon:       { color:        theme.colors.icon.secondary },
    dropdown:   { color:        theme.colors.icon.secondary },
    label:      {            ...theme.typography.label      },
});