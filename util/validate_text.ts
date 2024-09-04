export function validateNecessroy(text : string) {
    // 공백만으로 이루어지지 않았는지 확인
    if (text.length === 0 || text.trim().length === 0) {
        return { valid: false, message: "입력값이 공백으로만 구성될 수 없습니다." };
    }
    
    // 길이가 2글자 이상 12글자 이내인지 확인
    if (text.length < 1 || text.length > 12) {
        return { valid: false, message: "입력값의 길이는 2글자에서 8글자 이내여야 합니다." };
    }

    // 모든 조건을 통과한 경우
    return { valid: true, message: "유효한 입력값입니다." };
}

