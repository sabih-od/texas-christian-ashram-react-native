import React, { Fragment, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, Image, StyleSheet, TouchableOpacity, BackHandler, Alert, RefreshControl } from "react-native";
import { IOS, colors, fonts, height, isIPad, width } from "./../theme";

import Icon from 'react-native-vector-icons/Feather';
import HomeSlideBox from "../components/HomeSlideBox";
import SectionHeading from "../components/SectionHeading";
import EventScheduleBox from "../components/EventScheduleBox";
import UpComingEventBox from "../components/UpComingEventBox";
import OurSpeakerBox from "../components/OurSpeakerBox";
import PostBox from "../components/PostBox";
import OurStaffBox from "../components/OurStaffBox";
import homeslider from "../data/homeslider";
import store from "../redux/store";

import eventlist from "./../data/eventlist";
import ourspeakers from "../data/ourspeakers";
import ourstaff from "../data/ourstaff";
import postslist from "../data/postslist";
import homemessages from "../data/homemessages";

import Toast from 'react-native-toast-message';

import Seperator from '../components/Seperator'
import { GetEventsList, GetHomeBanner, GetOurSpeakerList, GetOurStaffList, GetPostsList, GetSermonsList, GetUpcomingEventsList } from "../redux/reducers/ListingApiStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useEvents, useHomeBanner, usePosts, useSermons, useSpeaker, useStaff, useUpcomingEvents } from "../hooks/useEventsResponse";
import SermonsBox from "../components/SermonsBox";
import ChatIcon from "../components/ChatIcon";
// import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import EventsSkeleton from './../components/skeleton/EventsSkeleton';
import HomeSliderSkeleton from './../components/skeleton/HomeSliderSkeletion';


import { useCallback } from "react";
import RequestAdditionalInformation from "../components/RequestAdditionalInformation";
import axios from "axios";
import EventsTable from "../components/EventsTable";

const PAGINATION_LIMIT = 6;
const Home = (props) => {

    const [year, setyear] = useState();

    useEffect(() => {
        const d = new Date();
        let thisyear = d.getFullYear();
        setyear(thisyear);
    }, [])

    // useEffect(()=> {
    //     props.getUserProfileResponse
    // },[props.getUserProfileResponse])

    useEffect(() => {

        // if (!IOS) {
        //     axios.defaults.headers.common['Authorization'] = `Bearer 1656|35uwDzTjVDwexmX0Om94BtA9VPUKPHo2etdpGSUV`
        //     axios.request({ url: 'https://hunterssocial.com/api/user', method: 'GET' })
        //         .then(function (response) {
        //             console.log('response hunter => ', response);
        //             props.GetEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetUpcomingEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetPostsList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetSermonsList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetOurSpeakerList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetOurStaffList({ pageno: 1, limit: PAGINATION_LIMIT });
        //             props.GetHomeBanner();
        //         })
        //         .catch(function (error) { console.log(error); });
        // }

        props.GetEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetUpcomingEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetPostsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetSermonsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetOurSpeakerList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetOurStaffList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetHomeBanner();
    }, [])

    const eventList = useEvents(props.getEventsListResponse);
    // console.log('eventList Home => ', eventList);

    // const upcomingEventList = useUpcomingEvents(props.getUpcomingEventsListResponse);
    // console.log('eventList Home => ', eventList);

    const postList = usePosts(props.getPostsListResponse);
    // console.log('postList Home => ', postList);

    const sermonsList = useSermons(props.getSermonsListResponse);
    // console.log('sermonsList Home => ', sermonsList);

    const ourSpeakersList = useSpeaker(props.getOurSpeakersListResponse);
    // console.log('useSpeaker Home => ', ourSpeakersList);

    const ourStaffList = useStaff(props.getOurStaffListResponse);
    // console.log('useStaff Home => ', ourStaffList);

    const homeBannerList = useHomeBanner(props.getHomeBannerResponse);
    // console.log('useHomeBanner Home => ', homeBannerList);

    const draweritems = [
        { title: 'Home', nav: 'Home', icon: 'home', isActive: true },
        { title: 'About Us', nav: 'About', icon: 'home', isActive: false },
        { title: 'Books', nav: 'Books', icon: 'home', isActive: false },
        { title: 'Events', nav: 'Events', icon: 'home', isActive: false },
        { title: 'Upcoming Events', nav: 'UpcomingEvents', icon: 'home', isActive: false },
        { title: 'Our Speakers', nav: 'OurSpeakers', icon: 'home', isActive: false },
        { title: 'Our Staff', nav: 'OurStaff', icon: 'home', isActive: false },
        { title: 'Messages', nav: 'Sermons', icon: 'home', isActive: false },
        { title: 'Donation', nav: 'Donation', icon: 'home', isActive: false },
        { title: 'Chat Module', nav: 'Conversation', icon: 'home', isActive: false },
        // { title: 'Notifications', nav: 'Notifications', icon: 'home', isActive: false },
        { title: 'Announcements', nav: 'Announcements', icon: 'home', isActive: false },
        { title: 'Prayer Request', nav: 'PrayerRequest', icon: 'home', isActive: false },
        { title: 'Requested Prayers', nav: 'RequestedPrayers', icon: 'home', isActive: false },
        { title: 'Posts', nav: 'Posts', icon: 'home', isActive: false },
        { title: 'Contact Us', nav: 'Contact', icon: 'home', isActive: false },
        { title: 'Profile', nav: 'Profile', icon: 'home', isActive: false },
        { title: 'Groups', nav: 'Groups', icon: 'home', isActive: false },
        // { title: 'PdfView', nav: 'PdfView', icon: 'home', isActive: false },

    ]

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        props.GetEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        // props.GetUpcomingEventsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetPostsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetSermonsList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetOurSpeakerList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetOurStaffList({ pageno: 1, limit: PAGINATION_LIMIT });
        props.GetHomeBanner();

        // props.GetSermonsDetailApiCall(item.id)
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    return (
        <SafeAreaView>
            <ChatIcon navigation={props.navigation} />
            <ScrollView style={{ padding: 15 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* {draweritems.map((item, index) => <TouchableOpacity onPress={() => props.navigation.navigate(item.nav)}><Text>{item.title}</Text></TouchableOpacity>)} */}
                <FlatList
                    style={{ marginLeft: -5 }}
                    horizontal
                    snapToInterval={width - 20}
                    scrollEnabled
                    scrollEventThrottle={26}
                    pagingEnabled={true}
                    // columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    // refreshing={refreshing}
                    // onRefresh={_handleRefresh}
                    data={homeBannerList}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => <HomeSlideBox key={index} item={item} width={(width / 2) - 20} navigation={props.navigation} />}
                />
                {(homeBannerList.length == 0) &&
                    // <Image source={require('./../../assets/images/home-slider-placeholder.png')} style={{ height: 250, borderRadius: 10, overflow: 'hidden', width: width - 30, marginBottom: 15 }} />
                    <HomeSliderSkeleton />
                }

                {/* <Seperator /> */}

                {(eventList.length > 0) &&
                    <>
                        <SectionHeading title={`${year} Event Schedule`} viewall={'Events'} />
                        <EventsTable list={eventList} width={width - 30} />
                        {/* <FlatList
                            // style={{ padding: 15 }}
                            horizontal
                            // snapToInterval={width / 2}
                            // scrollEnabled
                            // scrollEventThrottle={16}
                            // columnWrapperStyle={{ justifyContent: 'space-between' }}
                            // numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            //     { useNativeDriver: false }
                            // )}
                            // refreshing={refreshing}
                            // onRefresh={_handleRefresh}
                            data={eventList}
                            // data={eventlist}
                            keyExtractor={(item, index) => String(index)}
                            ItemSeparatorComponent={() => <View style={{ height: "100%", width: 10, }} />}
                            renderItem={({ item, index }) =>
                                <EventScheduleBox key={index} item={item} width={isIPad ? (width / 3) - 17 : (width / 2) - 20} navigation={props.navigation} />
                            }
                        /> */}
                    </>
                }
                <View style={{ marginTop: 30 }} />

                {/* {(eventList.length == 0) && <View style={[styles.flexrow, { marginBottom: 20 }]}>
                    <EventsSkeleton />
                    <EventsSkeleton />
                </View>} */}

                {/* <View style={styles.flexrow}>
                    <EventScheduleBox navigation={props.navigation} />
                    <EventScheduleBox navigation={props.navigation} />
                </View> */}

                <ImageBackground source={require('./../../assets/images/home-prayer-request.png')} resizeMode="cover"
                    style={{ width: width - 30, borderRadius: 10, overflow: 'hidden', alignItems: 'center', paddingVertical: 30, position: 'relative' }}
                >
                    <View style={{ backgroundColor: colors.black, opacity: 0.7, width: '100%', height: 200, zIndex: 0, left: 0, top: 0, position: 'absolute', }} />
                    <Text style={{ fontFamily: fonts.headingFont, color: colors.white, textAlign: 'center', fontSize: 22, marginBottom: 15, lineHeight: 32 }}>Submit Your Prayer Request</Text>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{ padding: 8, backgroundColor: colors.orange, width: 150, borderRadius: 10, }}
                        onPress={() => props.navigation.navigate('PrayerRequest')}
                    >
                        <Text style={{ fontFamily: fonts.latoBold, color: colors.white, textAlign: 'center', textTransform: 'uppercase', fontSize: 14 }}>Submit Now</Text>
                    </TouchableOpacity>
                </ImageBackground>

                {/* <Seperator /> */}

                {/* <SectionHeading title="Upcoming Events" />
                {(upcomingEventList.length == 0) && <View style={[styles.flexrow, { marginBottom: 20 }]}>
                    <EventsSkeleton />
                    <EventsSkeleton />
                </View>} */}

                {/* {(upcomingEventList.length != 0) &&
                    <><SectionHeading title="Upcoming Events" />
                        <FlatList
                            // style={{ padding: 15 }}
                            horizontal
                            // snapToInterval={width / 2}
                            // scrollEnabled
                            // scrollEventThrottle={16}
                            // columnWrapperStyle={{ justifyContent: 'space-between' }}
                            // numColumns={2}
                            showsHorizontalScrollIndicator={false}
                            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            //     { useNativeDriver: false }
                            // )}
                            // refreshing={refreshing}
                            // onRefresh={_handleRefresh}
                            data={upcomingEventList}
                            // data={eventlist}
                            keyExtractor={(item, index) => String(index)}
                            ItemSeparatorComponent={() => <View style={{ height: "100%", width: 10, }} />}
                            renderItem={({ item, index }) => {
                                return (<UpComingEventBox key={index} item={item} width={isIPad ? (width / 4) - 20 : (width / 2) - 20} navigation={props.navigation} />)
                            }}
                        />
                    </>} */}

                {ourSpeakersList.length > 0 && <>
                    <SectionHeading title="Our Speakers" />
                    {ourSpeakersList.map((item, index) =>
                        <OurSpeakerBox key={index} item={item} navigation={props.navigation} />
                    )}
                </>}

                {/* <Seperator /> */}
                {/* <View style={{ height: 1, width: '100%', backgroundColor: '#ddd', marginTop: 10 }} /> */}

                <SectionHeading title="Posts" />
                {(postList.length == 0) && <View style={[styles.flexrow, { marginBottom: 20 }]}>
                    <EventsSkeleton />
                    <EventsSkeleton />
                    <EventsSkeleton />
                    <EventsSkeleton />
                </View>}
                <View style={[styles.flexrow, { flexWrap: 'wrap', width: width - 20 }]}>
                    {postList.map((item, index) =>
                        index < (isIPad ? 3 : 4) &&
                        <Fragment key={index}>
                            <PostBox item={item} width={isIPad ? (width / 3) - 17 : (width / 2) - 20} navigation={props.navigation} marginfalse={true} />
                            <View style={{ width: 10, }} />
                        </Fragment>
                    )}
                </View>

                {/* <Seperator /> */}

                {ourStaffList.length > 0 && <><SectionHeading title="Our Staff" />
                    {ourStaffList.map((item, index) =>
                        <OurStaffBox key={index} item={item} navigation={props.navigation} />
                    )}
                </>}

                {/* <Seperator /> */}

                <SectionHeading title="Messages" />
                {(sermonsList.length == 0) && <View style={[styles.flexrow, { marginBottom: 20 }]}>
                    <EventsSkeleton />
                    <EventsSkeleton />
                </View>}
                <FlatList
                    // style={{ padding: 15 }}
                    horizontal
                    // snapToInterval={width / 2}
                    // scrollEnabled
                    // scrollEventThrottle={16}
                    // columnWrapperStyle={{ justifyContent: 'space-between' }}
                    // numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    // onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    //     { useNativeDriver: false }
                    // )}
                    // refreshing={refreshing}
                    // onRefresh={_handleRefresh}
                    data={sermonsList}
                    keyExtractor={(item, index) => String(index)}
                    ItemSeparatorComponent={() => <View style={{ height: "100%", width: 10, }} />}
                    renderItem={({ item, index }) => {
                        return (<SermonsBox key={index} item={item} width={isIPad ? (width / 3) - 17 : (width / 2) - 20} marginfalse={true} navigation={props.navigation} />)
                    }}
                />

                {/* <Seperator /> */}

                <View style={{ height: 20 }} />

                <RequestAdditionalInformation navigation={props.navigation} />

                <View style={{ height: 30 }} />
            </ScrollView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    // getUpcomingEventsListResponse: state.listingstate.getUpcomingEventsListResponse,
    getEventsListResponse: state.listingstate.getEventsListResponse,
    getOurSpeakersListResponse: state.listingstate.getOurSpeakersListResponse,
    getOurStaffListResponse: state.listingstate.getOurStaffListResponse,
    getPostsListResponse: state.listingstate.getPostsListResponse,
    getSermonsListResponse: state.listingstate.getSermonsListResponse,
    getHomeBannerResponse: state.listingstate.getHomeBannerResponse,
    // getUserProfileResponse: state.authstate.getUserProfileResponse,
})

const mapDispatchToProps = (dispatch) => {
    return {
        // GetUpcomingEventsList: bindActionCreators(GetUpcomingEventsList, dispatch),
        GetEventsList: bindActionCreators(GetEventsList, dispatch),
        GetOurSpeakerList: bindActionCreators(GetOurSpeakerList, dispatch),
        GetOurStaffList: bindActionCreators(GetOurStaffList, dispatch),
        GetPostsList: bindActionCreators(GetPostsList, dispatch),
        GetSermonsList: bindActionCreators(GetSermonsList, dispatch),
        GetHomeBanner: bindActionCreators(GetHomeBanner, dispatch),
        // GetProfileApiCall: bindActionCreators(GetProfileApiCall, dispatch),
        // SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    flexrow: { flexDirection: 'row', justifyContent: 'space-between' },
})