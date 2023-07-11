import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, Platform, Button, Keyboard, View, TextInput, TouchableOpacity, FlatList, Text, RefreshControl, ActivityIndicator, KeyboardAvoidingView, TouchableWithoutFeedback, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, height } from "../../theme";
import { API_PATH } from "@env"
import { Header } from "@react-navigation/stack";

// import { io } from 'socket.io-client';
// // const websocketurl = 'ws://10.10.8.113:8029';
// const websocketurl = 'ws://192.168.2.112:8029';
// const socket = io(websocketurl);

const RenderMesssage = ({ item, userid, handleDelete }) => {
    // console.log('item => ', item)
    const sender = item.sender == userid;
    const [showDelete, setShowDelete] = useState(false);
    const [showTime, setShowTime] = useState(false);

    return (
        <View style={[{ marginBottom: 10, maxWidth: '70%', }, sender ? { marginLeft: 'auto', flexDirection: 'row-reverse' } : { marginRight: 'auto', flexDirection: 'row' }]}>
            <Image source={{ uri: item?.userinfo[0].profilePic }} style={[{ width: 40, height: 40, borderRadius: 40, resizeMode: 'cover', }, sender ? { marginLeft: 10, } : { marginRight: 10, }]} />
            <View>
                {showDelete &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { handleDelete(item._id) }}
                        style={[{ position: 'absolute', backgroundColor: '#000', paddingHorizontal: 10, paddingVertical: 1, width: 60, borderRadius: 4, bottom: 8, zIndex: 5 }, sender ? { left: -5 } : { right: -5 }]}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontFamily: fonts.primary, fontSize: 11, }}>Delete</Text>
                    </TouchableOpacity>
                }
                <View style={{
                    paddingHorizontal: 15, paddingVertical: 8, borderRadius: 5,
                    backgroundColor: sender ? (item.isdeleted ? '#fff3cd' : colors.primary) : '#eee',
                    opacity: item.isdeleted ? 0.6 : 1
                }}>
                    <TouchableOpacity disabled={sender && !item.isdeleted ? false : true} activeOpacity={0.8}
                        onLongPress={() => { sender && !item.isdeleted && setShowDelete(true) }}
                        onPress={() => {
                            if (sender && !item.isdeleted) {
                                setShowDelete(false)
                                setShowTime(prev => !prev)
                            }
                        }}
                    >
                        <Text style={{
                            fontFamily: fonts.primary, fontSize: 13,
                            color: sender ? (item.isdeleted ? '#333' : '#fff') : '#333',
                            textAlign: sender ? 'right' : 'left',
                        }}>{item.isdeleted ? 'This message is deleted' : item.text}</Text>
                    </TouchableOpacity>
                </View>
                {/* {showTime && */}
                <Text style={[{ fontFamily: fonts.primary, fontSize: 10, marginTop: 3 }, item.sender == userid ? { marginLeft: 'auto' } : { marginRight: 'auto' }]}>{moment.utc(item.createdAt, "YYYYMMDD").fromNow()}</Text>
                {/* } */}
            </View>
        </View>
    )
}

const Messages = (props) => {

    const { socket } = props.route.params;

    // const userid = "63623cd8a08d12cff4ab5702";
    // const receiverid = '63623fb042005087497d8c31'


    const userid = "636584797bb5410ba49936fb"; // user ghar
    const receiverid = "636586805eb2445eea62a5c1"; // driver ghar

    const [refresh, setRefresh] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [textMsg, setText] = useState(false);

    const messagesRef = useRef()

    useEffect(() => {

        
        console.log('props.socket messages => ');

        socket.on('getMessage', data => {
            console.log('getMessage => ', data)
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                userinfo: [{ _id: data.senderId, profilePic: data.profilepic }],
                createdAd: Date.now()
            })
        })
        socket.on('getDeleteMessage', data => {
            let altermsges = messages
            var foundIndex = altermsges.findIndex(item => item._id == '6255ea36493ce9d31211668e');
            if (foundIndex) {
                altermsges[foundIndex].isdeleted = true;
                console.log('abcd => ', altermsges[foundIndex])
                console.log('altermsges => ', altermsges)

                setMessages(altermsges)
            }
        })

        socket.on('getIsTyping', data => {
            // console.log('getIsTyping => ', data);
            setIsTyping({
                senderId: data.senderId,
                text: `${data.username} is typing......`,
                userinfo: [{ _id: data.senderId, profilePic: data.profilepic }],
                status: data.status
            })
        })

    }, [socket])

    useEffect(() => {
        console.log('textMsg typing')
        if (receiverid) {
            socket.emit('sendIsTyping', {
                conversationId: currentChat?._id,
                senderId: userid,
                receiverId: receiverid,
                username: 'abcd',
                profilepic: 'http://192.168.2.112:8029/public/uploads/profile-pic-5.jpg',
                status: textMsg != '' ? true : false
            })

            const delayDebounceFn = setTimeout(() => {
                socket.emit('sendIsTyping', {
                    conversationId: currentChat?._id,
                    senderId: userid,
                    receiverId: receiverid,
                    username: 'abcd',
                    profilepic: 'http://192.168.2.112:8029/public/uploads/profile-pic-5.jpg',
                    status: false
                })
            }, 3000)

            return () => clearTimeout(delayDebounceFn)
        }
    }, [textMsg])


    useEffect(() => {
        // console.log(moment.utc().tz('Asia/Karachi'));
    }, [])

    function onRefresh() {
        setRefresh(true)
    }

    function onLoadMore() {
        setLoadMore(true)
    }

    const [messages, setMessages] = useState([]);
    // const [socketUsers, setSocketUsers] = useState([]);

    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversations, setConversation] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [isTyping, setIsTyping] = useState(null);
    const [newMessage, setNewMessage] = useState(null);

    useEffect(() => {
        // console.log('arrivalMessage => ', arrivalMessage)
        if (currentChat) {
            arrivalMessage && currentChat.members.includes(arrivalMessage.senderId) && setMessages(prevMessage => [...prevMessage, arrivalMessage])
        }
    }, [arrivalMessage, currentChat])

    useEffect(() => {

        // socket.emit('addUser', userid)
        // socket.on('getUsers', users => {
        //     console.log('users => ', users)
        //     setSocketUsers(users)
        // })

        setCurrentChat(props.route.params.conversationobj)

        // props.route.params.conversationobj
        console.log('props.route.params.conversationobj => ', props.route.params.conversationobj);
        const cancelToken = axios.CancelToken.source()
        if (props.route.params.conversationobj._id) {
            axios.post(`${API_PATH}/api/message/getmessages`, { conversationid: props.route.params.conversationobj._id }, { cancelToken: cancelToken.token })
                .then(res => {
                    // console.log('res.data.data => ', res.data.data)
                    if (res.data.data.length > 0) {
                        setMessages(res.data.data)
                        messagesRef.current.scrollToEnd()
                    }
                }).catch(err => {
                    if (axios.isCancel(err)) {
                        console.log('Canceled', err);
                    }
                })

            return () => {
                cancelToken.cancel()
            }
        }
    }, [props.route.params.conversationobj]);

    const sendMessage = () => {
        console.log(textMsg);
        // setMessages(prevMsges => [...prevMsges, { "__v": 0, "_id": "6374e8310cddceb81c1591fa", "conversationid": "6374a059b0fe71495beaf1eb", "createdAt": "2022-11-16T13:40:01.694Z", "isdeleted": false, "sender": "63623cd8a08d12cff4ab5702", "text": "rqwerqwerqwerqwerqwe", "updatedAt": "2022-11-16T13:40:01.694Z" }])

        if (textMsg == '') { return; }

        // useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        axios.post(`${API_PATH}/api/message/add`, {
            conversationid: currentChat._id,
            sender: userid,
            text: textMsg
        }, { cancelToken: cancelToken.token })
            .then(res => {
                // console.log('response => ', res.data);
                if (res.data.status == 'success') {
                    setMessages(prevMsges => [...prevMsges, res.data.data])
                    setText('');
                    messagesRef.current.scrollToEnd()
                    socket.emit('sendMessage', {
                        conversationId: currentChat._id,
                        senderId: userid,
                        receiverId: receiverid,
                        text: textMsg,
                        profilepic: 'http://10.10.8.113:8029/public/uploads/profile-pic-5.jpg'
                    })
                }
            }).catch(err => { if (axios.isCancel(err)) { console.log('Canceled') } })
        //     return () => {
        //         cancelToken.cancel()
        //     }
        // }, []);

    }

    const handleDelete = (msgid) => {
        console.log('msgid => ', msgid);
        const cancelToken = axios.CancelToken.source()
        axios.post(`${API_PATH}/api/message/delete`, {
            messageid: msgid,
        }, { cancelToken: cancelToken.token })
            .then(res => {
                console.log(res.data.data)
                if (res.data.status == 'success') {
                    // setMessages(prevMsges => [...prevMsges, res.data.data])                    
                }
            }).catch(err => { if (axios.isCancel(err)) { console.log('Canceled') } })
    }


    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === "ios" ? "padding" : "height"}
        //     // style={[styles.fullview]}
        // >
        //     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}
        //         // style={[styles.fullview]}
        //     >
        <SafeAreaView style={[styles.fullview]}>
            <StatusBar
                barStyle={'dark-content'}
                // backgroundColor={'#fff'}
                StatusBarStyle={'dark-content'}
                backgroundColor="transparent"
                translucent={true}
            />

            {messages.length > 0 && <FlatList
                style={{
                    marginTop: 100,
                    // height: height - 110, 
                    paddingHorizontal: 15, backgroundColor: '#fff',
                }}
                contentContainerStyle={{ paddingTop: 10 }}
                scrollEnabled
                ref={messagesRef}
                // inverted
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                // data={messages.reverse()}
                data={messages}
                // refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                // ListFooterComponent={() => loadMore && <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 7 }}><ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} /><Text style={{ fontFamily: fonts.primary, marginLeft: 8, }}>Loading</Text></View>}                
                // onEndReached={onLoadMore}
                onEndReachedThreshold={0.7}
                keyExtractor={item => String(item._id)}
                renderItem={({ item, index }) => <RenderMesssage item={item} userid={userid} handleDelete={handleDelete} />}
            />}
            {isTyping && isTyping?.status &&
                <View style={{ backgroundColor: colors.primary, paddingVertical: 8, paddingHorizontal: 13, borderRadius: 5 }}><Text style={{ color: '#fff', fontSize: 13, fontFamily: fonts.primary }}>{isTyping.text}</Text></View>
            }
            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 5 }}>
                <TextInput
                    placeholder="Write your message.."
                    defaultValue=""
                    style={{ color: '#000', fontFamily: fonts.primary, fontSize: 13, width: '85%', backgroundColor: '#fff', paddingHorizontal: 15, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                    value={textMsg}
                    onChangeText={text => { setText(text) }}
                />
                <TouchableOpacity
                    onPress={() => sendMessage()}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#fff',
                        width: '15%', height: 48,
                        borderTopRightRadius: 5, borderBottomRightRadius: 5,
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                    }}>
                    <Icon name="send" size={22} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        //     </TouchableWithoutFeedback>
        // </KeyboardAvoidingView >
    );
}


const styles = StyleSheet.create({
    fullview: { flex: 1 },
    // container: { flex: 1, paddingTop: StatusBar.height + Header.height, },
    // contentContainer: { backgroundColor: "white", },
});

export default Messages;