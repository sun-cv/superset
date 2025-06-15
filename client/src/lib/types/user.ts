
type UserBase = 
{
    age:                            string;
    gender:                         string;
    height:                         number;
    weight:                         string;
    activity:                       'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
}



export type Guest = UserBase &
{
    name: 
    {
        first:                      string
    },
}

export type Member = UserBase &
{
    id:                             number;
    name: 
    {
        first:                      string;
        middle?:                    string;
        last?:                      string;
    }               
}


export type User = Guest | Member