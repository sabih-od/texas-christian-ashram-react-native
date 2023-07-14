import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { colors, fonts, isIPad, width } from "../theme";
import moment from "moment";

const NotificationItem = ({ item, navigation }) => {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            // console.log('asdasd')
            // navigation.navigate('AnnouncementDetail', { id: 21, refresh: true })
            if (item?.topic == 'prayer-request') { navigation.navigate('RequestedPrayers') } // RequestedPrayers
            if (item?.topic == 'book') { navigation.navigate('Books') } // Books // PdfView
            if (item?.topic == 'event') { navigation.navigate('EventDetail', { id: item?.topic_id, refresh: true }) } // Events // EventDetail
            if (item?.topic == 'post') { navigation.navigate('PostDetail', { id: item?.topic_id, refresh: true }) } // Posts // PostDetail
            if (item?.topic == 'sermon') { navigation.navigate('SermonsDetail', { id: item?.topic_id, refresh: true }) } // Sermons // SermonsDetail
            if (item?.topic == 'announcement') { navigation.navigate('AnnouncementDetail', { id: item?.topic_id, refresh: true }) } // Announcements // AnnouncementDetail
        }}
        style={[styles.notificationitem, {
            borderLeftColor: item.isRead ? colors.green : '#ddd',
            // backgroundColor: 'rgba(103, 146, 141, 0.1)', borderLeftColor: 'rgba(103, 146, 141, 0.1)'
        }]}>
        <View style={styles.notiInnerRow}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
            <Image
                source={item.icon ? { uri: item.icon } : require('./../../assets/images/default_icon.png')} style={styles.image}
                defaultSource={require('./../../assets/images/speaker-placeholder.png')}
            />
            <View style={styles.notirowmsg}>
                <Text style={[styles.notititle]} numberOfLines={1}>{item?.title}</Text>
                <Text style={[styles.notimessage]} numberOfLines={1}>{item?.content}</Text>
            </View>
            {/* </View> */}
            {/* <Text style={styles.datetime}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY hh:mm")}</Text> */}
        </View>
        <Text style={styles.notiTime}>{moment(parseInt(item?.created_at)).format("DD MMMM, hh:mm A")}</Text>
    </TouchableOpacity>)
}

export default NotificationItem;

const styles = StyleSheet.create({
    notificationitem: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', borderLeftWidth: 3, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: colors.white, borderRadius: 4, marginBottom: 15 },
    notiInnerRow: { flexDirection: 'row', alignItems: 'center', flex: 0.78 },
    image: { width: 45, height: 45, resizeMode: 'cover', borderRadius: 40, marginRight: 10 },
    notiTime: { fontFamily: fonts.latoBold, fontSize: 10, color: colors.orange },
    notititle: { fontFamily: fonts.latoBold, fontSize: isIPad ? 17 : 15, color: colors.black, marginBottom: 3, width: width - 120, textTransform: 'capitalize' },
    notimessage: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 15 : 13, color: colors.grey, width: width - 220 },
    notirowmsg: {},
    datetime: { fontFamily: fonts.latoRegular, color: colors.orange, fontSize: 10 }
})