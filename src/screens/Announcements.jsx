import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import announcementlist from "../data/announcementlist";
import AnnouncementBox from "../components/AnnouncemntBox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetAnnouncementList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";
import { colors, isIPad, width } from "../theme";

const itemslimit = 50;
const Announcements = (props) => {

    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);

    const [announcementList, setAnnoucenmentlist] = useState([]);
    const prevAnnoucenmentListResponseRef = useRef(props.getAnnouncementResponse);

    useEffect(() => {
        props.GetAnnouncementList({ pageno, limit })
        console.log({ pageno, limit })
        return () => {
            console.log('Announcement Unmount');
            setAnnoucenmentlist([])
        }
    }, [])

    useEffect(() => {
        if (props.getAnnouncementResponse !== prevAnnoucenmentListResponseRef.current && props.getAnnouncementResponse?.success && props.getAnnouncementResponse?.data.length) {
            prevAnnoucenmentListResponseRef.current = props.getAnnouncementResponse;
            if (refreshing) setAnnoucenmentlist(props.getAnnouncementResponse?.data)
            else setAnnoucenmentlist(prevState => [...prevState, ...props.getAnnouncementResponse?.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getAnnouncementResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetAnnouncementList({ pageno, limit });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetAnnouncementList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (announcementList.length < props.getAnnouncementResponse?.total) {
                console.log('_handleLoadMore ');
                props.GetAnnouncementList({ pageno: pageno + 1, limit });
            }
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 3 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
            //     { useNativeDriver: false }
            // )}
            data={announcementList}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item, index }) => {
                return (<AnnouncementBox key={index} item={item} width={isIPad ? (width / 3) - 17 : (width / 2) - 20} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getAnnouncementResponse: state.listingstate.getAnnouncementResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetAnnouncementList: bindActionCreators(GetAnnouncementList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Announcements);