import { UIStyle, UIText, UIShadow } from '#types/UIStyle.ts';
import { keyStringPair }             from '#types/function.ts';


export type UIWheelColumn = 
{
  key:                              string;
  options:                          string[];
  function:                         () => void;
};

export type UIWheelMenu =
{
    label:                          string,
    options:                        any[],
    dropDown?:                      any,
    UIStyle?:                       UIStyle,
    UIText?:                        UIText,
    UIShadow?:                      UIShadow,
    returnValue:                    (value: keyStringPair) => void
};


export type UIDropDown =
{
    label:                          string,
    options:                        any[],
    styles?:                        UIStyle
    onUpdate?:                      () => void,
    returnValue:                    (value: keyStringPair) => void
}