import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad } from '../theme';
import Icon from 'react-native-vector-icons/Feather';

const EventScheduleBox = ({ navigation, item, width }) => {
    return (
        <TouchableOpacity
            style={{ marginBottom: 15, width: width ? width : '48%' }}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('EventDetail', { item: item });
            }}>
            <Image
                source={{ uri: item?.image }}
                defaultSource={require('./../../assets/images/event-placeholder.png')}
                style={{ height: 130, borderRadius: 10, overflow: 'hidden', width: '100%' }} />
            <View
                style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 20 : 16, }}>{item?.title}</Text>
                    {/* <Icon name={'arrow-right'} style={{ color: colors.orange, fontSize: 15 }} /> */}
                </View>
                <Text style={{ fontFamily: fonts.latoRegular, color: colors.black, fontSize: isIPad ? 15 :13, }} numberOfLines={1}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EventScheduleBox;