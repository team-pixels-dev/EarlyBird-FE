import { Dimensions, Platform } from 'react-native';
const { width, height } = Platform.OS === 'ios' ? Dimensions.get('window') : Dimensions.get('screen');

// 기준 화면 사이즈 : moamoaTestDivce, 390x844 기준.
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

// 뷰포트(넓이)기반 스케일링
const wScale = (size: number) => width / guidelineBaseWidth * size;

// 높이기반 스케일링
const hScale = (size: number) => height / guidelineBaseHeight * size;

// 화면 전체 높이
const SCREEN_WIDTH = width;

// 화면 전체 넓이
const SCREEN_HEIGHT = height;


// // factor값 제어
// const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export {wScale, hScale, SCREEN_WIDTH, SCREEN_HEIGHT};