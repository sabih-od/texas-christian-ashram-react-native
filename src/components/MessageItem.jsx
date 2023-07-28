
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height, isIPad } from "./../theme";
import { connect } from "react-redux";
import ReportDeleteModal from "./modal/ReportDeleteModal_bkp";
import { useNavigation } from "@react-navigation/native";

const MessageItem = ({ item, userid, showDeleteModal, showProfileModal }) => {
    // const navigation = useNavigation()
    const sender = item?.user?.id == userid;
    // const [showModal, setShowModal] = useState(false);

    // useEffect(()=>{
    //     setShowModal(deleteModal);
    // },[deleteModal])

    // console.log('deleteModal => ', deleteModal);

    return (
        <View style={[{ marginBottom: 10, maxWidth: '70%', }, sender ? { marginLeft: 'auto', flexDirection: 'row-reverse' } : { marginRight: 'auto', flexDirection: 'row' }]}>
            <TouchableOpacity
                disabled={sender}
                activeOpacity={0.8}
                onPress={() => {
                    // if(sender) navigation.navigate('Profile')
                    // else 
                    showProfileModal(item?.user)
                }}>
                <Image source={item?.user?.profile_picture ? { uri: item?.user?.profile_picture } : require('./../../assets/images/dummy-profile-image.png')} style={[styles.proficon, sender ? { marginLeft: 10, } : { marginRight: 10, }]} />
            </TouchableOpacity>
            <View>
                <Text style={[styles.msgusername, sender ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{!item?.user?.first_name ? 'User not found' : `${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                <View style={[{
                    borderRadius: 12,
                    backgroundColor: sender ? (item?.isdeleted ? '#fff3cd' : colors.green) : '#eee',
                    opacity: item?.isdeleted ? 0.6 : 1
                }, sender ? { borderTopRightRadius: 0 } : {
                    borderTopLeftRadius: 0
                }]}>
                    <Pressable
                        // disabled={sender && !item?.isdeleted ? false : true}
                        style={{ paddingHorizontal: 17, paddingVertical: 10, }}
                        activeOpacity={0.8}
                        onLongPress={() => { showDeleteModal(item) }}
                        delayLongPress={100}
                    >
                        <Text style={{
                            fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14,
                            color: sender ? (item?.isdeleted ? '#333' : colors.white) : '#333',
                            textAlign: sender ? 'right' : 'left',
                        }}>{item?.isdeleted ? 'This message is deleted' : item?.message}</Text>
                    </Pressable>
                </View>
                <Text style={[styles.time, sender ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{moment(parseInt(item?.created_at)).fromNow()}</Text>
            </View>
        </View>
    )
}

// const setStateToProps = (state) => ({
//     userInfo: state.appstate.userInfo,
//     // isLogin: state.appstate.isLogin,
//     // getUserProfileResponse: state.authstate.getUserProfileResponse,
// })

// const mapDispatchToProps = (dispatch) => {
//     return {
//         //   UpdateNotificationBadge: bindActionCreators(UpdateNotificationBadge, dispatch),
//         // GetProfileApiCall: bindActionCreators(GetProfileApiCall, dispatch),
//         // SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
//     }
// }

// export default connect(setStateToProps, mapDispatchToProps)(MessageItem);


const styles = StyleSheet.create({
    time: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 14 : 12, marginTop: 3, color: colors.grey },
    proficon: { width: isIPad ? 50 : 40, height: isIPad ? 50 : 40, borderRadius: isIPad ? 50 : 40, resizeMode: 'cover', },
    msgusername: { textTransform: 'capitalize', fontSize: isIPad ? 16 : 14, fontFamily: fonts.latoBold, marginBottom: 5, color: colors.black }
})
export default MessageItem;