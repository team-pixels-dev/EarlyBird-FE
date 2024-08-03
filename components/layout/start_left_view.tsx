import { View, type ViewProps } from "react-native";

const { SCREEN_WIDTH } = require('@/util/scaling');

export function StartLeftView({style, children,  ...otherProps} : ViewProps) {
    return <View style={[{ width:SCREEN_WIDTH }, style]} {...otherProps} />;
}