
import { OptionSet, Option, OptionCallback } from '#types';
import { useRef, useState } from 'react';
import useDropdown from './UseDropdown';
import useScrollSelect from './UseScrollSelect';

type OptionHookProps =
{
    optionSet:  OptionSet,
    callback?:  OptionCallback

}

export default function useOptionHandler({ optionSet, callback}: OptionHookProps)
{
    const { type: optType, modifier: modType } = optionSet;

    const [ _, render ] = useState(0);


    const modifier  = modifierHandlers[modType]({ optionSet, callback: modifierCallback});
    const option    = optionHandlers[optType]({ optionSet, modifier, callback: optionCallback });
    
    const optionHandler     = {};
    optionHandler[modType]  = modifier
    optionHandler[optType]  = option;

    function modifierCallback(value: Option)
    {
        render((x)=> x + 1)
    }

    function optionCallback(value: Option | Option[])
    {
        callback(value);
    }

    return optionHandler;
}


const optionHandlers = 
{
    scroll:     useScrollSelect,
}

const modifierHandlers =
{
    dropdown:   useDropdown,
}