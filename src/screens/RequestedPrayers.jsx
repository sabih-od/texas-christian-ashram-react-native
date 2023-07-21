import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { colors, fonts } from "../theme";
import RequestedPrayersItem from "../components/RequestedPrayersItem";
import notificationslist from "../data/notifications-list";
import requestedprayerslist from "../data/requested-prayers";
import {GetRequestedPrayersList} from '../redux/reducers/ListingApiStateReducer';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import RequestedPrayerModal from "../components/modal/RequestedPrayerModal";

const itemslimit = 50;
const RequestedPrayers = (props) => {

    const [requestedPrayers, setRequestedPrayersList] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [getItem, setItem] = useState(false);
    
    const prevRequestedPrayersResponseRef = useRef(props.getRequestedPrayersListResponse);

    useEffect(() => {
        props.GetRequestedPrayersList({ pageno, limit })
        console.log({pageno, limit})
        return () => {
            console.log('Sermon Unmount');
            setRequestedPrayersList([])
        }
    }, [])

    useEffect(() => {
        if (props.getRequestedPrayersListResponse !== prevRequestedPrayersResponseRef.current && props.getRequestedPrayersListResponse?.success && props.getRequestedPrayersListResponse?.data.length) {
            prevRequestedPrayersResponseRef.current = props.getRequestedPrayersListResponse;
            console.log('props.getRequestedPrayersListResponse => ', props.getRequestedPrayersListResponse)
            if (refreshing) setRequestedPrayersList(props.getRequestedPrayersListResponse?.data)
            else setRequestedPrayersList(prevState => [...prevState, ...props.getRequestedPrayersListResponse?.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getRequestedPrayersListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetRequestedPrayersList({ pageno, limit });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetRequestedPrayersList({ pageno: pageno + 1, limit });
        if(!loadmore){
            console.log('_handleLoadMore ');
            props.GetRequestedPrayersList({ pageno: pageno + 1, limit });
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        {/* <ScrollView style={{ padding: 15 }}> */}
        <RequestedPrayerModal visible={showModal} setVisible={setShowModal} item={getItem}  />
        <FlatList
            style={{ padding: 15, }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            data={requestedPrayers}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<RequestedPrayersItem key={index} item={item} userid={props.userInfo.id} navigation={props.navigation} setShowModal={setShowModal} setItem={setItem} />)
            }}
        />
        {/* <View style={{height: 20}} /> */}
    </SafeAreaView>
}





const setStateToProps = state => ({
    userInfo: state.appstate.userInfo,
    getRequestedPrayersListResponse: state.listingstate.getRequestedPrayersListResponse,
});

const mapDispatchToProps = dispatch => {
    return {
        GetRequestedPrayersList: bindActionCreators(GetRequestedPrayersList, dispatch),
    };
};

export default connect(setStateToProps, mapDispatchToProps)(RequestedPrayers);