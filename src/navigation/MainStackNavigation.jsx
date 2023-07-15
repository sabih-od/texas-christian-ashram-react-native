import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, useColorScheme, StyleSheet, Keyboard } from "react-native";

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigationContainerRef, DefaultTheme, DarkTheme, DrawerActions } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, interpolateNode, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Icon from 'react-native-vector-icons/Feather';
import { colors, fontcolor, fonts, height, width } from "../theme";
import { createDrawerNavigator, useDrawerProgress, useDrawerStatus } from "@react-navigation/drawer";

/* Screens */
import Home from "../screens/Home";
import Contact from "../screens/Contact";
import Announcements from "../screens/Announcements";
import Events from "../screens/Events";
import About from "../screens/About";
import Books from "../screens/Books";
import Conversation from "../screens/GroupChat/Conversation";
import Notifications from "../screens/Notifications";
import PaymentMethod from "../screens/PaymentMethod";
import Posts from "../screens/Posts";
import Sermons from "../screens/Sermons";

/* Components */
import RequestedPrayers from "../screens/RequestedPrayers";
import PrayerRequest from "../screens/PrayerRequest";
import Profile from "../screens/Profile/Profile";
import Donation from "../screens/Donation";
import OurSpeakers from "../screens/OurSpeakers";
import OurStaff from "../screens/OurStaff";
import { store } from "../redux/store";
import UpcomingEvents from "../screens/UpcomingEvents";
import PdfView from "../screens/PdfView";
import ChatGroups from "../screens/GroupChat/ChatGroups";

import AnnouncementDetail from "../screens/Detail/AnnouncementDetail";
import EventDetail from "../screens/Detail/EventDetail";
import PostDetail from "../screens/Detail/PostDetail";
import OurSpeakerDetail from "../screens/Detail/OurSpeakerDetail";
import OurStaffDetail from "../screens/Detail/OurStaffDetail";
import SermonsDetail from "../screens/Detail/SermonsDetail";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EditProfile from "../screens/Profile/EditProfile";
import GoBackIcon from "../components/header/GoBackIcon";

import DrawerIcon from "../components/header/DrawerIcon";
import NotificationIcon from "../components/header/NotificationIcon";

const Stack = createStackNavigator();

// const DrawerIcon = (props) => {
//     return (<TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() => {
//             console.log('props.navigation => ', props.navigation);
//             Keyboard.dismiss();
//             props.navigation.openDrawer();
//         }}
//         style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
//         <Icon name={'align-right'} size={22} color={fontcolor} />
//     </TouchableOpacity >)
// }

// const GoBackIcon = (props) => {
//     return (<TouchableOpacity
//         activeOpacity={0.8}
//         onPress={() => {
//             // props.navigation.navigate(props.screen ? props.screen : 'Home')
//             props.navigation.goBack()
//         }}
//         style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
//         <Icon name={'chevron-left'} size={22} color={props.color ? props.color : colors.white} />
//     </TouchableOpacity >)
// }

// const NotificationIcon = (props) => {
//     // const state = store.getState();
//     // console.log('state.appstate.notificationBadge => ', state.appstate.notificationBadge);
//     // useEffect(()=>{
//     // },[state.appstate.notificationBadge])
//     return (
//         <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => {
//                 console.log('Notifications Clicked');
//                 props.navigation.navigate('Notifications');
//             }}
//             style={styles.notibadge}>
//             <Icon name={'bell'} size={20} color={colors.black} />
//             {/* {state.appstate.notificationBadge > 0 && <View style={styles.badge}></View>} */}
//             {props.notificationBadge > 0 && <View style={styles.badge}></View>}
//         </TouchableOpacity>
//     )
// }

const MainStackNavigation = ({ navigation, style, notificationBadge }) => {

    const drawerProgress = useDrawerProgress();
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 15], {
            extrapolateRight: Extrapolate.CLAMP,
        });
        return {
            overflow: 'hidden',
            transform: [{ scale }],
            borderRadius,
        };
    });

    return <Animated.View style={[styles.stack, animatedStyle]}>
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                    // headerTransparent: true,
                    // headerStyle: { height: 120 },
                    // headerTitle: () => <SearchHeader />,
                    // headerLeft: () => <TouchableOpacity style={{ backgroundColor: '#ddd', padding: 10 }} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()); }} activeOpacity={0.8}>
                    //     <Icon name={'align-right'} size={22} color={colors.black} />
                    // </TouchableOpacity>,
                    // headerRight: () => (<TouchableOpacity>
                    //     <Icon name={'bell'} size={18} color={colors.black} />
                    // </TouchableOpacity>)
                }}
            />
            <Stack.Screen
                name="Announcements"
                component={Announcements}
                options={{
                    headerTitle: 'Announcements',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerTitle: '',
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,                    
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

            <Stack.Screen
                name="PdfView"
                component={PdfView}
                options={{
                    headerTitle: '',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont, textTransform: 'capitalize' },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'Books'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="About"
                component={About}
                options={{
                    headerTitle: 'About',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="ChatGroups"
                component={ChatGroups}
                options={{
                    headerTitle: 'Groups',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Conversation"
                component={Conversation}
                options={{
                    headerTitle: 'Conversation',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'ChatGroups'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="OurSpeakers"
                component={OurSpeakers}
                options={{
                    headerTitle: 'Our Speakers',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="OurSpeakerDetail"
                component={OurSpeakerDetail}
                options={{
                    headerTitle: 'Our Speaker',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="OurStaff"
                component={OurStaff}
                options={{
                    headerTitle: 'Our Staff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="OurStaffDetail"
                component={OurStaffDetail}
                options={{
                    headerTitle: 'Our Staff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Contact"
                component={Contact}
                // options={{
                //     headerLeft: () => <GoBackIcon navigation={navigation} />,
                //     headerTitle: '',
                //     headerTransparent: true
                // }}
                options={{
                    headerTransparent: true,
                    // headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerTitle: '',
                    // // headerShown: false,
                    // headerTitle: 'Contact Us',
                    // headerTitleStyle: { fontFamily: fonts.headingFont },
                    // // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PrayerRequest"
                component={PrayerRequest}
                // options={{ headerShown: false }}
                options={{
                    headerTransparent: true,
                    headerLeft: () => <GoBackIcon navigation={navigation} />,
                    headerTitle: '',
                    // headerTitle: 'Prayer Request',
                    // headerTitleStyle: { fontFamily: fonts.headingFont },
                    // // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    // headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Posts"
                component={Posts}
                options={{
                    headerTitle: 'Posts',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Books"
                component={Books}
                options={{
                    headerTitle: 'Books',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="RequestedPrayers"
                component={RequestedPrayers}
                options={{
                    headerTitle: 'Requested Prayers',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: 'Notifications',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Events"
                component={Events}
                options={{
                    headerTitle: 'Events',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="UpcomingEvents"
                component={UpcomingEvents}
                options={{
                    headerTitle: 'Upcoming Events',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{
                    headerTitle: 'PaymentMethod',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Donation"
                component={Donation}
                options={{
                    headerTitle: 'Donation',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="PostDetail"
                component={PostDetail}
                options={{
                    headerTitle: 'Post Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'Announcements'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="AnnouncementDetail"
                component={AnnouncementDetail}
                options={{
                    headerTitle: 'Announcement',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black} screen={'Announcements'} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="EventDetail"
                component={EventDetail}
                options={{
                    headerTitle: 'Event Detail',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    // headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black}
                    // screen={'Events'} 
                    />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="Sermons"
                component={Sermons}
                options={{
                    headerTitle: 'Messages',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <DrawerIcon navigation={navigation} />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />
            <Stack.Screen
                name="SermonsDetail"
                component={SermonsDetail}
                options={{
                    headerTitle: 'Sermons',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontFamily: fonts.headingFont },
                    // headerLeft: () => <><GoBackIcon navigation={navigation} /><DrawerIcon navigation={navigation} /></>,
                    headerLeft: () => <GoBackIcon navigation={navigation} color={colors.black}
                    //screen={'Sermons'} 
                    />,
                    headerRight: () => <NotificationIcon navigation={navigation} />
                }}
            />

        </Stack.Navigator>
    </Animated.View>
}

// const setStateToProps = (state) => ({
//     notificationBadge: state.appstate.notificationBadge
// })
// const mapDispatchToProps = (dispatch) => {
//     return {
//         //   LogOut: bindActionCreators(LogOut, dispatch),
//     }
// }
// export default connect(setStateToProps, mapDispatchToProps)(MainStackNavigation);

export default MainStackNavigation;

const styles = StyleSheet.create({
    stack: { flex: 1 },
    drawerStyles: { flex: 1, width: '70%' },
    badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
    notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
});