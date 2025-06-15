import { useRef, useState } from "#lib/ReactIndex.ts";
import { OptionSet, Option, OptionCallback } from "#types";


type DropdownHookProps =
{
    optionSet: OptionSet,
    callback?:  OptionCallback
}


export default function useDropdown({ optionSet, callback }: DropdownHookProps) 
{
    const { dropdown  } = optionSet
    const [ _, render ] = useState(0);

    const dropdownValue = useRef<Option>(optionSet.dropdown.options.find((option)=> {  const initialValue = dropdown?.externalValue ?? dropdown?.initialValue; return option.value == initialValue }));

    function setValue(newValue: Option) 
    {
        dropdownValue.current = newValue;
    }

    function getValue() 
    {
        return dropdownValue.current;
    }

    function onAccept()
    {
        callback(dropdownValue.current);
    }

    function onRender()
    {
        render((x) => x + 1);
    }

    return {
        label:                  dropdownValue.current.label,
        mode:                   dropdown.mode,
        options:                dropdown.options,
        initialValue:           dropdown.initialValue,
        externalValue:          dropdown.externalValue,

        ref:
        {
            get option() { return getValue() }        
        },

        setValue,
        getValue,
        onAccept,
        onRender,
    };
}
