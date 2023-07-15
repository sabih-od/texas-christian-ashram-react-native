
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height, isIPad } from "./../theme";
import { connect } from "react-redux";
import ReportDeleteModal from "./modal/ReportDeleteModal_bkp";

const MessageItem = ({ item, userid, showDeleteModal, handleDelete }) => {
    const sender = item?.user?.id == userid;
    // const [showModal, setShowModal] = useState(false);

    // useEffect(()=>{
    //     setShowModal(deleteModal);
    // },[deleteModal])

    // console.log('deleteModal => ', deleteModal);

    return (
        <View style={[{ marginBottom: 10, maxWidth: '70%', }, sender ? { marginLeft: 'auto', flexDirection: 'row-reverse' } : { marginRight: 'auto', flexDirection: 'row' }]}>
            <Image source={item?.user?.profile_picture ? { uri: item?.user?.profile_picture } : require('./../../assets/images/dummy-profile-image.png')} style={[styles.proficon, sender ? { marginLeft: 10, } : { marginRight: 10, }]} />
            <View>
                <Text style={[styles.msgusername, sender ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{!item?.user?.first_name ? 'User not found' : `${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                {/* {showModal && <ReportDeleteModal item={item} sender={sender} handleDelete={handleDelete} />} */}
                <View style={[{
                    borderRadius: 12,
                    backgroundColor: sender ? (item?.isdeleted ? '#fff3cd' : colors.green) : '#eee',
                    opacity: item?.isdeleted ? 0.6 : 1
                }, sender ? { borderTopRightRadius: 0 } : {
                    borderTopLeftRadius: 0
                }]}>
                    <TouchableOpacity
                        // disabled={sender && !item?.isdeleted ? false : true}
                        style={{ paddingHorizontal: 17, paddingVertical: 10, }}
                        activeOpacity={0.8}
                        onLongPress={() => { showDeleteModal(true, item) }}
                        onPress={() => { showDeleteModal(true, item) }}
                    // onLongPress={() => { sender && !item?.isdeleted && setShowDelete(true) }}
                    // onPress={() => {
                    //     if (sender && !item?.isdeleted) {
                    //         setShowDelete(false)
                    //         setShowTime(prev => !prev)
                    //     }
                    // }}
                    >
                        <Text style={{
                            fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14,
                            color: sender ? (item?.isdeleted ? '#333' : colors.white) : '#333',
                            textAlign: sender ? 'right' : 'left',
                        }}>{item?.isdeleted ? 'This message is deleted' : item?.message}</Text>
                    </TouchableOpacity>
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
    time: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 14 : 12, marginTop: 3 },
    proficon: { width: isIPad ? 50 : 40, height: isIPad ? 50 : 40, borderRadius: isIPad ? 50 : 40, resizeMode: 'cover', },
    msgusername: { textTransform: 'capitalize', fontSize: isIPad ? 16 : 14, fontFamily: fonts.latoBold, marginBottom: 5, color: colors.black }
})
export default MessageItem;