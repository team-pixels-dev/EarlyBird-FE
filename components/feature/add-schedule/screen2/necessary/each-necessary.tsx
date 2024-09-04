import { ThemedText } from "@/components/ui/texts/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { removeScheduleNecessary } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";
import { Children } from "react";
import { Image, Pressable, StyleSheet, View, ViewProps } from "react-native";
import { useDispatch } from "react-redux";

export type EachNecessaryProps = ViewProps & {
    index : number
}

export function EachNecessary({children, index} : EachNecessaryProps) {
    const color = useThemeColor("brightTint")
    const dispatch = useDispatch();
    return (
        <View style={[styles.eachNecessary, {backgroundColor:color}]}>
            <ThemedText type="defaultSemiBold" style={{fontSize:hScale(14), marginRight:wScale(10)}}>{children}</ThemedText>
            <Pressable onPress={()=>dispatch(removeScheduleNecessary(index))}>
                <Image style={styles.icon} source={require('@/assets/images/icon/x.png')}></Image>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    eachNecessary:{
        width: 'auto',
        height: hScale(38),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wScale(8),
        paddingRight: wScale(15),
        paddingLeft: wScale(15)
    },
    icon:{
        width: hScale(10),
        height: hScale(10),
        resizeMode: 'contain',
    }
})