import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width, isIPad } from '../theme';

const OurStaffBox = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            style={{ marginBottom: 15, width: '100%', flexDirection: 'row', backgroundColor: colors.white, padding: 10, borderRadius: 8 }}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('OurStaffDetail', { item: item })
            }}>
            <Image
                // source={item.image ? { uri: item.image } : require('./../../assets/images/our-speaker-01.jpg')}
                // source={require('./../../assets/images/our-speaker-01.jpg')}
                source={{ uri: item?.image }}
                // onError={(error) => console.log('Image failed to load:', error)}
                // onLoad={() => console.log('Image loading:')}
                defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                style={styles.image}
            />
            <View style={{ width: isIPad ? width - 180 : width - 140 }}>
                <View style={styles.speakerrow}>
                    <Text style={styles.speakername}>{item?.name}</Text>
                    {/* <Text style={styles.speakertitle}>Evengelist</Text> */}
                </View>
                <Text style={styles.speakerdesc} numberOfLines={3}>{item?.description.replace(/\\n/g, '\n')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OurStaffBox;

const styles = StyleSheet.create({
    eventtime: {},
    image: { height: isIPad ? 100 : 75, borderRadius: 7, overflow: 'hidden', width: isIPad ? 100 : 75, marginRight: 10 },
    speakertitle: { fontFamily: fonts.latoBold, color: colors.green },
    speakerrow: { flexDirection: 'row', marginBottom: 4, alignItems: 'center' },
    speakername: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22: 16, },
    speakerdesc: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: isIPad ? 16 : 13, }
})