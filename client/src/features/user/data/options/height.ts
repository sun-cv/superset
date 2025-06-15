import { OptionSet } from "#types";

const HeightOptionSet: OptionSet = 
{
    type:       'scroll',
    modifier:   'dropdown',
    
    dropdown:   
    {   
        label:  'Units',
        mode:   'static',
        
        options:    
        [   
            {label:     'Feet & Inches',   value: 'imperial' },
            {label:     'Centimeters',     value: 'metric' }
        ],

        initialValue:   'imperial',
        externalValue:  null,
    },

    scroll: 
    {
        label:  'height',
        mode:   'reactive',

        options:
        {
            reactive: 
            {
                imperial: 
                [
                    Array.from({ length: 6 }, (_, i) => ({
                        label: `${i + 2}`,
                        value:    i + 2
                    })),
                    Array.from({ length: 12 }, (_, i) => ({
                        label: `${i + 1}`,
                        value:    i + 1
                    })),                    

                ],
                metric: 
                [
                    Array.from({ length: 61 }, (_, i) => {
                        const cm = 140 + i;
                        return { label: `${cm}`, value: cm };
                    })
                ]
            }
        },

        initialValue: 
        {
            reactive:
            {
                metric:     [ 190 ],
                imperial:   [ 6, 3],
            },
            static: [],
            dynamic: [],
        },

        externalValue: {},
    },

};


export default HeightOptionSet