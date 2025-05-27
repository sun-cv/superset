import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '#theme';
import { Image } from 'react-native';


const debug = true

export default function Intro() 
{
    const router    = useRouter();

    const delay     = debug ? 0 : 2000;
    const signedIn  = debug ? true : false;


    useEffect(() => {
        const timer = setTimeout(() => 
        {
            if (debug)
            {
                router.replace('/root/test/interface')
            }
            else
            {
                router.replace(signedIn ? '/root/dashboard/dashboard' : '/root/signup/landing');
            }
        }, delay);
        return () => clearTimeout(timer);
    }, []);

  return (
     debug ? <View /> 
     :
    <View style={styles.container}>
        <Image
            source={require('../assets/animations/superset.gif')}
            style={{ width: theme.sizing.logo.width, height: theme.sizing.logo.height }}
            resizeMode="contain"
        />
    </View>
    
  );
}

const styles = StyleSheet.create
({
  container: {
        flex:                       1,
        justifyContent:             'center',
        alignItems:                 'center',
        backgroundColor:            'white' },
});
