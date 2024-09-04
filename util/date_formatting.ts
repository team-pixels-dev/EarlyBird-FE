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

    return years + "년 " + month + "월 " + day + "일 " + hours + "시 " + minutes + "분"
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
    if (hours != 0) {
        if(hours < 0) hours += 1;
        timeString += hours + "시간 "
        timeString += ((Math.abs(minutes_) < 10) ? "0" : "") + Math.abs(minutes_) + "분"
    } else {
        timeString += ((Math.abs(minutes_) < 10) ? "0" : "") + minutes_ + "분"
    }
    return timeString;
}