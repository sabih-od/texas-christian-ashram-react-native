import colors from './colors';
import fonts from './fonts';
// import globalstyle from './style';
//import images from './images';
//import styles from './style';

import { Appearance, Dimensions, I18nManager, Platform } from 'react-native';
const { width, height } = Dimensions.get('window')
// const urdufont = I18nManager.isRTL ? {fontFamily: fonts.NafeesNaskh} : null;
// const flip = I18nManager.isRTL ? { transform: [ { scaleX: -1 } ] } : null;
const colorScheme = Appearance.getColorScheme();

const fontcolor = colorScheme == 'dark' ? colors.white : colors.black;
const invertcolor = colorScheme != 'dark' ? colors.white : colors.black;
const isIPad = width > 700 ? true : false;
const IOS = Platform.OS == 'ios' ? true : false;

export {
    colors, fonts, width, height, colorScheme, fontcolor, invertcolor, isIPad, IOS
    // urdufont, flip 
};