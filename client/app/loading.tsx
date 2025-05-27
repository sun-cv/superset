import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import theme from '#theme';


export default function Loading() 
{
    const router = useRouter();

    useEffect(() => 
    {
        const timer = setTimeout(() => 
        {
            router.replace('/root/signup/landing');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={theme.colors.accent.primary} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
