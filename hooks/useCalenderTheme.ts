import { useThemeColor } from "@/hooks/useThemeColor"

export function useCalenderTheme() {
    const backgroundColor = useThemeColor("background");
    const tint = useThemeColor("tint");
    const today = useThemeColor("today");
    const gray = useThemeColor("gray");
    const text = useThemeColor("text");
    const textDisabledColor = useThemeColor("textDisabledColor");
    const calendarTheme = {
        backgroundColor: backgroundColor,
        calendarBackground: backgroundColor,
        textSectionTitleColor: text,
        selectedDayBackgroundColor: tint,
        selectedDayTextColor: "black",
        todayTextColor: today,
        dayTextColor: text,
        textDisabledColor: textDisabledColor,
        monthTextColor: text,
        arrowColor: text
    } 

    return calendarTheme;
} 
