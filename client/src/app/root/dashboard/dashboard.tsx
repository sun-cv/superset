import { React, View, StyleSheet, ScrollView} from '../../../lib/ReactIndex';
import { theme } from '#styles';


const cards = ['dash', 'card', 'card', 'card','card','card', 'card','card','card', ]

const Dashboard = () => {

    return (
        <ScrollView contentContainerStyle={style.container} showsVerticalScrollIndicator={false}>
                {cards.map((card, index) => (
                <View key={index} style={style[card]} />
                ))}    
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: 
    {
        flex:                       1,
    },   

    dash:       
    {       
        height:                     250,
        marginBottom:               10,
        borderRadius:               theme.sizing.radius.md,
        backgroundColor:            theme.colors.background.surface,
    },      
    card:       
    {       
        height:                     100,
        marginBottom:               10,
        borderRadius:               theme.sizing.radius.lg,
        backgroundColor:            theme.colors.background.surface,
    }
 
});

export default Dashboard;
