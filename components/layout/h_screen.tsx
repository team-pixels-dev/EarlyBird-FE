import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const { SCREEN_WIDTH, SCREEN_HEIGHT } = require("@/util/scaling");

export function HScreen({style, children} : ViewProps & PropsWithChildren){
    return(
        <SafeAreaView style = {[styles.base, style]}>
            {children}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    base: {
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    }
})