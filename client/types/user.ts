
type GuestFrame =
{
    name: 
    {
        first:                      string
    },
    type:                           'guest'
}

type RegisteredFrame =
{
    id:                             number;
    name: 
    {
        first:                      string;
        middle?:                    string;
        last?:                      string;
    }               
    type:                           'registered'
}

type DefaultUser = 
{
    age:                            string;
    gender:                         string;
    height:                         number;
    weight:                         string;
    activity:                       'sedentary' | 'light' | 'moderate' | 'active' | 'very active';
}


export type GuestUser       = GuestFrame & DefaultUser
export type RegisteredUser  = RegisteredFrame & DefaultUser

export type User = GuestUser | RegisteredUser