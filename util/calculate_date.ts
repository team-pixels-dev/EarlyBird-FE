export function addMinutes(date : Date, minutes : number) {
    return new Date(date.getTime() + (minutes * 60 * 1000));
}

export function dateChangeAmount(date : Date, added : Date) {
    if(date.getDate() === added.getDate()) {
        return 0;
    } else if(added.getDate() - date.getDate() === 1
        || added.getDate() - date.getDate() < -26 ){ // 날짜가 1일 증가한 경우
        return 1;
    } else { // 날짜가 1일 감소한 경우
        return -1;
    }
}

export function dateChangeAmountWhitMinutes(date : Date, minutes : number) {
    const added = addMinutes(date, minutes);
    return dateChangeAmount(date, added);
}