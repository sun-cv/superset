import { Text,  View, StyleSheet, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Platform, Animated, Pressable} from 'react-native';
import  React, { useState, useRef, RefObject, useEffect }   from 'react';
import Modal                                                from 'react-native-modal';
import theme                                                from '#theme';
import UIButton                                             from './UIButton';
import { keyStringPair }                                    from '#types/function.ts';
import {UIWheelMenu }                                       from '#types/UIMenu.ts'
import { LinearGradient }                                   from 'expo-linear-gradient';
import UIDropdown from './UIDropdown';


const OPTION_HEIGHT = 45;
const VISIBLE_ITEMS = 5;
const PADDING = (VISIBLE_ITEMS - 1) / 2 * OPTION_HEIGHT;



export default function UISelect({label, returnValue, options = [], dropDown, UIStyle, UIText, UIShadow}: UIWheelMenu)
{
    const [modalVisible, setModalVisible]   = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number[]>(() => Array(options.length).fill(0));


    const scrollRefs        = useRef<RefObject<ScrollView>[]>([]);
    const lastIndexRef      = useRef<number[]>([]);

    const scrollYs = useRef(options.map(() => new Animated.Value(0))).current;
    
    if (scrollRefs.current.length !== options.length) 
    {
      scrollRefs.current = options.map(() => React.createRef<ScrollView>());
    }
    if (lastIndexRef.current.length !== options.length) 
    {
        lastIndexRef.current = Array(options.length).fill(0);
    }


    function createScrollEndHandler(columnIndex: number, scrollRef: RefObject<ScrollView>) 
    {
        return (event: NativeSyntheticEvent<NativeScrollEvent>) => 
        {
            const y                 = event.nativeEvent.contentOffset.y;
            const index             = Math.round(y / OPTION_HEIGHT);
            const snapTo            = index * OPTION_HEIGHT;

            const delta             = Math.abs(y - snapTo);
            const isBoundaryIndex   = index === 0 || index === options[columnIndex].options.length - 1;
            const shouldSnap        = (delta > 1  || isBoundaryIndex) && lastIndexRef.current[columnIndex] !== index;

            if (shouldSnap && scrollRef.current) 
            {
                setTimeout(() => 
                {
                    scrollRef.current?.scrollTo({ y: snapTo, animated: true });
                }, 100);
                           
                updateScrollForColumn(columnIndex, index);
            }
        }
    }

    function onWheelHandler(columnIndex: number, scrollRef: RefObject<ScrollView>) 
    {
        return (e: WheelEvent) => {
            e.preventDefault();
            
            const currentIndex = selectedIndex[columnIndex];
            
            const direction = e.deltaY > 0 ? 1 : -1;
            
            let newIndex = currentIndex + direction;
            const maxIndex = options[columnIndex].options.length - 1;
            newIndex = Math.max(0, Math.min(newIndex, maxIndex));
            
            if (newIndex === currentIndex) return;
            
            updateScrollForColumn(columnIndex, newIndex);
            
            scrollRef.current?.scrollTo({ y: newIndex * OPTION_HEIGHT, animated: true });
        };
    }

    function updateScrollForColumn(columnIndex: number, newIndex: number) 
    {
        setSelectedIndex(prev => 
        {
            const copy = [...prev]
            copy[columnIndex] = newIndex;
            lastIndexRef.current[columnIndex] = newIndex

            return copy
        })
    }

    function onAccept()
    {
        setModalVisible(false);

        const returnValues: keyStringPair = {}

        for (let index = 0; index < selectedIndex.length; index++) {
            returnValues[options[index].key] = options[index].options[selectedIndex[index]]
        }

        returnValue(returnValues);

    }

    function onCancel()
    {
        setModalVisible(false);
    }


    useEffect(() => 
    {
        if (Platform.OS === 'web') 
        {
            scrollRefs.current.forEach((scrollRef, columnIndex) => 
            {
                const node = scrollRef.current?.getScrollableNode ? scrollRef.current.getScrollableNode() : scrollRef.current;
                if (node) 
                {
                    const handler = onWheelHandler(columnIndex, scrollRef);
                    node.addEventListener('wheel', handler, { passive: false });
                    return () => node.removeEventListener('wheel', handler);
                }
            });
        }
    }, [modalVisible, selectedIndex]);
    
useEffect(() => {
    if (modalVisible) {
        scrollRefs.current.forEach((ref, columnIndex) => {
            const index     = selectedIndex[columnIndex];
            const scrollY   = index * OPTION_HEIGHT;
            ref.current?.scrollTo({ y: scrollY, animated: false });
        });
    }
}, [modalVisible]);

    return (
        <View style={styles.container}>
            <UIButton label={label} onPress={() => {setModalVisible(true)}} loading={false} variant='light' />

            <Modal isVisible={modalVisible} backdropOpacity={0} onBackdropPress={()=>{onCancel()}} style={{ margin: 0 }} animationIn='zoomIn' animationOut='fadeOut' animationInTiming={300} animationOutTiming={200}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.titleRow}>
                            <Text style={textStyles.title}>{label}</Text>
                        </View>
                        { dropDown && (
                        <View style={styles.dropdown}>
                            <UIDropdown label={dropDown.label} options={dropDown.options} returnValue={()=>{}} />
                        </View>
                        )}


                        <View style={styles.columns}>
                            {options.map((column, columnIndex) => 
                            {
                                const scrollRef = scrollRefs.current[columnIndex];
                                return ( 
                                <View key={`column-wrap-${columnIndex}`} style={{ flex: 1 }}>
                                    <View style={styles.selectionViewTop} />
                                    <Animated.ScrollView ref={scrollRef} style={styles.scrollView} contentOffset={{ y: .1, x: 0 }}  bouncesZoom={false} contentContainerStyle={{ paddingTop: PADDING, paddingBottom: PADDING }} decelerationRate={0.99} showsVerticalScrollIndicator={false} bounces={false} onMomentumScrollEnd={createScrollEndHandler(columnIndex, scrollRef)} scrollEventThrottle={16} onScroll={Animated.event(   [{ nativeEvent: { contentOffset: { y: scrollYs[columnIndex] } } }], { useNativeDriver: Platform.OS !== 'web'} )} >
                                    {
                                        column.options.map((option: string, optionIndex: number) => 
                                        {
                                            const optionScrollPosition = optionIndex * OPTION_HEIGHT;
                                            
                                            const inputRange = [
                                                optionScrollPosition - (2 * OPTION_HEIGHT),
                                                optionScrollPosition - (1 * OPTION_HEIGHT),
                                                optionScrollPosition,                        
                                                optionScrollPosition + (1 * OPTION_HEIGHT),
                                                optionScrollPosition + (2 * OPTION_HEIGHT),
                                            ];
                                            const rotateX = Platform.OS === 'web' ? '0deg' : scrollYs[columnIndex].interpolate({
                                                inputRange,
                                                outputRange: [ '60deg', '35deg', '0deg', '-35deg', '-60deg'],
                                                extrapolate: 'clamp',
                                            });
                                            return (
                                                <Animated.View key={`column-${columnIndex}-option-${optionIndex}`} style={[styles.option, { transform: [{ perspective: 500 }, { rotateX }] }]}>
                                                    <Text style={textStyles.option}>{option}</Text>
                                                </Animated.View>
                                            );
                                        })
                                    }
                                    </Animated.ScrollView>
                                    <View style={styles.selectionViewBottom} />
                                    <LinearGradient colors={['white', 'transparent']} locations={[0.25, 1]} style={effectStyles.fadeTop} pointerEvents="none" /> 
                                    <LinearGradient colors={['transparent', 'white']} locations={[0, 0.75]} style={effectStyles.fadeBottom} pointerEvents="none" />
                                </View>
                                );
                            })}
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View style={styles.pressable}/>
                            <Pressable onPress={() => onCancel()} style={styles.pressable}>
                                <Text style={textStyles.pressableCancel}>cancel</Text>
                            </Pressable>
                            <Pressable onPress={() => onAccept()} style={styles.pressable}>
                                <Text style={textStyles.pressableAccept}>accept</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );

}

const styles = StyleSheet.create(
{
    container:
    {
        flex:                       1,
        backgroundColor:            'transparent'
    },

    centeredView: 
    {
        flex:                       1,
        justifyContent:             'center',
        alignItems:                 'center',
        backgroundColor:            'transparent'
    },

    modalView: 
    {
        margin:                     10,
        backgroundColor:            'white',
        borderRadius:               theme.sizing.radius.md,
        width:                      300,
        ...theme.shadows.get(2)
        
    },

    titleRow:
    {
        alignSelf:                  'flex-start',
        marginLeft:                 15,
        marginTop:                  15,
    },

    dropdown:
    {
        flexDirection:              'row',
        justifyContent:             'space-between',
        height:                     30,
        marginTop:                  10,
    },

    columns:
    {
        flexDirection:              'row',
        marginHorizontal:           theme.spacing.margin.sm,
        justifyContent:             'center',
        paddingHorizontal:          0,
    },

    scrollView:
    {
        height:                     OPTION_HEIGHT * VISIBLE_ITEMS,
        overflow:                   'scroll',

        ...(Platform.OS === 'web' && {
            scrollBehavior: 'smooth',
        }),
    },

    option:
    {
        height:                     OPTION_HEIGHT,
        justifyContent:             'center',
        alignItems:                 'center',
        marginHorizontal: 2,
    },

    selectionViewTop:
    { 
        position:                   'absolute', 
        top:                        PADDING,
        left:                       0, 
        right:                      0, 
        height:                     4, 
        marginHorizontal:           7, 
        pointerEvents:              'none', 
        backgroundColor:            theme.colors.accent.outline,
        zIndex:                     10,
        ...theme.shadows.get(1),
        
    },

    selectionViewBottom:
    { 
        position:                   'absolute', 
        top:                        PADDING * 1.5,
        left:                       0, 
        right:                      0, 
        height:                     4, 
        marginHorizontal:           7, 
        pointerEvents:              'none', 
        zIndex:                     10,
        backgroundColor:            theme.colors.accent.outline,
        ...theme.shadows.get(1),
    },

    pressable:
    {
        width:                      80,
        paddingVertical:            5,
        marginHorizontal:           5,
    }
    
})

const textStyles = StyleSheet.create(
{
    modal:
    {
        marginBottom: 15,
        textAlign: 'center',
    },


    title:
    {
        color:                      theme.colors.text.primary,
        ...theme.typography.h5,
    },
    
    option:
    {
        textAlign:                  'center',
        marginBottom:               0,
        height:                     20,
        color:                      theme.colors.text.secondary,
        ...theme.typography.h5,
    },

    pressableAccept:
    {
        textAlign:                  'center',
        color:                      theme.colors.text.primary,
        ...theme.typography.h5,
    },

    pressableCancel:
    {
        textAlign:                  'center',
        color:                      theme.colors.hue.redSoft,
        ...theme.typography.h5,
    }
})


const effectStyles = StyleSheet.create(
{
    fadeTop: 
    {
        position: 'absolute',
        top: 0,
        left: -1,
        right: -1,
        height: OPTION_HEIGHT * 2.2,
        zIndex: 20,
    },

    fadeBottom: 
    {
        position: 'absolute',
        bottom: 0,
        left: -1,
        right: -1,
        height: OPTION_HEIGHT * 2.2,
        zIndex: 20,
    },

})