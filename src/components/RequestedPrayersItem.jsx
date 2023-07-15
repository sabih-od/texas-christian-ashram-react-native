import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { colors, fonts, isIPad } from "../theme";

const RequestedPrayersItem = (props) => {
    return (<TouchableOpacity 
    activeOpacity={0.8} 
    onPress={() => { 
        props.setShowModal(true)
        props.setItem(props.item)
    }}
    style={styles.notificationitem}>
        <View style={styles.reqcolmn}>
            <Text style={styles.reqhead}>Pray For</Text>
            <Text style={styles.reqdata} numberOfLines={1}>{props.item.name}</Text>
        </View>
        {/* <View style={styles.reqcolmn}>
            <Text style={styles.reqhead}>Date</Text>
            <Text style={styles.reqdata}>{props.item.start_date}</Text>
        </View> */}
        <View style={styles.reqcolmn}>
            <Text style={styles.reqhead}>Prayer Request</Text>
            <Text style={styles.reqdata} numberOfLines={1}>{props.item.description}</Text>
        </View>
        {/* <View style={styles.reqcolmn}>
            <Text style={styles.reqhead}>Contact Info</Text>
            <Text style={styles.reqdata}>{props.item.contact}</Text>
        </View> */}
        {/* {props.item.user_id == props.userid && <TouchableOpacity onPress={() => { console.log('more-icon') }}><Icon name={'more-vertical'} style={styles.moreicon} /></TouchableOpacity>} */}
    </TouchableOpacity>)
}

export default RequestedPrayersItem;

const styles = StyleSheet.create({
    notificationitem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, backgroundColor: colors.white, borderRadius: 8, marginBottom: 15, 
    borderLeftColor: '#ddd', borderLeftWidth: 2, 
    // borderTopLeftRadius: 0, borderBottomLeftRadius: 0 
},
    // reqcolmn: { flex: 0.33 },
    reqcolmn: { flex: 0.5 },
    reqhead: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 16 :  14, marginBottom: 4, color: colors.grey },
    reqdata: { fontFamily: fonts.latoBold, fontSize: isIPad ? 18 : 13, color: colors.black },
    moreicon: {color: colors.orange, fontSize: 14},

    notiInnerRow: { flexDirection: 'row', alignItems: 'center', flex: 0.78 },
    image: { width: 50, height: 50, resizeMode: 'contain', borderRadius: 40, marginRight: 10 },
    notiTime: { fontFamily: fonts.latoRegular, fontSize: 10, color: colors.orange },
    notititle: { fontFamily: fonts.latoBold, fontSize: 17, color: colors.black, marginBottom: 5 },
    notimessage: { fontFamily: fonts.latoRegular, fontSize: 13, color: colors.grey },
    notirowmsg: {},
})