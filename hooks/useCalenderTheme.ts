import { useThemeColor } from "@/hooks/useThemeColor"

export function useCalenderTheme() {
    const backgroundColor = useThemeColor("background");
    const tint = useThemeColor("tint");
    const gray = useThemeColor("gray");
    const text = useThemeColor("text");
    const selectd = useThemeColor("selected");
    const textDisabledColor = useThemeColor("textDisabledColor");
    const calendarTheme = {
        backgroundColor: backgroundColor,
        calendarBackground: backgroundColor,
        textSectionTitleColor: text,
        selectedDayBackgroundColor: tint,
        selectedDayTextColor: "black",
        todayTextColor: text,
        dayTextColor: text,
        textDisabledColor: textDisabledColor,
        monthTextColor: text,
        arrowColor: text
    } 

    return calendarTheme;
} 
