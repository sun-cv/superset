import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

export default function LoadingScreen() 
{
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create(
{
    container: 
    {
        flex:                   1,
        justifyContent:         'center',
        alignItems:             'center',
        backgroundColor:        'white',
    },
    text: 
    {
        marginTop:              12,
        fontSize:               16,
        color:                  '#333',
    },
});
