import React, { createContext, useState, useContext, ReactNode } from 'react';

import { User } from '#types/user.ts'

type UserContextType = 
{
    user: User | undefined;
    editUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => 
{
    const [ user, setUser ] = useState<User>();

    const editUser = (user: User) =>
    {
        setUser((current) => current = user);
    }

    return (
        <UserContext.Provider value={{user, editUser}}>
        {children}
        </UserContext.Provider>
    )
}

export const useUser = () =>
{
    const context = useContext(UserContext);
    if (!context) throw new Error('Missing user context');
    return context
}