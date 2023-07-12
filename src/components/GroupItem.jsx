import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';

const GroupItem = ({ item, width, navigation }) => {
    return (
        <TouchableOpacity
            style={{ margin: 15, marginBottom: 0, width: width, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, borderRadius: 5, backgroundColor: colors.white }}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('Conversation', {title: item.name, groupid: item.id});
            }}>
                {/* {item?.badge && <View style={{position:'absolute', top: -5, right: -5, width: 12, height: 12, backgroundColor: colors.green, borderRadius: 20}} />} */}
            <Image source={
                // { uri: item.default_icon}
                item.default_icon ? { uri: item.default_icon} : require('./../../assets/images/default_icon.png') 
                // item.image
                // { uri: item?.image }
            }
                style={{ height: 40, borderRadius: 40, overflow: 'hidden', width: 40, marginRight: 10 }}
            />
            <View style={{ flex: 0.95, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flex: 0.9}}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                    <Text numberOfLines={1} style={styles.grouptitle}>{item?.name}</Text>
                    <Text numberOfLines={1} style={styles.lastmsg}>{item?.last_message ? item?.last_message : 'Tap to start chat on group'}</Text>
                </View>
                {/* <Text style={styles.lastmsgtime}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY")}</Text> */}
                <Text style={styles.lastmsgtime}>{moment(parseInt(item?.last_updated)).fromNow()}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GroupItem;

const styles = StyleSheet.create({
    grouptitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 16, marginBottom: 3, textTransform: 'capitalize' },
    lastmsgtime: { fontFamily: fonts.latoRegular, color: colors.orange, fontSize: 10 },
    lastmsg: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: 12, }
})