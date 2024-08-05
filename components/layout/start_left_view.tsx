import { View, type ViewProps } from "react-native";

const { SCREEN_WIDTH, wScale } = require('@/util/scaling');

export function StartLeftView({style, margin = 20, children} : ViewProps & any) {
    return <View style={[{ width:SCREEN_WIDTH - wScale(margin), marginLeft: wScale(margin)}, style]}>
        {children}
    </View>;
}