import { Platform, StyleSheet } from 'react-native';

import { IOS, colors, fontcolor, fonts, height, isIPad } from './index';

const globalstyle = StyleSheet.create({
  fullview: { ...StyleSheet.absoluteFillObject, height: '100%', },
  authContainer: { ...StyleSheet.absoluteFillObject, height: height, resizeMode: 'cover' },
  authLogoContainer: { alignItems: 'center' },
  authLogo: { width: 150, height: 130, resizeMode: 'contain', marginBottom: 25, },
  authheading: { fontFamily: fonts.headingFont, fontSize: isIPad ? 44 : 34, color: colors.black },
  authdescription: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 22 : 17, color: colors.grey, marginBottom: 15 },
  authSubmitButton: { backgroundColor: colors.orange, padding: 17, borderRadius: 14, marginTop: 15 },
  authSubmitButtonText: { color: colors.white, fontFamily: fonts.latoBold, fontSize: isIPad ? 17 : 15, textAlign: 'center', textTransform: 'uppercase' },

  authscreencontainer: { maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' },

  authbuttontext: { textTransform: 'uppercase', fontSize: 18, fontFamily: fonts.latoBold, textAlign: 'center', color: colors.white },
  inputbox: { backgroundColor: colors.white, marginBottom: 5, borderRadius: 14, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 15 },
  inputfield: { paddingHorizontal: 15, paddingVertical: IOS ? 20 : 13, fontFamily: fonts.latoRegular, width: '100%', color: colors.black, fontSize: isIPad ? 17 : 14 },
  inputlabel: { fontFamily: fonts.latoRegular, fontSize: 15, marginBottom: -5, marginLeft: 14 },
  alreadysignin: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, },
  errorField: { color: colors.red, fontFamily: fonts.latoRegular, fontSize: 12, marginTop: 2, marginLeft: 15 },
  alreadyaccount: { fontFamily: fonts.latoRegular, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: fontcolor, fontSize: isIPad ? 18 : 14 },
  actionauthtext: { color: colors.black, fontFamily: fonts.latoBold, fontSize: isIPad ? 18 : 14 },
  // authlefticon: { color: colors.deepblue },
  showhideicontouch: { padding: 10, zIndex: 1, position: 'absolute', right: 10, },
  showhideicon: { color: '#999' },

  draweritemtext: { fontFamily: fonts.latoRegular, color: colors.white, fontSize: isIPad ? 19 : 14 },
  draweritemrow: { flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: '#ffffff09', borderLeftWidth: 4 },

  footerloadmore: { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7 },
  footerloadingtext: { fontFamily: fonts.latoRegular, marginLeft: 8, },

  modaltitle: { fontFamily: fonts.latoBlack, color: colors.black, textAlign: 'center', paddingTop: 15, paddingBottom: 5, fontSize: isIPad ? 24 : 18, color: colors.green },
  modaldesc: { fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', fontSize: isIPad ? 16 : 13, paddingHorizontal: 15, paddingBottom: 15, color: '#444' },
  modalbtnsrow: { flexDirection: 'row', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1, },
  modalbtntext: { fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center', fontSize: isIPad ? 18 : 14 },
  modalbtn: { width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },

  notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
  badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    
  headerTitleStyle: { fontFamily: fonts.headingFont, fontSize: isIPad ? 22 : 18, textTransform: 'capitalize' },

  speakerboximage: { height: isIPad ? 100 : 75, borderRadius: 7, overflow: 'hidden', width: isIPad ? 100 : 75, marginRight: isIPad ? 15 : 10 },
  speakerboxtitle: { fontFamily: fonts.latoBold, color: colors.green, fontSize: isIPad ? 18 : 14 },
  speakerboxrow: { flexDirection: 'row', marginBottom: 4, alignItems: 'center' },
  speakerboxname: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 16, },
  speakerboxdesc: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 18 : 13, },
  speakerdetailheading: { fontSize: isIPad ? 28 : 22, fontFamily: fonts.headingFont, color: colors.black, marginBottom: 5 },
  speakerdetailparagraph: { fontSize: isIPad ? 18 : 14, marginBottom: 0, fontFamily: fonts.latoRegular, color: colors.grey, lineHeight: isIPad ? 24 : 20 },
  speakerdetailparabold: { fontSize: 14, fontFamily: fonts.latoBold, color: colors.black },
  speakerdetailimage: { width: 100, height: 100, resizeMode: 'cover', borderRadius: 10, marginBottom: 15, marginRight: 15 },
  speakerdetaildesignation: { fontFamily: fonts.latoBold, color: colors.green, fontSize: isIPad ? 18 : 15 },
  
  detaildate: { fontFamily: fonts.latoBold, color: colors.orange, marginBottom: 5, fontSize: isIPad ? 15 : 13 },
  detailtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 32 : 28, marginBottom: 5 },
  detaildescription: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: isIPad ? 18 : 15 }

  // inputBox: { marginBottom: 10, },
  // inputField: { borderWidth: 1, borderColor: '#eee', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 7, fontFamily: fonts.latoRegular, backgroundColor: colors.white, fontSize: 13 },
  // button: { width: '100%', backgroundColor: colors.latoRegular, paddingVertical: 10, borderRadius: 7, marginBottom: 10 },
  // buttonText: { color: colors.white, fontSize: 16, fontFamily: fonts.latoRegular, textAlign: 'center', textTransform: 'uppercase'},
  // logoText: { fontFamily: fonts.latoBold, color: colors.latoRegular, fontSize: 30, textAlign: 'center', marginBottom: 20,textTransform: 'uppercase' },
  // loginbox: { width: '90%', marginHorizontal: '5%' },
});

export default globalstyle;