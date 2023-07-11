import React, { useCallback, useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';


import { colors, fonts } from '../theme';
import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { DrawerContentScrollView, useDrawerProgress } from '@react-navigation/drawer';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LogOut, SetUserInfo, UpdateFcmToken, UpdateNotificationBadge } from '../redux/reducers/AppStateReducer';
import DrawerItem from '../components/drawer/DrawerItem';
import globalstyle from '../theme/style';

import { fcmService } from '../helpers/firebase/FCMService';
import { localNotificationService } from '../helpers/firebase/LocalNotificationService';
import messaging from '@react-native-firebase/messaging';
import { GetProfileApiCall } from '../redux/reducers/AuthReducer';

import { connectSocket, getSocket } from '../helpers/socket-manager';
import { useAppState } from '../hooks/useAppState';

const DrawerContent = (props) => {

  // const appState = useAppState();
  // console.log('appState status => ', appState);

  useEffect(() => {

    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    
    function onRegister(token) {
      console.log('onRegister => ', token);
      if (props.fcmToken == '' || props.fcmToken != token) {
        props.UpdateFcmToken(token);
      }
    }

    const topic = 'test';
    messaging().subscribeToTopic(topic).then(() => console.log("Subscribed to topic:", topic)).catch((e) => {
      console.log(e);
    });


    function onNotification(notify) {
      console.log('onNotification => ', notify);
      const options = { soundName: 'default', };
      // localNotificationService.showNotification(0, notify.notification.title, notify.notification.body, notify, options,);
      // props.UpdateNotificationBadge(props.notificationBadge + 1);
      // if (notify.data.rideid) {
      //   props.navigation.navigate('Map', { rideid: notify?.data?.rideid });
      // }
    }

    function onOpenNotification(notify) {
      console.log('onOpenNotification => ', notify);
      if (props.isLogin && Object.keys(notify).length > 0) {
        props.navigation.navigate('Notifications')
      }
    }

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      props.UpdateNotificationBadge(props.notificationBadge + 1);
      const notify = remoteMessage
      // const options = { soundName: 'default', };
      // localNotificationService.showNotification(0, notify.notification.title, notify.notification.body, notify, options,);
      // console.log('notify.rideid => ', notify.rideid);
    });

    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
      unsubscribe;
    };

  }, []);

  useEffect(() => {
    connectSocket();
  }, []);

  const [user, setUser] = useState(props.userInfo)

  useEffect(() => {
    console.log('Drawer props.userInfo => ', props.userInfo);
    setUser(props.userInfo);
  }, [props.userInfo])

  useEffect(() => {
    if (props.isLogin) {
      props.GetProfileApiCall();
    }
  }, [])

  const prevUserProfileResRef = useRef(props.getUserProfileResponse?.data);

  useEffect(() => {
    if (props.isLogin && props.getUserProfileResponse !== prevUserProfileResRef.current && props.getUserProfileResponse?.success && props.getUserProfileResponse?.data) {
      prevUserProfileResRef.current = props.getUserProfileResponse?.data;
      console.log('props.getUserProfileResponse => ', props.getUserProfileResponse);
      let userdata = props.getUserProfileResponse?.data;
      props.SetUserInfo({
        ...props.userInfo,
        email: userdata?.email,
        first_name: userdata?.first_name,
        last_name: userdata?.last_name,
        phone: userdata?.phone,
        profile_picture: userdata?.profile_picture
      });
    }
  }, [props.getUserProfileResponse])

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
    { title: 'Chat Groups', nav: 'ChatGroups', icon: 'home', isActive: false },
    { title: 'Profile', nav: 'Profile', icon: 'home', isActive: false },
    { title: 'Announcements', nav: 'Announcements', icon: 'home', isActive: false },
    { title: 'Prayer Request', nav: 'PrayerRequest', icon: 'home', isActive: false },
    { title: 'Requested Prayers', nav: 'RequestedPrayers', icon: 'home', isActive: false },
    { title: 'Posts', nav: 'Posts', icon: 'home', isActive: false },
    { title: 'Contact Us', nav: 'Contact', icon: 'home', isActive: false },
  ]

  return (
    <>
      {user &&
        <View style={{ backgroundColor: colors.black, paddingBottom: 30, paddingTop: Platform.OS === 'ios' ? 60 : 30, }}>
          {/* <TouchableOpacity onPress={() => { props.navigation.closeDrawer() }} activeOpacity={0.8}>
          <Icon name={'x'} color={colors.white} size={16} />
        </TouchableOpacity> */}
          <TouchableOpacity activeOpacity={0.8} onPress={() => {
            props.navigation.navigate('Profile')
          }} style={{
            width: 90, height: 90, borderRadius: 90, overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto', marginBottom: 10,
            // borderColor: colors.white, borderWidth: 1, 
          }}>
            <Image source={user?.profile_picture ? { uri: user?.profile_picture } : require('./../../assets/images/dummy-profile-image.png')} style={{ width: 90, height: 90, resizeMode: 'cover', }} />
          </TouchableOpacity>
          <Text style={{ fontFamily: fonts.latoBold, color: colors.white, textAlign: 'center', fontSize: 20, marginBottom: 8 }}>{`${user?.first_name} ${user?.last_name}`}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Icon name={'mail'} style={{ color: colors.orange, fontSize: 16, marginRight: 10, marginBottom: -4 }} /><Text style={{ fontFamily: fonts.latoRegular, color: colors.white, textAlign: 'center', fontSize: 13 }}>{user?.email}</Text></View>
          {/* <Text style={{ fontFamily: fonts.latoRegular, color: colors.white, textAlign: 'center', fontSize: 12 }}>{user?.phone}</Text> */}
        </View>
      }
      <DrawerContentScrollView {...props} style={[styles.sidebar,]} contentContainerStyle={{ paddingTop: 0 }}>
        {/* <View> */}
        {draweritems.map((item, index) => <DrawerItem key={index} item={item} navigation={props.navigation} activescreen={props.currentScreen} />)}
        <View style={{ height: 10 }} />
        {/* {!user && <TouchableOpacity activeOpacity={0.8} onPress={() => { props.navigation.navigate('Login') }} style={{ flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#ffffff09' }}>
          <Icon name="key" style={{ color: colors.white, marginRight: 15 }} size={16} />
          <Text style={{ fontFamily: fonts.latoRegular, color: colors.white }}>Login</Text>
        </TouchableOpacity>} */}
        {/* </View> */}
      </DrawerContentScrollView>
      {user && <View style={{ backgroundColor: colors.black }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => {
          // logout(props.navigation) 
          props.LogOut();
          // props.navigation.navigate('Login');
          // props.navigation.reset({ index: 0, routes: [{ name: 'AuthScreens' }] })
        }}
          style={styles.logoutitem}>
          <Icon name="log-out" style={{ color: colors.white, marginRight: 15 }} size={16} />
          <Text style={globalstyle.draweritemtext}>Logout</Text>
        </TouchableOpacity>
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: colors.black,
    //flex: 1 
  },
  logoutitem: { flexDirection: 'row', paddingHorizontal: 30, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#ffffff09', backgroundColor: colors.orange, borderTopRightRadius: 30 }
})

const setStateToProps = (state) => ({
  currentScreen: state.appstate.currentScreen,
  fcmToken: state.appstate.fcmToken,
  notificationBadge: state.appstate.notificationBadge,
  userInfo: state.appstate.userInfo,
  isLogin: state.appstate.isLogin,
  getUserProfileResponse: state.authstate.getUserProfileResponse,
})

const mapDispatchToProps = (dispatch) => {
  return {
    LogOut: bindActionCreators(LogOut, dispatch),
    UpdateFcmToken: bindActionCreators(UpdateFcmToken, dispatch),
    UpdateNotificationBadge: bindActionCreators(UpdateNotificationBadge, dispatch),
    GetProfileApiCall: bindActionCreators(GetProfileApiCall, dispatch),
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
  }
}

export default connect(setStateToProps, mapDispatchToProps)(DrawerContent);

