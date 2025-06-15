import { React, View, StyleSheet, ViewStyle }  from '../../lib/ReactIndex';
import { theme } from '#styles';


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