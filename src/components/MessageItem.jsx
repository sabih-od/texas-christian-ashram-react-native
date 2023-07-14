
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height, isIPad } from "./../theme";
import { connect } from "react-redux";

const MessageItem = ({ item, userid, handleDelete }) => {
    // console.log('MessageItem item => ', item)
    const sender = item?.user?.id == userid;
    // console.log('item.user.id => ', item?.user?.id);
    // console.log('userid => ', userid);
    // console.log('item?.created_at => ', item?.created_at);
    // const [showDelete, setShowDelete] = useState(false);
    // const [showTime, setShowTime] = useState(false);

    return (
        <View style={[{ marginBottom: 10, maxWidth: '70%', }, sender ? { marginLeft: 'auto', flexDirection: 'row-reverse' } : { marginRight: 'auto', flexDirection: 'row' }]}>
            <Image source={item?.user?.profile_picture ? { uri: item?.user?.profile_picture } : require('./../../assets/images/dummy-profile-image.png')} style={[styles.proficon, sender ? { marginLeft: 10, } : { marginRight: 10, }]} />
            <View>
                <Text style={[{ textTransform: 'capitalize', fontSize: isIPad ? 16 : 14, fontFamily: fonts.latoBold, marginBottom: 5, color: colors.black }, sender ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                {/* {showDelete &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { handleDelete(item.id) }}
                        style={[{ position: 'absolute', backgroundColor: colors.black, paddingHorizontal: 10, paddingVertical: 1, width: 60, borderRadius: 4, bottom: 8, zIndex: 5 }, sender ? { left: -5 } : { right: -5 }]}>
                        <Text style={{ color: colors.white, textAlign: 'center', fontFamily: fonts.latoRegular, fontSize: 11, }}>Delete</Text>
                    </TouchableOpacity>
                } */}
                <View style={{
                    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5,
                    backgroundColor: sender ? (item?.isdeleted ? '#fff3cd' : colors.green) : '#eee',
                    opacity: item?.isdeleted ? 0.6 : 1
                }}>
                    <TouchableOpacity disabled={sender && !item.isdeleted ? false : true} activeOpacity={0.8}
                        // onLongPress={() => { sender && !item.isdeleted && setShowDelete(true) }}
                        // onPress={() => {
                        //     if (sender && !item.isdeleted) {
                        //         setShowDelete(false)
                        //         setShowTime(prev => !prev)
                        //     }
                        // }}
                    >
                        <Text style={{
                            fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 15,
                            color: sender ? (item.isdeleted ? '#333' : colors.white) : '#333',
                            textAlign: sender ? 'right' : 'left',
                        }}>{item.isdeleted ? 'This message is deleted' : item.message}</Text>
                    </TouchableOpacity>
                </View>
                {/* {showTime && */}
                <Text style={[styles.time, sender ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{moment(parseInt(item?.created_at)).fromNow()}</Text>
                {/* } */}
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
    proficon: { width: isIPad ? 50 : 40, height: isIPad ? 50 : 40, borderRadius: isIPad ? 50 : 40, resizeMode: 'cover', }
})
export default MessageItem;