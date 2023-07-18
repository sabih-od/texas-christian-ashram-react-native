import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width, isIPad } from '../theme';
import globalstyle from '../theme/style';

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
                style={globalstyle.speakerboximage}
            />
            <View style={{ width: isIPad ? width - 180 : width - 140 }}>
                <View style={globalstyle.speakerboxrow}>
                    <Text style={globalstyle.speakerboxname}>{item?.name}</Text>
                    {/* <Text style={globalstyle.speakerboxtitle}>Evengelist</Text> */}
                </View>
                <Text style={globalstyle.speakerboxdesc} numberOfLines={3}>{item?.description.replace(/\\n/g, '\n')}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default OurStaffBox;

const styles = StyleSheet.create({
})