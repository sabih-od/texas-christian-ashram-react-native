import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { colors, fonts, width } from "../theme";
import moment from "moment";

const NotificationItem = ({ item }) => {
    return (<View style={[styles.notificationitem, { borderLeftColor: item.isRead ? colors.orange : '#ddd' }]}>
        <View style={styles.notiInnerRow}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
                <Image source={item.icon ? { uri: item.icon } : require('./../../assets/images/default_icon.png')} style={styles.image} />
                <View style={styles.notirowmsg}>
                    <Text style={[styles.notititle, {width: width - 120}]} numberOfLines={1}>{item?.title}</Text>
                    <Text style={styles.notimessage} numberOfLines={1}>{item?.content}</Text>
                </View>
            {/* </View> */}
            {/* <Text style={styles.datetime}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY hh:mm")}</Text> */}
        </View>
        <Text style={styles.notiTime}>{moment(parseInt(item?.created_at)).format("DD MMMM, hh:mm A")}</Text>
    </View>)
}

export default NotificationItem;

const styles = StyleSheet.create({
    notificationitem: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', borderLeftWidth: 3, paddingHorizontal: 12, paddingVertical: 12, backgroundColor: colors.white, borderRadius: 4, marginBottom: 15 },
    notiInnerRow: { flexDirection: 'row', alignItems: 'center', flex: 0.78 },
    image: { width: 45, height: 45, resizeMode: 'contain', borderRadius: 40, marginRight: 10 },
    notiTime: { fontFamily: fonts.latoBold, fontSize: 10, color: colors.orange },
    notititle: { fontFamily: fonts.latoBold, fontSize: 16, color: colors.black, marginBottom: 3, textTransform: 'capitalize' },
    notimessage: { fontFamily: fonts.latoRegular, fontSize: 13, color: colors.grey },
    notirowmsg: {},
    datetime: { fontFamily: fonts.latoRegular, color: colors.orange, fontSize: 10 }
})