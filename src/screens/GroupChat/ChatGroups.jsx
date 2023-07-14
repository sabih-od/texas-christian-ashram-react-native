import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors, fonts, height } from "../../theme";
import GroupItem from "../../components/GroupItem";
import grouplist from "../../data/groups";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/Feather";
import { GetGroupsApiCall } from "../../redux/reducers/ChatStateReducer";
import { getSocket } from "../../helpers/socket-manager";
import Loader from "../../components/Loader";

const itemslimit = 50;
const testobj = [
    { "id": 2, "name": "Group 2", "default_icon": null, "last_message": "hello cxzczxc", "last_updated": "1689025934080", "created_at": "1688596794473", "members": null },
    { "id": 1, "name": "Group 1", "default_icon": null, "last_message": "hello cxzczxc", "last_updated": "1689025929067", "created_at": "1688596787348", "members": null }
];

const ChatGroups = (props) => {
    const [groupList, setGroupList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loading, isLoading] = useState(false);

    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        if (arrivalMessage) {
            if (groupList.length != 0) {
                const updatedgroup = moveObjectToTop([...groupList], arrivalMessage?.group_id, arrivalMessage?.message);
                setGroupList(updatedgroup);
            }
        }
    }, [arrivalMessage]);
    // _handleRefresh = () => {
    //     // setRefreshing(true)
    // };

    useEffect(() => {
        // console.log('isLoading');
        props.GetGroupsApiCall({ pageno, limit });
        // isLoading(true);
        // return () => {
        //     setGroupList([]);
        // }
    }, []);

    const getGroupsResponseRef = useRef(props.getGroupsResponse);

    const socket = getSocket();
    useEffect(() => {
        console.log('socketId => ', socket?.id)

    }, [socket]);

    useEffect(() => {
        socket?.on('group-message', (res) => {
            console.log('on arrival group message => ', res);
            setArrivalMessage(res)

            // if (groupList.length != 0) {
            //     const updatedgroup = moveObjectToTop([...groupList], res?.group_id, res?.message);
            //     setGroupList(updatedgroup);
            //     // console.log('updatedgroup => ', updatedgroup);
            //     // const newgroup = updateObjectValue(...updatedgroup, res?.group_id, res?.message)
            //     // console.log('newgroup => ', newgroup);
            //     // if (newgroup) {
            //     //     setGroupList(prevState => newgroup);
            //     // }
            // }

        });
        return () => {
            // Clean up socket event listeners if needed
            socket?.off('group-message', (res) => {
                console.log('off arrival group message => ', res);
            });
        };
    }, [])


    useEffect(() => {
        // console.log('props.getGroupsResponse => ', props.getGroupsResponse);
        if (props.getGroupsResponse !== getGroupsResponseRef.current && props.getGroupsResponse.success && props.getGroupsResponse.data) {
            getGroupsResponseRef.current = props.getGroupsResponse;
            console.log('props.getGroupsResponse => ', props.getGroupsResponse)
            if (refreshing) setGroupList(props.getGroupsResponse.data)
            else setGroupList(prevState => [...prevState, ...props.getGroupsResponse.data])
        }
        setRefreshing(false)
        // isLoading(false);
        // if (props.getGroupsResponse !== getGroupsResponseRef.current && !props.getGroupsResponse.success) {
        //     showToast('error', 'Email Id or password incorrect')
        // }
        // isLoading(false);
    }, [props.getGroupsResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetGroupsApiCall({ pageno, limit });
        console.log('_handleRefresh ');
    }

    function moveObjectToTop(array, id, message) {
        // console.log('array => ', array);
        // console.log('id => ', id);
        let newarr = [];
        if (Array.isArray(array)) {
            const index = array.findIndex(obj => obj.id === id);
            console.log('index => ', index);
            if (index !== -1) {
                const object = array.splice(index, 1)[0];
                // object = { ...object, last_message: message, last_updated: Date.now(), badge : true }
                object.last_message = message;
                object.last_updated = Date.now();
                object.badge = true;
                array.unshift(object);
            }
        }
        console.log('updated arr => ', [...array])
        return [...array];
    }

    // function updateObjectValue(array, id, updatedValue) {
    //     if (Array.isArray(array)) {
    //         return array.map(obj => {
    //             if (obj.id === id) {
    //                 return { ...obj, last_message: updatedValue };
    //             }
    //             return obj;
    //         });
    //     }
    // }

    return <SafeAreaView style={{ flex: 1 }}>
        {/* <Loader isLoading={loading} /> */}
        <FlatList
            // style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
            //     { useNativeDriver: false }
            // )}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            data={groupList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<GroupItem key={index} item={item} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getGroupsResponse: state.chatstate.getGroupsResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetGroupsApiCall: bindActionCreators(GetGroupsApiCall, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(ChatGroups);