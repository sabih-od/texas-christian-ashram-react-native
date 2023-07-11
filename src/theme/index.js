import colors from './colors';
import fonts from './fonts';
// import globalstyle from './style';
//import images from './images';
//import styles from './style';

import { Appearance, Dimensions, I18nManager } from 'react-native';
const { width, height } = Dimensions.get('window')
// const urdufont = I18nManager.isRTL ? {fontFamily: fonts.NafeesNaskh} : null;
// const flip = I18nManager.isRTL ? { transform: [ { scaleX: -1 } ] } : null;
const colorScheme = Appearance.getColorScheme();

const fontcolor = colorScheme == 'dark' ? colors.white : colors.black;
const invertcolor = colorScheme != 'dark' ? colors.white : colors.black;

export {
    colors, fonts, width, height, colorScheme, fontcolor, invertcolor
    // urdufont, flip 
};