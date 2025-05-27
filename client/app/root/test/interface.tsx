import UIButton from "#components/interface/UIButton.tsx";
import UIDropdown from "#components/interface/UIDropdown.tsx";
import UISelect from "#components/interface/UISelect.tsx";
import theme from "#theme";
import { keyStringPair } from "#types/function.ts";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";


export default function testInterface()
{
    const [selectedValue, setSelectedValue]                     = useState<string>();
    const [selectedKeyStringValue, setSelectedKeyStringValue]   = useState<keyStringPair>();

    function createCount()
    {
        for (let index = 0; index < 10; index++) {
            testOptions[0].options.push(index)
            testOptions[1].options.push(index)
            testOptions[2].options.push(index)
        }
    }

    createCount()

    const dropdown = 
    {
        label:      'dropdown',
        options:    ['Feet & Inches', 'Centimeters'],
        onUpdate:   () => { console.log('update')},
        returnValue:(value: keyStringPair) => { return value},
    }

    console.log('dropdown:', selectedValue)
    console.log('key string pair: ', selectedKeyStringValue)

    return (
        <View style={styles.container}>
            <View style={{margin: 20}}/>
            <UIButton label={'button'} onPress={()=> Alert.alert('its a button')} variant="light"/>
            <View style={{margin: 20}}/>
            <UIDropdown label={'dropdown'} returnValue={(value) => {setSelectedValue(value)}} options={options}/>
                <View style={{margin: 120}}/>
            <UISelect label={'Select Menu'} returnValue={(value: keyStringPair) => { setSelectedKeyStringValue(value)}} dropDown={dropdown} options={testOptions} ></UISelect>

        </View>
    )
}

const styles = StyleSheet.create(
{
    container: 
    {
        flex:                       1
    },

})

const options = ['test', 'testing', 'testingungs']

const testOptions =
[
    {
        key: '1',
        options:[]
    },
    {
        key: '2',
        options:[]
    },
    {
        key: '3',
        options:[]
    }
]



