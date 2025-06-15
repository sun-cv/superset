export type Option = 
{ 
    label:          string; 
    value:          string | number; 
    key?:           string; 
    disabled?:      boolean; 
    meta?:          any; 
}

export type OptionCallback = (value: Option | Option[]) => void;

    // Dropdown
export type DropdownOptionSet   = 
{
    label:          string;
    mode:           OptionSetMode;
    options:        Option[];

    initialValue:   string | number;
    externalValue?: string | number;
}


    // Scroll
export type ScrollOptionSet     = 
{
    label:      string;
    mode:       string;
    options:
    {
        static?:    Option[][];                  
        dynamic?:   ((args: { scrollValues?: (string | number)[], modifierValue?: string | number }) => Option[][]);
        reactive?:  {[key: string]: Option[][]}
    }

    initialValue:
    {
        static?:    (string | number)[]
        dynamic?:   (string | number)[]
        reactive?:  {[key: string]: (string | number)[]}
    }
    externalValue:
    {
        static?:    (string | number)[]
        dynamic?:   (string | number)[]
        reactive?:  {[key: string]: (string | number)[]}
    }
};


    // Option Set
export type OptionSetMode       = 'static' | 'dynamic'  | 'reactive';
export type OptionSetType       = 'scroll' | 'dropdown';
export type OptionSetModifier   = 'scroll' | 'dropdown';



export type OptionSet           = 
{
    type:       OptionSetType;
    modifier?:  OptionSetModifier

    dropdown?:  DropdownOptionSet;
    scroll?:    ScrollOptionSet;


};
