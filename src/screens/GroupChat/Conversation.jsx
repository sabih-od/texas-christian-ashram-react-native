import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { IOS, colors, fonts, height, isIPad, width } from "../../theme";
import { API_PATH } from "@env"
import messageslist from "../../data/messageslist";
import MessageItem from "../../components/MessageItem";
import { DeleteMessageApiCall, GetMessagesApiCall, ReportMessageApiCall, SendGroupRequestApiCall, SendMessageApiCall } from "../../redux/reducers/ChatStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSocket } from "../../helpers/socket-manager";
import { showToast } from "../../helpers/toastConfig";
import ReportDeleteBottomSheet from "../../components/bottom-sheet/ReportDeleteBottomSheet";

// import BottomSheet from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import DeleteReportMessageModal from "../../components/modal/DeleteReportMessageModal";
import ReportUserOrMessageModal from "../../components/modal/ReportUserOrMessageModal";
import { BlockUserApiCall, ReportUserApiCall } from "../../redux/reducers/UserStateReducer";
import Loader from "../../components/Loader";
import ProfileModal from "../../components/modal/ProfileModal";

// import { io } from 'socket.io-client';
// // const websocketurl = 'ws://10.10.8.113:8029';
// const websocketurl = 'ws://192.168.2.112:8029';
// const socket = io(websocketurl);

function delayanimate(toexecute) {
    setTimeout(() => {
        toexecute;
    }, 200)
}

const groupmember = [2, 5, 6, 8, 9, 16, 33];

const ITEMS_LIMIT = 50;
const Conversation = (props) => {


    // const [keyboardHeight, setKeyboardHeight] = useState(0);
    // useEffect(() => {
    //     const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
    //     const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);
    //     return () => {
    //         keyboardDidShowListener.remove();
    //         keyboardDidHideListener.remove();
    //     };
    // }, []);
    // const handleKeyboardShow = (event) => {
    //     const { height } = event.endCoordinates;
    //     setKeyboardHeight(height);
    // };
    // const handleKeyboardHide = () => {
    //     setKeyboardHeight(0);
    // };

    const [refresh, setRefresh] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const [textMsg, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(ITEMS_LIMIT);
    const [loading, isLoading] = useState(false);

    const messagesRef = useRef();

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversations, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [group, setGroup] = useState(props.route.params?.groupitem);
    const [groupMembers, setGroupMembers] = useState(props.route.params?.groupitem?.members);

    const userid = props?.userInfo?.id;

    useEffect(() => {
        console.log('useEffect groupMembers => ', groupMembers);
    }, [groupMembers])

    const socket = getSocket();
    useEffect(() => {
        // console.log('socketId => ', socket?.id);
        // console.log('new-message-' + group?.id);
        socket?.on('new-message-' + group?.id, (res) => {
            console.log('on arrival message => ', res);
            if (res?.user?.id != userid) {
                setMessages(prevState => [res, ...prevState]);
            }
        });
        // console.log('deleted-message-' + group?.id);
        socket?.on('deleted-message-' + group?.id, (res) => {
            console.log('on delete message => ', res);
            if (res?.user?.id != userid) {
                // const updatedMessages = messages.filter((message) => message.id !== res.id);
                // console.log('updatedMessages => ', updatedMessages);
                setMessages(prevState => prevState.filter((message) => message.id !== res.id));
            }
        });
        return () => {
            // Clean up socket event listeners if needed
            socket?.off('new-message-' + group?.id, (res) => {
                console.log('off arrival message => ', res);
            });
            socket?.off('deleted-message-' + group?.id, (res) => {
                console.log('off deleted message => ', res);
            });
        };
    }, [socket]);

    useEffect(() => {
        console.log('group?.id => ', group);
        props.navigation.setOptions({ headerTitle: group?.name });
        props.GetMessagesApiCall({ pageno, limit, group_id: group?.id })
        return () => {
            setMessages([])
        }
    }, [group]);

    const prevGetMessagesResRef = useRef(props.getMessagesResponse);
    useEffect(() => {
        if (props.getMessagesResponse !== prevGetMessagesResRef.current && props.getMessagesResponse?.success) {
            prevGetMessagesResRef.current = props.getMessagesResponse;
            console.log('props.getMessagesResponse => ', props.getMessagesResponse);
            setGroupMembers(props.getMessagesResponse?.members)
            console.log('setGroupMembers => ')
            if (props.getMessagesResponse.data.length > 0) {
                if (messages.length == 0 && !loadmore) {
                    setMessages(props.getMessagesResponse.data);
                } else {
                    setMessages(prevState => [...prevState, ...props.getMessagesResponse.data]);
                }
            }
            !loadmore && scrollToBottom(false)
            setLoadmore(false)
            setRefresh(false)
        }
    }, [props.getMessagesResponse]);

    useEffect(() => {
        // setMessages(messageslist);
        // messagesRef?.current?.scrollToEnd();
        console.log('messages => ', messages);
    }, [messages]);

    const prevDeleteMessagesResRef = useRef(props.deleteMessagesResponse);
    useEffect(() => {
        if (props.deleteMessagesResponse !== prevDeleteMessagesResRef.current && props.deleteMessagesResponse?.success) {
            prevDeleteMessagesResRef.current = props.deleteMessagesResponse;
            console.log('props.deleteMessagesResponse => ', props.deleteMessagesResponse);
            showToast('success', 'Message deleted successfully');
        }
    }, [props.deleteMessagesResponse])

    const prevSendMessageResRef = useRef(props.sendMessagesResponse);
    useEffect(() => {
        if (props.sendMessagesResponse !== prevSendMessageResRef.current && props.sendMessagesResponse?.success && props.sendMessagesResponse?.data) {
            prevSendMessageResRef.current = props.sendMessagesResponse;
            console.log('props.sendMessagesResponse => ', props.sendMessagesResponse);
            setMessages(prevMsges => [props.sendMessagesResponse?.data, ...prevMsges])
        }
    }, [props.sendMessagesResponse])

    const prevSendGroupReqResRef = useRef(props.sendGroupRequestResponse);
    useEffect(() => {
        if (props.sendGroupRequestResponse !== prevSendGroupReqResRef.current && props.sendGroupRequestResponse?.success && props.sendGroupRequestResponse?.data) {
            prevSendGroupReqResRef.current = props.sendGroupRequestResponse;
            console.log('props.sendGroupRequestResponse => ', props.sendGroupRequestResponse);
            showToast('success', 'Group request send successfully');
        }
        if (props.sendGroupRequestResponse !== prevSendGroupReqResRef.current && !props.sendGroupRequestResponse?.success && props.sendGroupRequestResponse?.data) {
            prevSendGroupReqResRef.current = props.sendGroupRequestResponse;
            showToast('error', props.sendGroupRequestResponse.message);
        }
        isLoading(false);
    }, [props.sendGroupRequestResponse])

    // const prevSendMessagesFailResRef = useRef(props.sendMessagesResponse);
    // useEffect(() => {
    //     console.log('props.sendMessagesFailResponse => ', props.sendMessagesFailResponse?.response?.data);
    //     if (props.sendMessagesFailResponse?.response?.data !== prevSendMessagesFailResRef.current && !props.sendMessagesFailResponse?.success && props.sendMessagesFailResponse?.response?.data) {
    //         prevSendMessagesFailResRef.current = props.sendMessagesFailResponse?.response?.data;
    //         showToast('error', props.sendMessagesFailResponse?.response?.data?.message);
    //     }
    // }, [props.sendMessagesFailResponse])

    const prevReportMessagesResRef = useRef(props.reportMessageResponse);
    useEffect(() => {
        if (props.reportMessageResponse !== prevReportMessagesResRef.current && props.reportMessageResponse?.success) {
            prevReportMessagesResRef.current = props.reportMessageResponse;
            console.log('props.reportMessageResponse => ', props.reportMessageResponse);
            showToast('success', 'Message reported successfully');
        }
    }, [props.reportMessageResponse])

    const prevReportUserResRef = useRef(props.reportUserResponse);
    useEffect(() => {
        if (props.reportUserResponse !== prevReportUserResRef.current && props.reportUserResponse?.success) {
            prevReportUserResRef.current = props.reportUserResponse;
            console.log('props.reportUserResponse => ', props.reportUserResponse);
            showToast('success', 'User reported successfully');
        }
    }, [props.reportUserResponse])

    const scrollToBottom = (animated) => {
        setTimeout(() => {
            // messagesRef.current.scrollToEnd({ animated });
            messagesRef.current.scrollToOffset({ animated, offset: 0 });
        }, 100)
    };

    function onEndReached({ distanceFromEnd }) {
        if (distanceFromEnd <= 0) return;
        if (!loadmore && distanceFromEnd > 0 && distanceFromEnd <= height - 150) {
            if (props.getMessagesResponse.data.length != 0) {
                console.log('onEndReached upar wala', distanceFromEnd);
                setLoadmore(true)
                props.GetMessagesApiCall({ pageno: pageno + 1, limit, group_id: group?.id })
                setPageno(prevState => prevState + 1);
            }
        }
        // setLoadmore(false)
    }

    // useEffect(()=>{
    //     socket?.on('typing', (res) => {
    //         console.log('is typing => ', res);
    //         if (res?.user?.id != userid) {
    //             console.log(`${res?.user?.first_name} is typing`)
    //         }
    //     });
    // },[socket])

    // useEffect(() => {
    //     console.log('textMsg => ', textMsg);
    //     socket.emit("typing", {groupid: group?.id, user: { id: props.userInfo?.id, first_name: props.userInfo?.first_name}});
    // }, [textMsg])

    const onSendMessage = () => {
        if (textMsg == '') { return; }
        console.log(textMsg);
        props.SendMessageApiCall({
            group_id: group?.id,
            user_id: userid,
            message: textMsg
        });
        setText('');
        scrollToBottom(true)
    }

    const onHandleDelete = (item) => {
        setShowDeleteModal(false)
        const updatedMessages = messages.filter((message) => message.id !== item.id);
        setMessages(updatedMessages);
        props.DeleteMessageApiCall({ msgid: item.id })
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToBeDeleted, setItemToBeDeleted] = useState(false);
    const [reportType, setReportType] = useState(null);

    function _showDeleteModal(item) {
        setShowDeleteModal(true)
        setItemToBeDeleted(item)
    }

    const [showReportUserModal, visibleReportUserOrMessageModal] = useState(false);

    function onReportAction(value) {
        // console.log('onReportAction => ', value);
        // console.log('itemToBeDeleted => ', itemToBeDeleted)
        if (value) {
            // report kardo
            visibleReportUserOrMessageModal(false)
            console.log('reportType => ', reportType)
            if (reportType == 'message') {
                // message report wali api
                props.ReportMessageApiCall({ "message_id": itemToBeDeleted?.id })
            } else {
                // user report wali api
                props.ReportUserApiCall({ "user_id": itemToBeDeleted?.user?.id })
            }
        } else {
            // cancel
            visibleReportUserOrMessageModal(false)
        }
    }

    function onSelectRport(value) {
        setReportType(value);
        visibleReportUserOrMessageModal(true)
    }

    function onSendRequest() {
        isLoading(true);
        props.SendGroupRequestApiCall({ "user_id": userid, "group_id": group?.id });
    }

    const [profile, setProfile] = useState(null)
    const [showProfileModal, setProfileModal] = useState(false)
    function _showProfileModal(value) {
        setProfileModal(true)
        setProfile(value)
    }

    function _handleBlockUser(id) {
        console.log('_handleBlockUser => ', id)
        setProfileModal(false)
        props.BlockUserApiCall({ user_id: id })
    }

    const prevBlockUserResRef = useRef(props.blockUserResponse);
    useEffect(() => {
        if (props.blockUserResponse !== prevBlockUserResRef.current && props.blockUserResponse?.success) {
            prevBlockUserResRef.current = props.blockUserResponse;
            console.log('props.blockUserResponse => ', props.blockUserResponse);
            showToast('success', 'User blocked successfully');
            props.GetMessagesApiCall({ pageno: 1, limit, group_id: group?.id })
            setMessages([])
        }
    }, [props.blockUserResponse])

    return (
        <SafeAreaView style={[styles.fullview]}>
            <Loader isLoading={loading} />
            <KeyboardAvoidingView
                // behavior={'padding'}
                // behavior={IOS ? 'padding' : 'height'}
                behavior={IOS ? 'padding' : null}
                keyboardVerticalOffset={IOS ? 90 : 0}
                style={[styles.fullview]}
            >
                {groupMembers?.includes(userid) && <ProfileModal visible={showProfileModal} setVisible={setProfileModal} handleBlockUser={_handleBlockUser} profile={profile} />}
                {showDeleteModal && groupMembers?.includes(userid) && <DeleteReportMessageModal
                    item={itemToBeDeleted}
                    handleDelete={onHandleDelete}
                    userid={userid}
                    setShowDeleteModal={setShowDeleteModal}
                    handleReportUserModal={onSelectRport}
                />}
                {showReportUserModal && groupMembers?.includes(userid) && <ReportUserOrMessageModal
                    item={itemToBeDeleted}
                    // visible={showReportUserModal}
                    reportType={reportType}
                    handleReportAction={onReportAction}
                    setVisible={visibleReportUserOrMessageModal}
                />}
                <FlatList
                    style={styles.flatliststyle}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                    scrollEnabled
                    ref={messagesRef}
                    inverted
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.9}
                    // ListEmptyComponent={() => <View><Text>hello</Text></View>}
                    ListFooterComponent={() => loadmore &&
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginBottom: 15, }}>
                            <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'small'} color={colors.green} />
                            <Text style={{ fontFamily: fonts.latoRegular, marginLeft: 8, }}>Loading</Text>
                        </View>
                    }
                    // data={messages.reverse()}
                    data={messages}
                    // data={messageslist}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => item ? <MessageItem item={item} userid={userid} showDeleteModal={_showDeleteModal} showProfileModal={_showProfileModal} /> : <View />}
                />
                <View style={styles.textmsgbox}>
                    {(!groupMembers?.includes(userid)) && <>
                        <View style={{}}>
                            <Text style={styles.notmembertext}>You are not currently a member of this group</Text>
                        </View>
                        {isIPad ?
                            <TouchableOpacity
                                onPress={() => onSendRequest()}
                                activeOpacity={0.8}
                                style={[styles.sendmsgbtn, { width: 170 }]}>
                                <Text style={{ color: colors.white, fontFamily: fonts.latoBold, fontSize: 17, marginRight: 10 }}>Send Request</Text>
                                <Icon name="send" size={20} color={colors.white} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => onSendRequest()}
                                activeOpacity={0.8}
                                style={[styles.sendmsgbtn, { borderRadius: 15 }]}>
                                {/* <Text style={{color: colors.white, fontFamily: fonts.latoBold,  fontSize: 15}}>Send Request</Text> */}
                                <Icon name="plus" size={22} color={colors.white} />
                            </TouchableOpacity>}
                    </>}
                    {groupMembers?.includes(userid) && <>
                        <TextInput
                            placeholder="Write your message.."
                            defaultValue=""
                            style={styles.textinputmsg}
                            value={textMsg}
                            onChangeText={text => { setText(text) }}
                            onFocus={() => {
                                console.log('input foucs');
                                scrollToBottom(false)
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => onSendMessage()}
                            activeOpacity={0.8}
                            style={styles.sendmsgbtn}>
                            <Icon name="send" size={22} color={colors.white} />
                        </TouchableOpacity>
                    </>}
                </View>
            </KeyboardAvoidingView >
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullview: { flex: 1 },
    sendmsgbtn: { backgroundColor: colors.orange, width: 45, height: 45, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    textinputmsg: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14, width: width - 80, backgroundColor: colors.white, paddingHorizontal: 15, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, height: 45 },
    textmsgbox: { width: width - 20, margin: 10, borderRadius: 10, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 5 },
    flatliststyle: { paddingHorizontal: 15, backgroundColor: colors.white, },
    notmembertext: { fontFamily: fonts.latoRegular, color: '#666', textAlign: 'center', width: isIPad ? width - 210 : width - 80, fontSize: isIPad ? 17 : 14 }
});

const setStateToProps = (state) => ({
    userInfo: state.appstate.userInfo,
    getMessagesResponse: state.chatstate.getMessagesResponse,
    sendMessagesResponse: state.chatstate.sendMessagesResponse,
    sendMessagesFailResponse: state.chatstate.sendMessagesFailResponse,
    deleteMessagesResponse: state.chatstate.deleteMessagesResponse,
    reportMessageResponse: state.chatstate.reportMessageResponse,
    sendGroupRequestResponse: state.chatstate.sendGroupRequestResponse,
    reportUserResponse: state.userstate.reportUserResponse,
    blockUserResponse: state.userstate.blockUserResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetMessagesApiCall: bindActionCreators(GetMessagesApiCall, dispatch),
        SendMessageApiCall: bindActionCreators(SendMessageApiCall, dispatch),
        DeleteMessageApiCall: bindActionCreators(DeleteMessageApiCall, dispatch),
        ReportMessageApiCall: bindActionCreators(ReportMessageApiCall, dispatch),
        ReportUserApiCall: bindActionCreators(ReportUserApiCall, dispatch),
        SendGroupRequestApiCall: bindActionCreators(SendGroupRequestApiCall, dispatch),
        BlockUserApiCall: bindActionCreators(BlockUserApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Conversation);