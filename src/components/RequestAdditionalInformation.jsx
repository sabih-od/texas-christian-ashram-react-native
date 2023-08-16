import { colors, fonts, isIPad, width } from '../theme';

const { ImageBackground, View, Text, TouchableOpacity, StyleSheet } = require('react-native')

const RequestAdditionalInformation = (props) => {
    return (
        <ImageBackground
            source={require('./../../assets/images/home-prayer-request.png')}
            style={styles.imagebg}
        >
            <View style={styles.overlaybg} />
            <Text style={styles.titletxt}>Request Additional Information</Text>
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => props.navigation.navigate('Contact')}
            >
                <Text style={styles.btntext}>Get Involved</Text>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default RequestAdditionalInformation;

const styles = StyleSheet.create({
    titletxt: { fontFamily: fonts.headingFont, color: colors.white, textAlign: 'center', fontSize: isIPad ? 28 : 24, marginBottom: 15, lineHeight: 32 },
    btn: { padding: isIPad ? 10 : 8, backgroundColor: colors.orange, width: isIPad ? 180 : 150, borderRadius: 10, },
    btntext: { fontFamily: fonts.latoBold, color: colors.white, textAlign: 'center', textTransform: 'uppercase', fontSize: isIPad ? 17 : 14 },
    overlaybg: { backgroundColor: colors.black, opacity: 0.7, width: '100%', height: 200, zIndex: 0, left: 0, top: 0, position: 'absolute', },
    imagebg: { width: width - 30, borderRadius: 10, overflow: 'hidden', alignItems: 'center', paddingVertical: 30, position: 'relative', resizeMode: 'cover' },
})