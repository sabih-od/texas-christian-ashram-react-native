import { Platform, StyleSheet } from 'react-native';

import { colors, fontcolor, fonts, height } from './index';

const globalstyle = StyleSheet.create({
  fullview: { ...StyleSheet.absoluteFillObject, height: '100%',  },
  authContainer: { ...StyleSheet.absoluteFillObject, height: height, resizeMode: 'cover' },
  authLogoContainer: { alignItems: 'center' },
  authLogo: { width: 150, height: 130, resizeMode: 'contain', marginBottom: 25, },
  authheading: { fontFamily: fonts.headingFont, fontSize: 34, color: colors.black},
  authdescription: {fontFamily: fonts.latoRegular, fontSize: 17, color: colors.grey, marginBottom: 15},
  authSubmitButton: {backgroundColor: colors.orange, padding: 15, borderRadius: 30, marginTop: 15},
  authSubmitButtonText: {color: colors.white, fontFamily: fonts.latoBold, fontSize: 15, textAlign: 'center', textTransform: 'uppercase'},

  authbuttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.latoBold, textAlign: 'center', color: colors.white },
  inputbox: { backgroundColor: colors.white, marginBottom: 5, borderRadius: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
  inputfield: { paddingHorizontal: 15, paddingVertical: Platform.OS === 'ios' ? 20 : 13, fontFamily: fonts.latoRegular, width: '100%', color: colors.black },
  alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
  errorField: { color: colors.red, fontFamily: fonts.latoRegular, fontSize: 12, marginTop: 2, marginLeft: 15 },
  alreadyaccount: { fontFamily: fonts.latoRegular, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: fontcolor },
  actionauthtext: { color: colors.black, fontFamily: fonts.latoBold },
  // authlefticon: { color: colors.deepblue },
  showhideicontouch: { padding: 10, zIndex: 1, position: 'absolute', right: 10, },
  showhideicon: { color: '#999' },

  draweritemtext: { fontFamily: fonts.latoRegular, color: colors.white },
  draweritemrow: { flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#ffffff09', borderLeftWidth: 4 },

  footerloadmore: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7 },
  footerloadingtext: { fontFamily: fonts.latoRegular, marginLeft: 8, },

  // inputBox: { marginBottom: 10, },
  // inputField: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 7, fontFamily: fonts.latoRegular, backgroundColor: colors.white, fontSize: 13 },
  // button: { width: '100%', backgroundColor: colors.latoRegular, paddingVertical: 10, borderRadius: 7, marginBottom: 10 },
  // buttonText: { color: colors.white, fontSize: 16, fontFamily: fonts.latoRegular, textAlign: 'center', textTransform: 'uppercase'},
  // logoText: { fontFamily: fonts.latoBold, color: colors.latoRegular, fontSize: 30, textAlign: 'center', marginBottom: 20,textTransform: 'uppercase' },
  // loginbox: { width: '90%', marginHorizontal: '5%' },
});

export default globalstyle;