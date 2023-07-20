import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height, isIPad, width } from "../../theme";
import { API_PATH } from "@env"
import messageslist from "../../data/messageslist";
import MessageItem from "../../components/MessageItem";
import { DeleteMessageApiCall, GetMessagesApiCall, ReportMessageApiCall, SendMessageApiCall } from "../../redux/reducers/ChatStateReducer";
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
import { ReportUserApiCall } from "../../redux/reducers/UserStateReducer";

// import { io } from 'socket.io-client';
// // const websocketurl = 'ws://10.10.8.113:8029';
// const websocketurl = 'ws://192.168.2.112:8029';
// const socket = io(websocketurl);

function delayanimate(toexecute) {
    setTimeout(() => {
        toexecute;
    }, 200)
}

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

    const messagesRef = useRef();

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversations, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    const { groupid } = props.route.params
    const userid = props?.userInfo?.id;

    const socket = getSocket();
    useEffect(() => {
        // console.log('socketId => ', socket?.id);
        // console.log('new-message-' + groupid);
        socket?.on('new-message-' + groupid, (res) => {
            console.log('on arrival message => ', res);
            if (res?.user?.id != userid) {
                setMessages(prevState => [res, ...prevState]);
            }
        });
        // console.log('deleted-message-' + groupid);
        socket?.on('deleted-message-' + groupid, (res) => {
            console.log('on delete message => ', res);
            if (res?.user?.id != userid) {
                // const updatedMessages = messages.filter((message) => message.id !== res.id);
                // console.log('updatedMessages => ', updatedMessages);
                setMessages(prevState => prevState.filter((message) => message.id !== res.id));
            }
        });
        return () => {
            // Clean up socket event listeners if needed
            socket?.off('new-message-' + groupid, (res) => {
                console.log('off arrival message => ', res);
            });
            socket?.off('deleted-message-' + groupid, (res) => {
                console.log('off deleted message => ', res);
            });
        };
    }, [socket]);

    useEffect(() => {
        console.log('props.route.params.groupid => ', props.route.params.groupid);
        props.navigation.setOptions({ headerTitle: props.route.params.title });
        props.GetMessagesApiCall({ pageno, limit, group_id: props.route.params.groupid })
        return () => {
            setMessages([])
        }
    }, [props.route.params.groupid]);

    const prevGetMessagesResRef = useRef(props.getMessagesResponse);
    useEffect(() => {
        if (props.getMessagesResponse !== prevGetMessagesResRef.current && props.getMessagesResponse?.success) {
            prevGetMessagesResRef.current = props.getMessagesResponse;
            console.log('props.getMessagesResponse => ', props.getMessagesResponse);
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
                props.GetMessagesApiCall({ pageno: pageno + 1, limit, group_id: props.route.params.groupid })
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
    //     socket.emit("typing", {groupid: props.route.params.groupid, user: { id: props.userInfo?.id, first_name: props.userInfo?.first_name}});
    // }, [textMsg])

    const onSendMessage = () => {
        if (textMsg == '') { return; }
        console.log(textMsg);
        props.SendMessageApiCall({
            group_id: props.route.params.groupid,
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

    return (
        <SafeAreaView style={[styles.fullview]}>
            <KeyboardAvoidingView
                // behavior={'padding'}
                // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                style={[styles.fullview]}
            >

                {showDeleteModal && <DeleteReportMessageModal
                    item={itemToBeDeleted}
                    handleDelete={onHandleDelete}
                    userid={userid}
                    setShowDeleteModal={setShowDeleteModal}
                    handleReportUserModal={onSelectRport}
                />}
                {showReportUserModal && <ReportUserOrMessageModal
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
                    ListFooterComponent={() => loadmore &&
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginBottom: 15, }}>
                            <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'small'} color={colors.green} />
                            <Text style={{ fontFamily: fonts.latoRegular, marginLeft: 8, }}>Loading</Text>
                        </View>
                    }
                    // data={messages.reverse()}
                    data={messages}
                    // data={messageslist}
                    keyExtractor={item => String(item?.id)}
                    renderItem={({ item, index }) => <MessageItem item={item} userid={userid} showDeleteModal={_showDeleteModal} />}
                />
                <View style={styles.textmsgbox}>
                    <TextInput
                        placeholder="Write your message.."
                        defaultValue=""
                        style={styles.textinputmsg}
                        value={textMsg}
                        onChangeText={text => { setText(text) }}
                        onFocus={() => {
                            console.log('input foucs');
                            scrollToBottom(false)
                            // setTimeout(() => {
                            //     messagesRef.current.scrollToEnd({ animated: false })
                            // }, 200)
                        }}
                    // onSubmitEditing={() => sendMessage()}
                    />
                    <TouchableOpacity
                        onPress={() => onSendMessage()}
                        activeOpacity={0.8}
                        style={styles.sendmsgbtn}>
                        <Icon name="send" size={22} color={colors.white} />
                    </TouchableOpacity>
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
});

const setStateToProps = (state) => ({
    userInfo: state.appstate.userInfo,
    getMessagesResponse: state.chatstate.getMessagesResponse,
    sendMessagesResponse: state.chatstate.sendMessagesResponse,
    sendMessagesFailResponse: state.chatstate.sendMessagesFailResponse,
    deleteMessagesResponse: state.chatstate.deleteMessagesResponse,
    reportMessageResponse: state.chatstate.reportMessageResponse,
    reportUserResponse: state.userstate.reportUserResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetMessagesApiCall: bindActionCreators(GetMessagesApiCall, dispatch),
        SendMessageApiCall: bindActionCreators(SendMessageApiCall, dispatch),
        DeleteMessageApiCall: bindActionCreators(DeleteMessageApiCall, dispatch),
        ReportMessageApiCall: bindActionCreators(ReportMessageApiCall, dispatch),
        ReportUserApiCall: bindActionCreators(ReportUserApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Conversation);