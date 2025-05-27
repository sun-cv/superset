import React                            from 'react';
import { View, StyleSheet, ViewStyle }  from 'react-native';
import theme                            from '#theme';


const BaseCard = ({ children, style }: { children: React.ReactNode; style?: ViewStyle }) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    card:       
    {       
        height:                     100,
        marginBottom:               10,
        borderRadius:               20,
        backgroundColor:            theme.colors.surface
    }
})

export default BaseCard