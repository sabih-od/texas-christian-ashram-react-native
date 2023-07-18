import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad, width } from '../theme';
import globalstyle from '../theme/style';

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
                source={{ uri: item?.image }}
                // onError={(error) => console.log('Image failed to load:', error)}
                // onLoad={() => console.log('Image loading:')}
                defaultSource={require('./../../assets/images/speaker-placeholder.png')}
                style={globalstyle.speakerboximage}
            // source={require('./../../assets/images/our-speaker-01.jpg')}
            />
            <View style={{ width: isIPad ? width - 180 : width - 140 }}>
                <View style={[globalstyle.speakerboxrow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                    <Text style={globalstyle.speakerboxname}>{item?.name}</Text>
                    <Text style={globalstyle.speakerboxtitle}>{item?.designation}</Text>
                </View>
                <Text style={globalstyle.speakerboxdesc} numberOfLines={2}>{item?.description.replace(/\\n/g, '\n')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OurSpeakerBox;

const styles = StyleSheet.create({
})