import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height, width } from "../../theme";
import { API_PATH } from "@env"
import messageslist from "../../data/messageslist";
import MessageItem from "../../components/MessageItem";
import { GetMessagesApiCall, SendMessageApiCall } from "../../redux/reducers/ChatStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getSocket } from "../../helpers/socket-manager";

// import { io } from 'socket.io-client';
// // const websocketurl = 'ws://10.10.8.113:8029';
// const websocketurl = 'ws://192.168.2.112:8029';
// const socket = io(websocketurl);

function delayanimate(toexecute) {
    setTimeout(() => {
        toexecute;
    }, 200)
}

const KeyboardAvoidingWrapper = (props) => {
    return <SafeAreaView style={[styles.fullview]}>
        <KeyboardAvoidingView behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            style={[styles.fullview]}
        >
            {props?.children}
        </KeyboardAvoidingView>
    </SafeAreaView>
}

const ITEMS_LIMIT = 50;
const Conversation = (props) => {

    // const userid = "636584797bb5410ba49936fb";
    // const receiverid = "636586805eb2445eea62a5c1";

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
        console.log('socketId => ', socket?.id)
        console.log('new-message-' + groupid);
        socket?.on('new-message-' + groupid, (res) => {
            console.log('on arrival message => ', res);
            if (res?.user?.id != userid) {
                setMessages(prevState => [res, ...prevState]);
            }
        });
        return () => {
            // Clean up socket event listeners if needed
            socket?.off('new-message-' + groupid, (res) => {
                console.log('off arrival message => ', res);
            });
        };
    }, [socket]);

    // useEffect(() => {
    //     props.navigation.setOptions({ headerTitle: props.route.params.title });
    //     props.GetMessagesApiCall({ pageno, limit, group_id: props.route.params.groupid })
    //     return () => {
    //         setMessages([])
    //     }
    // }, []);

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
        if (props.getMessagesResponse !== prevGetMessagesResRef.current && props.getMessagesResponse.success) {
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

    const scrollToBottom = (animated) => {
        setTimeout(() => {
            // messagesRef.current.scrollToEnd({ animated });
            messagesRef.current.scrollToOffset({ animated, offset: 0 });
        }, 100)
    };

    const sendMessage = () => {
        if (textMsg == '') { return; }
        console.log(textMsg);

        // const now = new Date();
        // const year = now.getUTCFullYear();
        // const month = now.getUTCMonth() + 1;
        // const day = now.getUTCDate();
        // const hours = now.getUTCHours();
        // const minutes = now.getUTCMinutes();
        // const seconds = now.getUTCSeconds();
        // const milliseconds = now.getUTCMilliseconds();
        // const utcdate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`
        const utcdate = new Date().valueOf();
        props.SendMessageApiCall({
            group_id: props.route.params.groupid,
            user_id: userid,
            message: textMsg
        });
        setMessages(prevMsges => [{ id: Math.random() * 10, user: { id: userid, first_name: props.userInfo.first_name, last_name: props.userInfo.last_name, profile_picture: props.userInfo.profile_picture }, message: textMsg, isDeleted: false, created_at: utcdate }, ...prevMsges])
        setText('');
        scrollToBottom(true)
    }

    const handleDelete = (msgid) => {
        console.log('msgid => ', msgid);
    }

    function onRefresh() { setRefresh(true) }

    function handleOnEndReached({ distanceFromEnd }) {
        if (distanceFromEnd <= 0) return;
        if (!loadmore && distanceFromEnd > 0 && distanceFromEnd <= height - 150) {
            if (props.getMessagesResponse.data.length != 0) {
                console.log('handleOnEndReached upar wala', distanceFromEnd);
                setLoadmore(true)
                props.GetMessagesApiCall({ pageno: pageno + 1, limit, group_id: props.route.params.groupid })
                setPageno(prevState => prevState + 1);
            }
        }
        // setLoadmore(false)

    }

    return (
        <SafeAreaView style={[styles.fullview]}>
            <KeyboardAvoidingView behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                style={[styles.fullview]}
            >
                {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
                {/* <View style={{ flex: 1 }}> */}
                <FlatList
                    style={styles.flatliststyle}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                    scrollEnabled
                    ref={messagesRef}
                    inverted
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    onEndReached={handleOnEndReached}
                    onEndReachedThreshold={0.9}
                    // refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                    ListFooterComponent={() => loadmore &&
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7, marginBottom: 15, }}>
                            <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'small'} color={colors.green} />
                            <Text style={{ fontFamily: fonts.latoRegular, marginLeft: 8, }}>Loading</Text>
                        </View>
                    }
                    // data={messages.reverse()}
                    data={messages}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) => {
                        // console.log('item => ', item);
                        return <MessageItem item={item} userid={userid} handleDelete={handleDelete} />
                    }
                    }
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
                        onPress={() => sendMessage()}
                        activeOpacity={0.8}
                        style={styles.sendmsgbtn}>
                        <Icon name="send" size={22} color={colors.white} />
                    </TouchableOpacity>
                </View>
                {/* </View> */}
                {/* </TouchableWithoutFeedback> */}
            </KeyboardAvoidingView >
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    fullview: { flex: 1 },
    sendmsgbtn: { backgroundColor: colors.orange, width: 45, height: 45, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    textinputmsg: {
        color: colors.black, fontFamily: fonts.latoRegular, fontSize: 14, width: width - 80, backgroundColor: colors.white, paddingHorizontal: 15, borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
        // backgroundColor: '#ddd',
        height: 45

    },
    textmsgbox: { width: width - 20, margin: 10, borderRadius: 5, backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 5 },
    flatliststyle: { paddingHorizontal: 15, backgroundColor: colors.white, },

    container: { position: 'absolute', bottom: 40, right: 20, zIndex: 999, },
    iconContainer: { backgroundColor: colors.green, borderRadius: 20, width: 55, height: 55, justifyContent: 'center', alignItems: 'center', },
    notifbadge: { width: 17, height: 17, backgroundColor: colors.orange, borderRadius: 10, right: 0, position: 'absolute', zIndex: 1, top: -7 }

});


const setStateToProps = (state) => ({
    userInfo: state.appstate.userInfo,
    getMessagesResponse: state.chatstate.getMessagesResponse,
    sendMessagesResponse: state.chatstate.sendMessagesResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetMessagesApiCall: bindActionCreators(GetMessagesApiCall, dispatch),
        SendMessageApiCall: bindActionCreators(SendMessageApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Conversation);