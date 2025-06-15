import { Text, View, StyleSheet, Modal, useState, Platform, Animated, Pressable, LinearGradient } from '#lib/ReactIndex.ts'
import { styleBase, OptionSet } from '#types'
import Dropdown                 from './Dropdown'
import { Button }               from '../buttons'
import { theme }                from '#styles'
import UseScrollHandler         from './hooks/UseScrollHandler'
import useScrollSelect          from './hooks/UseScrollSelect'


const HEIGHT    = 45;
const ITEMS     = 5;
const COLUMN    = HEIGHT * ITEMS;
const PADDING   = HEIGHT * Math.floor(ITEMS / 2);

type ScrollSelectProps = 
{
    optionSet?:     OptionSet;
    optionHandler?: any;
    returnValue:    (value: any) => void
}


export default function ScrollSelect({ optionSet, optionHandler, returnValue }: ScrollSelectProps) 
{
    const [modal, setModal] = useState(false)

    const scrollSelect  = optionHandler ? optionHandler.scroll : useScrollSelect({ optionSet, callback: returnValue })
    const scroll        = UseScrollHandler({ scrollSelect, modal })

    const openModal = () =>
    {
        setModal(true)
    }

    const closeModal = () =>
    {
        setModal(false)
    }

    return (    
    <View style={layout.container}>
        <Button label={scrollSelect.label} style={styleBase} onPress={ openModal } loading={false} variant="light" />

        <Modal
          isVisible={modal}
          backdropOpacity={0}
          onBackdropPress={ closeModal }
          style={{ margin: 0 }}
          animationIn="fadeInDown"
          animationOut="fadeOut"
          animationInTiming={300}
          animationOutTiming={200}
        >
            <View style={layout.centeredView}>
                <View style={layout.modalView}>

                    <View style={layout.modalRow}>

                        <View style={components.titleBox}>
                            <Text style={text.title}>{scrollSelect.label}</Text>
                        </View>
                        {optionHandler.dropdown && (
                            <View style={components.dropdownBox}>
                                <Dropdown
                                    optionHandler={optionHandler}
                                />
                            </View>
                        )}
                    </View>

                    <View style={layout.columnContainer}>
                        {scrollSelect.options.map((column, columnIndex) => 
                        {
                            const scrollRef = scroll.refScrollViews.current[columnIndex]
                            return (
                              <View key={`column-wrap-${columnIndex}`} style={layout.column}>
                                <View style={components.selectionLineTop} />
                                <Animated.ScrollView
                                    ref={scrollRef}
                                    style={layout.scrollView}
                                    contentOffset={{ y: 1, x: 0 }}
                                    bouncesZoom={false}
                                    contentContainerStyle={{ paddingTop: PADDING, paddingBottom: PADDING }}
                                    decelerationRate="normal"
                                    showsVerticalScrollIndicator={false}
                                    bounces={false}
                                    onMomentumScrollEnd={scroll.scrollEndHandler(columnIndex)}
                                    scrollEventThrottle={16}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: scroll.refScrollYs.current[columnIndex] } } }]
                                    )}
                                >
                                {
                                    animatedScrollView(column, columnIndex, scroll.refScrollYs.current)
                                }
                                </Animated.ScrollView>
                                <View style={components.selectionLineBottom} />
                                <LinearGradient colors={['white', 'transparent']} locations={[0.45, 1]} style={element.fadeTop} pointerEvents="none" />
                                <LinearGradient colors={['transparent', 'white']} locations={[0, 0.55]} style={element.fadeBottom} pointerEvents="none" />
                              </View>
                            )
                        })}
                    </View>

                    <View style={layout.modalRow}>
                        <View style={components.pressable} />
                        <Pressable onPress={closeModal} style={components.pressable}>
                            <Text style={text.pressableCancel}>cancel</Text>
                        </Pressable>
                        <Pressable onPress={()=> { scrollSelect.onAccept(); closeModal() }} style={components.pressable}>
                            <Text style={text.pressableAccept}>accept</Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    </View>
    )
}

function animatedScrollView(column, columnIndex: number, refScrollYPositions: Animated.Value[]) 
{
    return column.map((option, optionIndex) => 
    {
        const optionScrollPosition = optionIndex * HEIGHT
        const half = Math.floor(ITEMS / 2)
        
        const inputRange = Array.from({ length: ITEMS }, (_, i) => 
        {
            const offset = i - half
            return optionScrollPosition + offset * HEIGHT
        })
      
        const outputRange = Array.from({ length: ITEMS }, (_, i) => 
        {
            const offset = i - half
            const angle = -offset * (30 / half)
            return `${angle}deg`
        })
      
        const animatedY = refScrollYPositions[columnIndex]
        const rotateX =
                !animatedY
                ? '0deg'
                : animatedY.interpolate({
                      inputRange,
                      outputRange,
                      extrapolate: 'clamp',
                  })
              
        return (
            <Animated.View key={`column-${columnIndex}-option-${optionIndex}`} style={[components.option, { transform: [{ perspective: 500 }, { rotateX }] }]}>
                <Text style={text.option}>{option.label ?? String(option.value)}</Text>
            </Animated.View>
        )
    })
}


const layout = StyleSheet.create(
{
    container: 
    {
    },

    centeredView:
    {
        flex: 1,
        justifyContent:         'center',
        alignItems:             'center',
        backgroundColor:        'transparent',
    },

    modalView: 
    {
        width:                  280,
        height:                 330,
        justifyContent:         'space-between',
        borderRadius:           theme.sizing.radius.md,
        backgroundColor:        'rgba(255, 255, 255, 1)',
        padding:                theme.spacing.padding.sm,
     ...theme.shadows.get(3),
    },

    modalRow: 
    {
        height:                 40,
        paddingHorizontal:      5,
        flexDirection:          'row',
        justifyContent:         'space-between',
        alignItems:             'center',
    },

    columnContainer: 
    {
        height:                 COLUMN + 10,
        flexDirection:          'row',
        flexShrink:             1,
        justifyContent:         'center',
        alignItems:             'center',
    },

    column:
    {
        height:                 COLUMN,
        width:                  75,
        marginHorizontal:       theme.spacing.margin.xs,
        alignContent:           'center',
    },

    scrollView: 
    {
        height: HEIGHT * ITEMS,
        overflow: 'scroll',
    },
})


const components = StyleSheet.create(
{

    titleBox:
    {   
        flexShrink:             1,
        width:                  '30%',
        height:                 '100%',
        justifyContent:         'center',
    },

    dropdownBox:    
    {
        flexShrink:             1,
        width:                  '50%',
        height:                 '100%',
        justifyContent:         'center',
        // backgroundColor:        'rgba(150, 0, 0, 0.44)'
    },

    pressable:    
    {
        flex:                   1,
        flexShrink:             1,
        justifyContent:         'center',
    },

    option:       
    {
        height:                 HEIGHT,
        justifyContent:         'center',
        alignItems:             'center',
    },

    selectionLineTop:
    { 
        position:               'absolute', 
        top:                    PADDING,
        left:                   0, 
        right:                  0, 
        height:                 4, 
        marginHorizontal:       7, 
        pointerEvents:          'none', 
        backgroundColor:        theme.colors.accent.outline,
        zIndex:                 10,
        ...theme.shadows.get(1),
    },

    selectionLineBottom:
    { 
        position:               'absolute', 
        top:                    PADDING * 1.5,
        left:                   0, 
        right:                  0, 
        height:                 4, 
        marginHorizontal:       7, 
        pointerEvents:          'none', 
        zIndex:                 10,
        backgroundColor:        theme.colors.accent.outline,
        ...theme.shadows.get(1),
    },

});

const element = StyleSheet.create(
{
    fadeTop: 
    {
        position:               'absolute',
        top:                    0,
        left:                   0,
        right:                  0,
        height:                 HEIGHT * 1.5,
    },

    fadeBottom:
    {
        position:               'absolute',
        bottom:                 0,
        left:                   0,
        right:                  0,
        height:                 HEIGHT * 1.5,
    },
})


const text = StyleSheet.create(
{
    modal: 
    {
        textAlign: 'center',
        marginBottom: 15,
    },

    title: 
    {
        textAlign: 'center',
        marginBottom: 0,
        color: theme.colors.text.primary,
     ...theme.typography.h4,
    },

    option: 
    {
        textAlign: 'center',
        marginBottom: 0,
        height: 20,
        color: theme.colors.text.secondary,
     ...theme.typography.h5,
    },

    pressableAccept: 
    {
        textAlign: 'center',
        color: theme.colors.text.primary,
     ...theme.typography.h5,
    },

    pressableCancel: 
    {
        textAlign: 'center',
        color: theme.colors.hue.redSoft,
     ...theme.typography.h5,
    },
})
