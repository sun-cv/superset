import { OptionSet } from "#types";

const GenderOptionSet: OptionSet = 
{
    type: 'scroll',

    scroll:
    {
        label:  'Gender',
        mode:   'static',

        initialValue:   
        {
            static: ['male'],
        },
        externalValue:
        {
            static: null,
        },

        options:
        {
            static: [[{ label: 'Male', value: 'male' }, {label: 'Female', value: 'female'}, { label: 'Non-Binary', value: 'other' }] ]
        }
    }
    
}

export default GenderOptionSet