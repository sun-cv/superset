import { StyleSheet, View, Text, TextInput} from 'react-native';
import { useUser }                          from '#contexts/userContext.tsx'
import theme                                from '#theme';
import { Ionicons }                         from '@expo/vector-icons';


export default function introductionScreen()
{
    const { user, editUser } = useUser();


    return (
    <View style={styles.container}>
        <View style={styles.titleCard}>
                <Text style={styles.title}>Superset</Text>
        </View>
        <View style={styles.card}>
            <View style={styles.inputRow}>
                <Ionicons name="person-outline" size={24} color={theme.colors.text.primary} />
                <TextInput
                  style={styles.inputBox}
                  placeholder="Your name"
                  placeholderTextColor={theme.colors.text.subtle}
                  value={user?.name?.first || ''}
                  onChangeText={(newName) => {
                    editUser({ ...user, name: { first: newName }, type: 'guest' });
                  }}
                />
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={24} color={theme.colors.text.primary} />
                <TextInput
                  style={styles.inputBox}
                  placeholder="Birthday"
                  placeholderTextColor={theme.colors.text.subtle}
                  value={user?.age || ''}
                  onChangeText={(newAge) => {
                    editUser({ ...user, age: newAge, type: 'guest' });
                  }}
                />
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.inputRow}>
                <Ionicons name="body-outline" size={24} color={theme.colors.text.primary} />

            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.inputRow}>
                <Ionicons name="scale-outline" size={24} color={theme.colors.text.primary} />
                <TextInput
                  style={styles.inputBox}
                  placeholder="Weight"
                  placeholderTextColor={theme.colors.text.subtle}
                  value={user?.weight || ''}
                  onChangeText={(newWeight) => {
                    editUser({ ...user, weight: `${newWeight}`, type: 'guest' });
                  }}
                />
            </View>
        </View>

        <View style={styles.card}>
            <View style={styles.inputRow}>
                <Ionicons name="male-outline" size={24} color={theme.colors.text.primary} />
                <TextInput
                  style={styles.inputBox}
                  placeholder="Gender"
                  placeholderTextColor={theme.colors.text.subtle}
                  value={user?.gender || ''}
                  onChangeText={(newGender) => {
                    editUser({ ...user, gender: newGender, type: 'guest' });
                  }}
                />
            </View>
        </View>
    </View>

    
    )
}

const pickerStyles = {
    inputIOS: {
        fontSize:           18,
        paddingVertical:    10,
        paddingHorizontal:  12,
        borderWidth:        1,
        borderColor:        theme.colors.accent.subtle,
        borderRadius:       8,
        color:              theme.colors.text.primary,
        width:              80,
        marginRight:        10,
        backgroundColor:    theme.colors.accent.light,
    },
    inputAndroid: {
        fontSize: 18,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: theme.colors.accent.subtle,
        borderRadius: 8,
        color: theme.colors.text.primary,
        width: 80,
        marginRight: 10,
        backgroundColor: theme.colors.accent.light,
    },
};


const styles = StyleSheet.create({
    container: 
    {
        flex:                       1,
    },

    titleCard:
    {...theme.defaults.card,

        height:                     150,
        justifyContent:             'center',
        alignItems:                 'center'
    },

    card: 
    {...theme.defaults.card,
        justifyContent:             'center',
        alignContent:               'center',
    },
    
    title:
    {...theme.typography.h1,
        color:                      theme.colors.text.logo
    },

    text: 
    {...theme.typography.h7,

        paddingLeft:                15,
        textAlign:                  'left',
        color:                      theme.colors.text.primary,
    },

    inputBox:
    {
        flex:                       1,
        height:                     '100%',
        borderRadius:               theme.sizing.radius.sm,
        paddingLeft:                10,
        backgroundColor:            theme.colors.accent.white,
        borderColor:                theme.colors.accent.light,
        borderWidth:                1,
    },

    inputRow: 
    {
        flexDirection:              'row',
        alignItems:                 'center',
        backgroundColor:            theme.colors.accent.white,
        borderRadius:               theme.sizing.radius.sm,
        marginHorizontal:           theme.sizing.margin.md,
        paddingHorizontal:          10,
        height:                     60,
        gap:                        10,
        padding:                    10
    },

    helperText: 
    {
        fontSize:                   16,
        marginHorizontal:           theme.sizing.margin.md,
        marginBottom:               8,
        color:                      theme.colors.text.subtle
    },
});