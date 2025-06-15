import { useRef, RefObject, useEffect, useState, Platform, Animated, ScrollView, NativeSyntheticEvent, NativeScrollEvent, React } from '../../../lib/ReactIndex'

const HEIGHT = 45;

type useScrollHandlerParams = 
{
    scrollSelect: any;
    modal: any;
};

export default function UseScrollHandler({ scrollSelect, modal }: useScrollHandlerParams) 
{
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);

    const refIndexes        = useRef<number[]>([]);
    const refScrollViews    = useRef<RefObject<ScrollView>[]>([]);
    const refScrollYs       = useRef<Animated.Value[]>([]);
    const wheelListeners    = useRef<{ node: any, handler: (e: WheelEvent) => void }[]>([]);


    useEffect(() => 
    {
        validatePosition();
    }, 
    [selectedIndexes]);


        // Ref reset on dynamic/reactive change
    useEffect(() => 
    {
        scrollSelect.onModifierChange()

        const columns = scrollSelect.options.length;

        while (refScrollYs.current.length < columns) 
        {
            refScrollYs.current.push(new Animated.Value(0));
        }
        while (refScrollViews.current.length < columns) 
        {
            refScrollViews.current.push(React.createRef<ScrollView>());
        }
        refIndexes.current      = scrollSelect.ref.option.map((value: string | number, columnIndex: number) =>
        {
            return scrollSelect.utils.getIndexByValue(columnIndex, value);
        });
        setSelectedIndexes([...refIndexes.current]);
    }, 
    [scrollSelect.options.length]);


    useEffect(() => 
    {
        scrollToRefSelectedIndexes({ animated: true });
    }, 
    [scrollSelect.options.length, modal])


    const scrollEndHandler = (columnIndex: number) => 
    {
        return (event: NativeSyntheticEvent<NativeScrollEvent>) => 
        {
            const y             = event.nativeEvent.contentOffset.y;
            const newIndex      = Math.round(y / HEIGHT);
            const snapTo        = newIndex * HEIGHT;
            const delta         = Math.abs(y - snapTo);
            const isEdge        = newIndex === 0 || newIndex === getColumnLength(columnIndex) - 1;
            const shouldSnap    = delta > 1;

            if (shouldSnap) 
            {
                setTimeout(() => 
                {
                    refScrollViews.current[columnIndex].current?.scrollTo({ y: snapTo, animated: true });
                }, 50);
                refIndexes.current[columnIndex] = newIndex;
            }

            setSelectedIndexes([...refIndexes.current]);

            const newScrollValues = refIndexes.current.map((i, col) => scrollSelect.options[col][i]);
            scrollSelect.onChange?.(newScrollValues);
        }
    };


    const scrollToRefSelectedIndexes = ({ animated }: { animated: boolean }) => 
    {
        refScrollViews.current.forEach((scrollRef, columnIndex) => 
        {
            const index     = refIndexes.current[columnIndex];
            const scrollY   = index * HEIGHT;

            console.log('animated', animated)

            scrollRef.current?.scrollTo({ y: scrollY, animated });
            refScrollYs.current[columnIndex].setValue(scrollY);
        });
    };

    // Web scroll handler
    const validatePosition = () => 
    {
        refIndexes.current.forEach((selectedIndex, columnIndex) => 
        {
            const max = getColumnLength(columnIndex);
            if (selectedIndex >= max) 
            {
                refIndexes.current[columnIndex] = max - 1;
            }
        });
    };


        // Util
    const getColumnLength = (columnIndex: number) => 
    {
        return scrollSelect.options[columnIndex]?.length ?? 0;
    };
       


    return { refScrollViews, refScrollYs, scrollEndHandler };
}
