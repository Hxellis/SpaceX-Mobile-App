import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native/types";

export interface TextProps {
    textStyles?: StyleProp<TextStyle>;
    children: ReactNode;
}