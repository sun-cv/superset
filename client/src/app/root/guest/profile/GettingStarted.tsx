import { Image, StyleSheet, Text, View } from '#lib/ReactIndex.ts'


export default function GettingStarted()
{


    return (
        <View style={layout.container}>
            <View style={layout.imageWrapper}>
                <Image source={require('../../../../features/signup/assets/Getting-Started-BG.jpg')}style={asset.image}/>
            </View>
            
            <View style={layout.spacer}/>
            {/* <View style={layout.footer}>
                <Text style={{fontSize: 50}}>test</Text>
            </View> */}
        </View>
    )
}


const layout = StyleSheet.create(
{
    container:
    {
        flex:                   1,
    },

    imageWrapper:
    {
        position:               'absolute',
        top:                    0,
        left:                   0, 
        height:                 '100%',
        width:                  '100%'
    },

    spacer:
    {
        height:                 '70%',
        backgroundColor:        'transparent'
    },

    footer:
    {
        height:                 '50%',
        backgroundColor:        'rgba(1, 1, 1, 0.42)'
    }

})

const asset = StyleSheet.create(
{
    image:
    {
        flex:                   1,
        width:                  '100%',
        height:                 '100%',
        alignSelf:              'center'
    }
    
})