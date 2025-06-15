import { Font } from '#lib/ReactIndex.ts';

type Loader = 
{
    data:   () => Promise<void>;
    user:   () => Promise<void>;
};


export default function getLoader(): Loader
{
    async function data()
    {
        await fonts();
    }

    async function user()
    {
        
    }

    return {
        data: data,
        user: user,
    }

}

    // data
async function fonts() 
{
    await Font.loadAsync(
    {
        'Anton':                    require('../../../assets/fonts/anton/Anton-Regular.ttf'),
        'BigShoulders-Black':       require('../../../assets/fonts/shoulders/BigShoulders-Black.ttf'),
        'BigShoulders-Bold':        require('../../../assets/fonts/shoulders/BigShoulders-Bold.ttf'),
        'BigShoulders-Regular':     require('../../../assets/fonts/shoulders/BigShoulders-Regular.ttf'),
        'BigShoulders-ExtraBold':   require('../../../assets/fonts/shoulders/BigShoulders-ExtraBold.ttf'),
        'Impact':                   require('../../../assets/fonts/impact/Impact.ttf'),
        'Oxygen':                   require('../../../assets/fonts/oxygen/Oxygen-Regular.ttf'),
        'Quicksand':                require('../../../assets/fonts/quicksand/Quicksand-Regular.ttf'),
        'Quicksand-Bold':           require('../../../assets/fonts/quicksand/Quicksand-Bold.ttf'),
        'Roboto':                   require('../../../assets/fonts/roboto/Roboto-Regular.ttf'),
    });
}

    // user




