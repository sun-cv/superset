import { useState, useRef, Dimensions, TouchableOpacity, Text, View, StyleSheet, Modal } from '../../lib/ReactIndex';
import * as Animatable          from 'react-native-animatable';
import { Ionicons }             from '@expo/vector-icons';
import { Option, OptionSet }    from '#types';
import { theme }                from '#styles';
import useDropdown              from './hooks/UseDropdown';

export type DropdownProps = 
{
    optionSet?:     OptionSet;
    optionHandler?: any;
    returnValue?:   (value: any) => void
};

export default function Dropdown({ optionSet, optionHandler, returnValue }: DropdownProps) 
{
    const [dropdownVisible, setDropdownVisible ] = useState(false);
    const [dropdownLayout,  setdropdownLayout  ] = useState({ x: 0, y: 0, width: 0, height: 0 });
    
    const touchableRef  = useRef<View>(null);
    const dropdown      = optionHandler ? optionHandler.dropdown : useDropdown({ optionSet, callback: returnValue })

    const openDropdown  = () => 
    {        
        setDropdownVisible(true);
    };

    const closeDropdown  = () =>
    {
        setDropdownVisible(false)
    }

    const measureDropdown = () =>
    {
        touchableRef.current.measureInWindow((x: number, y: number, width: number, height: number) => 
        {
            setdropdownLayout({ x, y, width, height });
        });
    }

    return (
        <View style={layout.container}>
            <TouchableOpacity ref={touchableRef} onPress={() => { measureDropdown(); openDropdown();}} activeOpacity={0.8} style={components.base}>
                <View style={{ flexShrink: 1 }}>
                    <Text style={text.label} numberOfLines={1}>{dropdown.label}</Text>
                </View>
                <Ionicons name={'chevron-down-outline'} />
            </TouchableOpacity>

            {dropdownVisible && (
                <Modal
                    style={layout.modal}
                    isVisible={dropdown}
                    backdropOpacity={0}
                    onBackdropPress={() => closeDropdown() }
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    animationInTiming={300}
                    animationOutTiming={200}
                >
                    <Animatable.View animation="fadeInRight" duration={200} style={[layout.dropdown, { position: 'absolute', top: dropdownLayout.y, right: Dimensions.get('window').width - (dropdownLayout.x + dropdownLayout.width) }]}>
                        {dropdown?.options.map((option: Option) => (
                            <TouchableOpacity
                              key={option.value.toString()}
                              onPress={() => { dropdown.setValue(option); dropdown.onAccept(); closeDropdown()}}
                              style={components.option}
                            >
                                <Text style={text.option}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </Animatable.View>
                </Modal>
            )}
        </View>
    );
}

const layout = StyleSheet.create(
{
    container:
    {
        flex:                   1,
        justifyContent:         'center',
        backgroundColor:        'transparent',
        maxHeight:              25,
        maxWidth:               200,
    },

    modal:
    {
        margin: 0,
        backgroundColor:        'transparent'
    },


    dropdown: 
    {
        flex:                   1,
        position:               'absolute',
        paddingVertical:        theme.sizing.padding.sm,
        borderRadius:           theme.sizing.radius.sm,
        backgroundColor:        'rgba(255, 255, 255, 1)',

     ...theme.shadows.get(1)
    },

    
})

const components = StyleSheet.create(
{
    base:
    {
        height:                 '100%',
        flexDirection:          'row',
        alignItems:             'center',
        justifyContent:         'flex-end',
        backgroundColor:        'transparent',
        paddingHorizontal:      5,

    },

    option:
    {
        padding:                theme.sizing.padding.sm
    },

})

const text = StyleSheet.create(
{
    label:
    {
        color:                  theme.colors.text.primary,
        textAlign:              'left',
        paddingHorizontal:      theme.sizing.padding.sm,
        marginRight:            5,
     ...theme.typography.h6
    },

    option:
    {
        padding:                0,
        flex:                   1,
        textAlign:              'right',
        paddingHorizontal:      theme.sizing.padding.md,
    },
})

