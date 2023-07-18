import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { colors, fonts, height, isIPad, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import BookBox from "../components/BookBox";
import bookslist from "../data/bookslist";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetEventsList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";
import UpComingEventBox from "../components/UpComingEventBox";
import NotFound from "../components/NotFound";
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
        {loading && <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={isIPad ? 'large' : 'small'} color={colors.green} />
        </View>}
        {!loading && props.getEventsListResponse?.data?.length == 0 && <NotFound title={"Events"} />}
        {!loading && eventList.length > 0 &&
            <FlatList
                style={{ padding: 15, }}
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
                data={eventList}
                keyExtractor={item => String(item.id)}
                renderItem={({ item, index }) => {
                    return (<UpComingEventBox key={index} item={item} width={isIPad ? (width / 4) - 15 : (width / 2) - 20} navigation={props.navigation} />)
                }}
            />}
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getEventsListResponse: state.listingstate.getEventsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetEventsList: bindActionCreators(GetEventsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Events);

const styles = StyleSheet.create({
})