import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet} from 'react-native';
import React                            from 'react';
import theme                            from '#theme';
import { UIStyle, UIText, UIShadow }    from '#types/UIStyle.ts';

type UIButtonProps = 
{
    label:          string;
    variant?:       'primary' | 'secondary' | 'light' | 'icon' | 'text';
    loading?:       boolean;
    disabled?:      boolean;
    icon?:          React.ReactNode;
    UIStyle?:       UIStyle,
    UIText?:        UIText,
    UIShadow?:      UIShadow,
    onPress:        () => void;
};


export default function UIButton({ label, onPress, variant = 'primary', loading = false, disabled = false, icon, UIStyle, UIText, UIShadow }: UIButtonProps) 
{
    const isDisabled = disabled || loading;

    return (
        <View style={[styles.container, UIStyle?.container]}>
            <TouchableOpacity
                disabled={isDisabled}
                onPress={onPress}
                activeOpacity={0.8}
                style=
                {[ styles.button, variantStyles[variant], isDisabled && styles.disabled, UIStyle?.button, theme.shadows.get(UIShadow),]}
            >
            
                {loading ?
                (
                    <ActivityIndicator color={variant === 'light' ? theme.colors.accent.dark : theme.colors.accent.light } />
                ) 
                : 
                (
                    <View style={styles.row}>
                        {icon && <View style={styles.icon}>{icon}</View>}
                        <Text style={[labelStyles.label, labelStyles[variant], UIText?.label]}>{label}</Text>
                    </View>

                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        backgroundColor:            'transparent',
    },

    button: 
    {
        flexDirection:              'row',
        alignItems:                 'center',
        justifyContent:             'center',
        paddingVertical:            theme.spacing.padding.md,
        paddingHorizontal:          theme.spacing.padding.lg,
        borderRadius:               theme.sizing.radius.md,
        height:                     theme.sizing.button.height,
    },

    icon: 
    {
        marginRight:                2,
    },

    row:
    {
        flexDirection:              'row',
        alignItems:                 'center', 
    },

    disabled: 
    {
        opacity:                    0.5,
    },

});

const variantStyles = StyleSheet.create(
{
    primary: 
    {
        backgroundColor:            theme.colors.accent.primary
    },

    secondary: 
    {
        backgroundColor:            theme.colors.accent.secondary    
    },

    light: 
    {
        backgroundColor:            'transparent',
        borderColor:                theme.colors.accent.light,
        ...theme.shadows.get(1)
    },

    icon: 
    {
        backgroundColor:            'transparent',
        ...theme.shadows.get(1)
    },

    dropdown:
    {
        justifyContent:             'space-between',
        backgroundColor:            'transparent',
        ...theme.shadows.get(1)
    },

    text:
    {
    
    }
});

const labelStyles = StyleSheet.create(
{
    primary: 
    {
        color:                      theme.colors.text.light
    },

    secondary:
    {                       
        color:                      theme.colors.text.light
    },

    light:
    {                       
        color:                      theme.colors.text.primary
    },

    icon:
    {                       
        color:                      theme.colors.icon.secondary
    },

    dropdown:
    {                       
        color:                      theme.colors.icon.secondary
    },

    label: 
    {...theme.typography.label
        
    },
});