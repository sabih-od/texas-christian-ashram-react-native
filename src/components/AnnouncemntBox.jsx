import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad, width } from '../theme';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

const AnnouncementBox = ({ item, navigation, width }) => {
    return (
        <TouchableOpacity
            style={[styles.datetime, { width: width }, isIPad && { marginRight: 10 }]} activeOpacity={0.8}
            onPress={() => { navigation.navigate('AnnouncementDetail', { item: item }); }}
        >
            <Image source={require('./../../assets/images/loudspeaker.png')} //{item?.image}
                style={styles.announcementimage} />
            <View style={styles.eventtitlerow}>
                <View><Text style={styles.eventtime}>{moment.parseZone(item?.date, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text></View>
                <Text style={styles.eventtitle}>{item?.title}</Text>
                <Text style={styles.eventlocation} numberOfLines={3}>{item?.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AnnouncementBox;

const styles = StyleSheet.create({
    datetime: { marginBottom: 15, width: '48%', alignItems: 'center', backgroundColor: '#eee', borderRadius: 8 },
    eventtime: { fontFamily: fonts.latoBold, fontSize: 11, color: colors.orange },
    timeicon: {},
    announcementimage: { height: 70, borderRadius: 10, overflow: 'hidden', width: 70, marginVertical: 15 },
    eventtitlerow: { padding: 10, backgroundColor: colors.white, width: '100%', minHeight: isIPad ? 160 : 130 },
    eventtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 17, marginBottom: 3 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: isIPad ? 18 : 13, },
    eventpinicon: { color: colors.orange, marginRight: 5 }
})