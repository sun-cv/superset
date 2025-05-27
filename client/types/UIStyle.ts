import { TextStyle, ViewStyle } from "react-native";
import { ShadowLevel } from "../styles/shadows";

export type UIStyle =
{
    [key:string]: ViewStyle
}

export type UIText =
{
    [key:string]: TextStyle
}

export type UIShadow = ShadowLevel;