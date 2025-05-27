import BaseCard from '#components/cards/BaseCard.tsx';
import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';

import theme from '#theme'


export default function SignUpScreen() 
{
    const handleGoogleSignIn = () => {
        Alert.alert('Google Sign-In', 'Google auth coming soon!');
        window.alert('Google auth coming soon!')
    };

    const handleGuestSignIn = () => {
        Alert.alert('Guest Mode', 'Continuing as guest...');
        window.alert('Continuing as guest...');
        router.navigate('/root/signup/introduction')
    };



    return (
        <View style={styles.container}>
            <BaseCard style={styles.card}>
                <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
                    <Text style={styles.buttonText}>Sign-in with Google</Text>
                </TouchableOpacity>
            </BaseCard>
            <BaseCard style={styles.card}>

                <TouchableOpacity style={styles.button} onPress={handleGuestSignIn}>
                    <Text style={styles.buttonText}>Continue as Guest</Text>
                </TouchableOpacity>
            </BaseCard>

        </View>
    );
}

const styles = StyleSheet.create({
    container: 
    {
        flex:                       1,
        justifyContent:             'center'
    },
    card: 
    {...theme.defaults.card,
        
        marginBottom:               20,
    },
    button:
    {
        flex:                       1,
        justifyContent:             'center',
        alignItems:                 'center'
    },
    buttonText: 
    {...theme.typography.h6,
        
        color:                      theme.colors.text.primary,
    },

});
