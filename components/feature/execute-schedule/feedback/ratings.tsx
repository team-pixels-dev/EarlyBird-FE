import { StartLeftView } from "@/components/layout/start_left_view";
import { ThemedText } from "@/components/ui/texts/themed-text";
import { hScale, wScale } from "@/util/scaling";
import { StyleSheet, View, ViewProps } from "react-native";
import { EachRating } from "./each-rating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScheduleRepeat, setScheduleType } from "@/modules/redux/slice/template-schedule-cache-slice";
import { RootState } from "@/modules/redux/root-reducer";

export function Ratings({style}: ViewProps){
    const ratings = [0,1,2,3,4,5,6,7,8,9,10];
    const selected_rate = useSelector((state:RootState)=>state.executeScheduleData.rating);

    return(
        <View style={[styles.base, style]}>
            <ThemedText type="description" style={{width:'100%', paddingLeft:wScale(20)}}>추천 안해요</ThemedText>
            <View style={styles.selectDayArea}>
                {ratings.map((rating, index) => (
                    <EachRating 
                        key={index}
                        index={index} 
                        rating={rating} 
                        selected_rating={selected_rate}
                    />
                ))}
            </View>
            <ThemedText type="description" style={{width:'100%', paddingRight:wScale(20), textAlign:"right"}}>정말 추천해요</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    base:{
        width: wScale(270),
        height: hScale(212),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectDayArea:{
        width: wScale(270),
        flexDirection:'row',
        rowGap: wScale(12),
        columnGap: hScale(14),
        justifyContent:'center',
        flexWrap: 'wrap'
    }
    
})