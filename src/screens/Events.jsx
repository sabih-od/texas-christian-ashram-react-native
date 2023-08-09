import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Platform, Linking } from "react-native";
import { colors, fonts, height, isIPad, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import BookBox from "../components/BookBox";
import bookslist from "../data/bookslist";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { EventPageContentApiCall, GetEventsList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";
import UpComingEventBox from "../components/UpComingEventBox";
import NotFound from "../components/NotFound";
import WebView from "react-native-webview";
import RenderHTML from "../components/RenderHTML";
// import Logo from "./../../assets/images/logo.svg";




const itemslimit = 50;
const Events = (props) => {
    const [eventList, setEventList] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const [loading, isLoading] = useState(false);
    const prevEventsListResRef = useRef(props.getEventsListResponse);


    const prevEventsPageContentResponseRef = useRef(props.eventsPageContentResponse);

    useEffect(() => {
        props.EventPageContentApiCall();
    }, []);

    useEffect(() => {
        if (props.eventsPageContentResponse !== prevEventsPageContentResponseRef.current && props.eventsPageContentResponse?.success && props.eventsPageContentResponse?.data) {
            prevEventsPageContentResponseRef.current = props.eventsPageContentResponse;
            console.log('props.eventsPageContentResponse => ', props.eventsPageContentResponse?.data?.content)
        }
    }, [props.eventsPageContentResponse])


    useEffect(() => {
        props.GetEventsList({ pageno, limit })
        console.log({ pageno, limit })
        isLoading(true);
        return () => {
            console.log('Books Unmount');
            setEventList([])
        }
    }, [])


    useEffect(() => {
        if (props.getEventsListResponse !== prevEventsListResRef.current && props.getEventsListResponse?.success && props.getEventsListResponse?.data.length > 0) {
            prevEventsListResRef.current = props.getEventsListResponse;
            console.log('props.getEventsListResponse => ', props.getEventsListResponse)
            if (refreshing) setEventList(props.getEventsListResponse.data)
            else setEventList(prevState => [...prevState, ...props.getEventsListResponse.data])
            // setLoadmore(false)
        }
        if (props.getEventsListResponse) isLoading(false);
        setRefreshing(false);
    }, [props.getEventsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetEventsList({ pageno, limit });
        console.log('_handleRefresh ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetEventsList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            console.log('_handleLoadMore ');
            props.GetEventsList({ pageno: pageno + 1, limit });
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
            {loading && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={isIPad ? 'large' : 'small'} color={colors.green} />
            </View>}
            {!loading && props.getEventsListResponse?.data?.length == 0 && <NotFound title={"Events"} />}
            <RenderHTML htmlcontent={props.eventsPageContentResponse?.data?.content} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: 15, borderBottomColor: '#ddd', borderBottomWidth: 1, backgroundColor: colors.grey }}>
                <View style={{ width: (width / 2) - 20, }}><Text style={{ fontFamily: fonts.latoRegular, color: colors.white }}>Title</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{width: (width / 4) + 10}}><Text style={{ paddingHorizontal: 15,  textAlign: 'center', fontFamily: fonts.latoRegular, color: colors.white }} numberOfLines={1}>Start Time</Text></View>
                    <View style={{width: (width / 4) - 10}}><Text style={{ paddingHorizontal: 15,  textAlign: 'center', fontFamily: fonts.latoRegular, color: colors.white }} numberOfLines={1}>End Time</Text></View>
                </View>
            </View>

            {!loading && eventList.map((item, index) => {
                return (
                    <View key={index} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: 15, borderBottomColor: '#ddd', borderBottomWidth: 1, }}>
                        <View style={{ width: (width / 2) - 20, }}><Text style={{ fontFamily: fonts.latoRegular }}>{item?.title}</Text></View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{width: (width / 4) + 10}}><Text style={{ paddingHorizontal: 15,  textAlign: 'center', fontFamily: fonts.latoRegular }} numberOfLines={1}>{item?.start_time}</Text></View>
                            <View style={{width: (width / 4) - 10}}><Text style={{ paddingHorizontal: 15,  textAlign: 'center', fontFamily: fonts.latoRegular }} numberOfLines={1}>{item?.end_time}</Text></View>
                        </View>
                    </View>
                )
            })}

            {/* {!loading && eventList.length > 0 &&
            <FlatList
                style={{ padding: 15, }}
                // horizontal
                // snapToInterval={width / 2}
                // scrollEnabled
                // scrollEventThrottle={16}
                columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
                numColumns={isIPad ? 3 : 2}
                showsVerticleScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={_handleRefresh}
                // ItemSeparatorComponent={() => <View style={{height: 20}} />}
                ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                    <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                    <Text style={globalstyle.footerloadingtext}>Loading</Text>
                </View> : <View style={{ height: 20 }} />}
                // onEndReachedThreshold={0.8}
                // onEndReached={_handleLoadMore}
                data={eventList}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) => {
                    return (<UpComingEventBox key={index} item={item} width={isIPad ? (width / 3) - 20 : (width / 2) - 20} navigation={props.navigation} />)
                }}
            />} */}
        </ScrollView>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getEventsListResponse: state.listingstate.getEventsListResponse,
    eventsPageContentResponse: state.listingstate.eventsPageContentResponse,
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetEventsList: bindActionCreators(GetEventsList, dispatch),
        EventPageContentApiCall: bindActionCreators(EventPageContentApiCall, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Events);

const styles = StyleSheet.create({
})