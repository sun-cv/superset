import { Platform } from 'react-native';

export type ShadowLevel = 0 | 1 | 2 | 3;

const tier: Record<ShadowLevel, any> = 
{
    0: {},
    1: 
    {
        ios: 
        {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
        },
        android: 
        {
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12)',
        },
        web: 
        {
            boxShadow: '0px 1px 3px rgba(0,0,0,0.12)',
        },
    },
    2: 
    {
        ios: 
        {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
        },
        android: 
        {
            boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',

        },
        web: 
        {
            boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        },
    },
    3: 
    {
        ios: 
        {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
        },
        android: 
        {
            boxShadow: '0px 6px 10px rgba(0,0,0,0.19)',
        },
        web: 
        {
            boxShadow: '0px 6px 10px rgba(0,0,0,0.19)',
        },
    },
};


function get(level: ShadowLevel = 0): any 
{
    if (Platform.OS === 'web') 
    {
        return tier[level].web;
    }
    if (Platform.OS === 'android') 
    {
        return tier[level].android;
    }
    if (Platform.OS === 'ios')
    {
        return tier[level].ios;
    }
}

const shadows = { get }

export default shadows