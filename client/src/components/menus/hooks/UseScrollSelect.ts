import { useRef, useState } from "../../../lib/ReactIndex";
import { OptionSet, Option, OptionCallback} from "#types";


type ScrollValues    = (string | number)[]
type ScrollHookProps =
{
    optionSet:  OptionSet,
    modifier?:  any,
    callback?:  OptionCallback
}

export default function useScrollSelect({ optionSet, modifier: modifierObj, callback }: ScrollHookProps) 
{
    const { scroll }    = optionSet
    const [ _, render ] = useState(0);

    const modifier      = modifierObj?.ref?.option?.value;

    const handler       = assignHandler()
    const scrollValues  = useRef<ScrollValues>(handler.getDefault());

    function setValue(newScrollValues: ScrollValues) 
    {
        scrollValues.current = newScrollValues;
    }

    function getValue() 
    {
        return scrollValues.current;
    }

    function getModifier()
    {
        return modifier;
    }

    function onChange(newScrollValues: Option[]) 
    {
        scrollValues.current = newScrollValues.map((option) => option.value)
    }

    function onAccept()
    {

        callback(resolveOptions());
    }

    function onRender()
    {
        render((x) => x + 1);
    }

    function onModifierChange()
    {
        handler.onModifier();
    }

    function resolveOptions()
    {
        return scrollValues.current.map((value, index) => getOptionByValue(index, value))
    }

    function assignHandler()
    {
        const handler = 
        {
            static:     staticHandler(),
            dynamic:    dynamicHandler(),
            reactive:   reactiveHandler(),
        }

        return handler[scroll.mode];
    }


    function staticHandler()
    {
        const getDefault = () =>
        {
            return scroll.initialValue.static ?? [];
        }

        const getOptions = () =>
        {
            return scroll.options.static ?? [];
        }


        return {
            getDefault,
            getOptions,
        }
    }

    function dynamicHandler()
    {
        const getDefault = () =>
        {
            return scroll.initialValue.dynamic ?? [];
        }

        const getOptions = () =>
        {
            return (
                scroll.options.dynamic({
                    scrollValues:   scrollValues.current,
                    modifierValue:  modifier ?? undefined,
                }) 
                ?? []
            );
        }

        return {
            getDefault,
            getOptions,
        }
    }

    function reactiveHandler()
    {
        const getDefault = () =>
        {
            return scroll.initialValue.reactive?.[getModifier()] ?? [];
        }

        const getOptions = () =>
        {
            return scroll.options.reactive?.[getModifier()] ?? [];
        }

        const onModifier = () =>
        {
            scrollValues.current = getDefault()
        }

        return {
            getDefault,
            getOptions,
            onModifier,
        }
    }

    function getIndexByValue(colIndex: number, value: string | number): number 
    {
        const column = handler.getOptions()[colIndex] || [];
        return column.findIndex((opt) => opt.value === value);
    }

    function getOptionByValue(colIndex: number, value: string | number): Option | null 
    {
        const column = handler.getOptions()[colIndex] || [];
        return column.find((opt) => opt.value === value) ?? null;
    }

    function getValueByIndex(colIndex: number, index: number): string | number | null 
    {
        const column = handler.getOptions()[colIndex] || [];
        return column[index]?.value ?? null;
    }

    function getOptionByIndex(colIndex: number, index: number): Option | null 
    {
        const column = handler.getOptions()[colIndex] || [];
        return column[index] ?? null;
    }

    return {
        label:                  scroll.label,
        mode:                   scroll.mode,
        options:                handler.getOptions(),
        initialValue:           scroll.initialValue,
        externalValue:          scroll.externalValue,

        getValue,
        setValue,
        onChange,
        onAccept,
        onRender,
        
        onModifierChange,

        ref:
        {
            get option() { return getValue() }
        },

        utils:
        {
            getIndexByValue,
            getOptionByValue,
            getValueByIndex,
            getOptionByIndex,
        },
    };
}

