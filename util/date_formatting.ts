const days = ["일", "월", "화", "수", "목", "금", "토"];

export function getHoursMinutes(date : Date) {
    const hours = date.getHours()
    const minutes = date.getMinutes();
    return ((hours < 10) ? '0' + hours : hours) + 
        ':' + 
        ((minutes < 10) ? '0' + minutes : minutes)
}

export function getFullDates(date : Date) {
    const years = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours()
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return years + "년 " + month + "월 " + day + "일 " + hours + "시 " + minutes + "분 " + seconds + "초";
}

export function getMainScreenDates(date : Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours()
    const minutes = date.getMinutes();

    return month + "/" 
        + day + "(" + days[date.getDay()] + ") " 
        + (hours < 10 ? "0" + hours : hours) 
        + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

export function getDates(date : Date) {
    const years = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return years + "년 " + month + "월 " + day + "일"
}

export function mergeDateTime(date : Date, time : Date) {
    const years = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = time.getHours()
    const minutes = time.getMinutes();
    return new Date(years, month, day, hours, minutes);
}

export function minutesToHoursMinutes(minutes : number) {
    let timeString = "";
    let hours = Math.floor(minutes/60);
    const minutes_ = minutes % 60;
    if(hours < 0) hours += 1;
    if (hours !== 0) {
        timeString += hours + "시간";
        if(minutes_ !== 0) {
            timeString += " " + Math.abs(minutes_) + "분"
        }
    } else {
        timeString += minutes_ + "분"
    }
    return timeString;
}

export function secondsToHoursMinutesSeconds(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const secs = seconds % 60;
    return `${hours > 0 ? `${hours}시간 ` : ``}${minutes > 0 ? `${minutes}분 ` : ``}${secs > 0 ? `${secs}초` : ``}`;
};