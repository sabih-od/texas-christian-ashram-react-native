import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad } from '../theme';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

const GroupItem = ({ item, width, navigation }) => {
    return (
        <TouchableOpacity
            style={[styles.groupitem, { width: width }]}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('Conversation', { groupitem: item });
            }}>
            {/* {item?.badge && <View style={{position:'absolute', top: -5, right: -5, width: 12, height: 12, backgroundColor: colors.green, borderRadius: 20}} />} */}
            <Image source={
                // { uri: item.default_icon}
                item.default_icon ? { uri: item.default_icon } : require('./../../assets/images/default_icon.png')
                // item.image
                // { uri: item?.image }
            }
                style={styles.groupicon}
            />
            <View style={styles.grouptextbox}>
                <View style={{ flex: 0.9 }}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                    <Text numberOfLines={1} style={styles.grouptitle}>{item?.name}</Text>
                    <Text numberOfLines={1} style={styles.lastmsg}>{item?.last_message ? item?.last_message : 'Tap to start chat on group'}</Text>
                </View>
                {/* <Text style={styles.lastmsgtime}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY")}</Text> */}
                <Text style={styles.lastmsgtime}>{item?.last_message ? moment(parseInt(item?.last_updated)).fromNow() : ''}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GroupItem;

const styles = StyleSheet.create({
    groupitem: { margin: 15, marginBottom: 0, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, backgroundColor: colors.white },
    grouptitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 18 : 16, marginBottom: 3, textTransform: 'capitalize' },
    lastmsgtime: { fontFamily: fonts.latoRegular, color: colors.orange, fontSize: isIPad ? 13 : 10 },
    lastmsg: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 16 : 12, },
    groupicon: { height: isIPad ? 50 : 40, borderRadius: isIPad ? 50 : 40, overflow: 'hidden', width: isIPad ? 50 : 40, marginRight: isIPad ? 15 : 10 },
    grouptextbox: { flex: 0.95, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
})