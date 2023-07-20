import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad, width } from '../theme';
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
                style={styles.eventboximage} />
            <View style={{ paddingVertical: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text style={styles.eventboxtitle}>{item?.title}</Text>
                    {/* <Icon name={'arrow-right'} style={{ color: colors.orange, fontSize: 15 }} /> */}
                </View>
                <Text style={styles.eventboxdesc} numberOfLines={1}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default EventScheduleBox;

const styles = StyleSheet.create({
    eventboximage: { height: isIPad ? ((width / 5)) : width / 3, borderRadius: 10, overflow: 'hidden', width: '100%' },
    eventboxtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 16, },
    eventboxdesc: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 18 : 13, }
})