import React, { createContext, useState, useContext, ReactNode } from 'react';


type Global = {};

type GlobalContextType = 
{
    global: Global
    editGlobal: (global: Global) => void;
}

const GlobalContext = createContext<GlobalContextType>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => 
{
    const [ global, setGlobal ] = useState<Global>();

    const editGlobal = (global: Global) =>
    {
        setGlobal((current) => current = global);
    }

    return (
        <GlobalContext.Provider value={{ global, editGlobal}}>
        {children}
        </GlobalContext.Provider>
    )
}

export const useUser = () =>
{
    const context = useContext(GlobalContext);
    if (!context) throw new Error('Missing global context');
    return context
}