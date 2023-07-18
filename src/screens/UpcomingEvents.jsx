import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import eventlist from "../data/eventlist";
import UpComingEventBox from "../components/UpComingEventBox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetUpcomingEventsList } from "../redux/reducers/ListingApiStateReducer";
import { colors, fonts, isIPad } from "../theme";
import globalstyle from "../theme/style";
import NotFound from "../components/NotFound";

const itemslimit = 50;
const UpcomingEvents = (props) => {
    const [upcomingEventList, setUpcomingEventList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);
    const [loading, isLoading] = useState(false);

    const prevUpcomingEventsResRef = useRef(props.getUpcomingEventsListResponse);

    useEffect(() => {
        props.GetUpcomingEventsList({ pageno, limit })
        console.log({ pageno, limit })
        isLoading(true);
        return () => {
            console.log('Upcoming Events Unmount');
            setUpcomingEventList([])
        }
    }, [])

    useEffect(() => {
        if (props.getUpcomingEventsListResponse !== prevUpcomingEventsResRef.current && props.getUpcomingEventsListResponse?.success && props.getUpcomingEventsListResponse?.data?.length > 0) {
            prevUpcomingEventsResRef.current = props.getUpcomingEventsListResponse;
            console.log('props.getUpcomingEventsListResponse => ', props.getUpcomingEventsListResponse)
            if (refreshing) setUpcomingEventList(props.getUpcomingEventsListResponse.data)
            else setUpcomingEventList(prevState => [...prevState, ...props.getUpcomingEventsListResponse.data])
        }
        if (props.getUpcomingEventsListResponse) isLoading(false)
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getUpcomingEventsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetUpcomingEventsList({ pageno, limit });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetUpcomingEventsList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (upcomingEventList.length < props.getUpcomingEventsListResponse.total) {
                console.log('_handleLoadMore ');
                props.GetUpcomingEventsList({ pageno: pageno + 1, limit });
            }
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        {loading && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={isIPad ? 'large' : 'small'} color={colors.green} />
        </View>}
        {!loading && props.getUpcomingEventsListResponse?.data?.length == 0 && <NotFound title={"Upcoming Events"} />}
        {!loading && upcomingEventList.length > 0 && <FlatList
            style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 4 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            data={upcomingEventList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
                return (<UpComingEventBox key={index} item={item} width={isIPad ? (width / 4) - 15 : (width / 2) - 20} navigation={props.navigation} />)
            }}
        />}
    </SafeAreaView>
}
const setStateToProps = (state) => ({
    getUpcomingEventsListResponse: state.listingstate.getUpcomingEventsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetUpcomingEventsList: bindActionCreators(GetUpcomingEventsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(UpcomingEvents);