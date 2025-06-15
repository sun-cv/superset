import { Alert, StyleSheet, View } from '../../../lib/ReactIndex'
import { Button, Dropdown, ScrollSelect }    from '#components'
import { styleBase }    from '#types'
import HeightOptionSet  from '#features/user/data/options/height.ts'
import DateOptionSet    from '#features/user/data/options/date.ts'
import useOptionHandler from '#components/menus/hooks/UseOptionHandler.ts'
import MenuValueFieldDisplay from '#components/fields/MenuValueFieldDisplay.tsx'
import GettingStarted from '../guest/profile/GettingStarted'

export default function testInterface()
{

    const options = useOptionHandler({ optionSet: HeightOptionSet, callback: (value)=>{console.log('root callback', value)}})



    return (
        GettingStarted()
    )
}

const styles = StyleSheet.create(
{
    container: 
    {
        flex:                   1
    },

})

