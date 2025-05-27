import { TouchableOpacity, Text, View,  StyleSheet, Dimensions} from 'react-native';
import Modal                            from 'react-native-modal';
import  { useRef, useState }            from 'react';
import theme                            from '#theme';
import { Ionicons }                     from '@expo/vector-icons';
import { UIStyle, UIText, UIShadow }    from '#types/UIStyle.ts';
import * as Animatable                  from 'react-native-animatable';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


type UIDropdown =
{
    label:          string,
    defaultValue?:  string,
    options:        any[],
    UIStyle?:       UIStyle,
    UIText?:        UIText,
    UIShadow?:      UIShadow,
    returnValue:  (value: string) => void
};




export default function UIDropdown({ label, defaultValue, returnValue, options = [], UIStyle, UIText, UIShadow}: UIDropdown)
{
    const [buttonLayout, setButtonLayout]       = useState({ x: 0, y: 0, width: 0, height: 0})
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [selectedValue, setSelectedValue]     = useState(defaultValue);

    const screenWidth   = Dimensions.get('window').width;

    const buttonRef     = useRef(null)
    const dropdownRef   = useRef(null);
    const iconRef       = useRef(null);


    function openDropDown() 
    {
        iconRef.current?.measureInWindow((x, y, width, height) => 
        {
            setButtonLayout({ x, y, width, height });
            setDropdownVisible(true);
        });
    }

    async function closeDropdown() 
    {
        if (dropdownRef.current) 
        {
            await dropdownRef.current.animate('fadeOut', 200);
        }
        setDropdownVisible(false);
    }


    
    
    return (
        <View style={[styles.container, UIStyle?.container]}>

            <TouchableOpacity ref={buttonRef} onPress={()=> openDropDown()} activeOpacity={0.8} style={[styles.base]}>
                 <Text style={[textStyles.label, UIText?.label]}>{selectedValue ? selectedValue : label}</Text>
                <View ref={iconRef}>
                    <Ionicons name={'chevron-down-outline'} />
                </View>            
            </TouchableOpacity>         

                {dropdownVisible && 
                (
                    <Modal isVisible={dropdownVisible} backdropOpacity={0} onBackdropPress={() => closeDropdown()} style={[{ margin: 0 }, UIStyle?.modal]} animationIn='fadeIn' animationOut='fadeOut' animationInTiming={400} animationOutTiming={200}>
                        <Animatable.View ref={dropdownRef} animation='fadeInRight' duration={200} style={[ styles.dropdown, { position: 'absolute', top: buttonLayout.y - 5, right: screenWidth - (buttonLayout.x + buttonLayout.width) }, ]} > 
                               {options.map((option) => 
                            (
                                <TouchableOpacity key={option} onPress={() => { setSelectedValue(option); returnValue(option); closeDropdown();  }} style={[styles.option, UIStyle?.option]}>
                                    <Text style={[textStyles.option, UIText?.option]}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </Animatable.View>
                    </Modal> 
                )}
               
        </View>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        backgroundColor:            'transparent',
        padding:                    5,
    },

    base:
    {
        flexDirection:              'row',
        alignItems:                 'flex-end',
        justifyContent:             'space-between',
        backgroundColor:            'transparent',
        paddingHorizontal:          5,
        minWidth:                   100,

    },

    fullscreen:
    {
        backgroundColor:            'transparent'
    },


    dropdown: 
    {
        flex:1,
        position:                   'absolute',
        paddingVertical:            theme.sizing.padding.xs,
        borderRadius:               theme.sizing.radius.sm,
        backgroundColor:            theme.colors.accent.white,
        ...theme.shadows.get(1)
    },

    option:
    {
        padding:                    theme.sizing.padding.xs
    },
    
})

const textStyles = StyleSheet.create(
{
    label:
    {
        color:                      theme.colors.text.primary,
        textAlign:                  'left',
        paddingHorizontal:          theme.sizing.padding.xs,
        marginRight: 5,
        ...theme.typography.h6
    },

    option:
    {
        padding: 0,
        flex:1,
        textAlign:                  'right',
        paddingHorizontal:          theme.sizing.padding.md,
    },

})

