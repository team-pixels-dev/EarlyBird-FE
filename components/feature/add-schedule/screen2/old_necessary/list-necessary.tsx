import { ScrollView, StyleSheet, ViewProps } from "react-native";
import { EachNecessary } from "./each-necessary";
import { AddNecessary } from "./add-necessary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/modules/redux/root-reducer";
import { TextInputModal } from "@/components/ui/modal/text-input-modal";
import { useState } from "react";
import { addScheduleNecessary } from "@/modules/redux/slice/template-schedule-cache-slice";
import { hScale, wScale } from "@/util/scaling";

export function ListNecessary({ style }: ViewProps) {
    const scheduleNecessary = useSelector((state: RootState) => state.templateScheduleCache.schedule_necessary);
    const [modalOpen, setModalOpen] = useState(false);

    const dispatch = useDispatch();

    function handleDispatchText(text: string) {
        dispatch(addScheduleNecessary(text));
    }

    return (
        <ScrollView 
            style={[styles.container, style]} 
            horizontal={true}  // 수평 스크롤 가능하게 설정
            showsHorizontalScrollIndicator={false} // 수평 스크롤바 숨기기 (선택 사항)
            contentContainerStyle={styles.contentContainerStyle}
        >
            {scheduleNecessary.map((item, index) => (
                <EachNecessary style={{marginRight: wScale(12)}} key={index} children={item} />
            ))}
            <AddNecessary onPress={() => setModalOpen(true)} />
            <TextInputModal
                title="준비물 추가"
                defaultText=""
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                dispatchText={handleDispatchText}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        height: hScale(88),       
    },
    contentContainerStyle: {
        columnGap: wScale(12)
    }
});
