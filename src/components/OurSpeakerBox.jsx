import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width } from '../theme';

const OurSpeakerBox = ({ item, navigation }) => {
    // console.log('item.image => ', item.image);
    return (
        <TouchableOpacity
            style={{ marginBottom: 15, width: '100%', flexDirection: 'row', backgroundColor: colors.white, padding: 10, borderRadius: 8 }}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('OurSpeakerDetail', { item: item })
            }}>
            <Image
                // source={item.image ? { uri: item.image } : require('./../../assets/images/our-speaker-01.jpg')}
                source={{ uri: item.image }}
                // onError={(error) => console.log('Image failed to load:', error)}
                // onLoad={() => console.log('Image loading:')}
                defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                style={styles.image}
                // source={require('./../../assets/images/our-speaker-01.jpg')}
            />
            <View style={{ width: width - 140 }}>
                <View style={styles.speakerrow}>
                    <Text style={styles.speakername}>{item.name}</Text>
                    <Text style={styles.speakertitle}>{item.designation}</Text>
                </View>
                <Text style={styles.speakerdesc} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OurSpeakerBox;

const styles = StyleSheet.create({
    eventtime: {},
    speakertitle: { fontFamily: fonts.latoBold, color: colors.green },
    speakerrow: {
        // flexDirection: 'row', alignItems: 'center' 
        marginBottom: 6,
    },
    image: { height: 75, borderRadius: 7, overflow: 'hidden', width: 75, marginRight: 10 },
    speakername: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 16, },
    speakerdesc: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 13, }
})