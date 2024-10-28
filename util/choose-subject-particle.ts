
/**
        조사 이/가 중 적절한 것을 붙여주기 위한 함수
*/
export function chooseSubjectParticle(word: string): string {
    if(word.length == 0) {
        return "";
    }
    const lastChar = word[word.length - 1];
    
    // 마지막 글자의 유니코드 값
    const lastCharCode = lastChar.charCodeAt(0);
    
    // 한글의 첫 글자 '가'의 유니코드 값이 44032
    // 한글은 유니코드 상에서 44032부터 시작하며, 각 글자는 받침 여부에 따라 28개의 코드 존재.
    const baseCode = lastCharCode - 44032;

    // 초성 19개, 중성 21개를 고려하여 28로 나눈 나머지가 받침이므로
    const jongseong = baseCode % 28;

    // jongseong이 0이면 받침이 없으므로 '가', 0이 아니면 받침이 있으므로 '이'
    if (jongseong === 0) {
        return `${word}가`;
    } else {
        return `${word}이`;
    }
}
