import { TextStyle, ViewStyle } from "react-native";
import { get, Shadow }    from "../styles/app/shadows";


export type Wrap    = { [key:string]: ViewStyle }
export type Text    = { [key:string]: TextStyle }

export type Style   = { merge: ([]) => any; wrap: Wrap, text: Text, cast: Shadow }

export const styleBase: Style = {
    merge: merge,
    wrap: {},
    text: {},
    cast: 
    {
        level: null,
        get() { return get(this.level) },
    },
};

function merge(...styles: any[]) {
    return styles.filter(Boolean);
}



