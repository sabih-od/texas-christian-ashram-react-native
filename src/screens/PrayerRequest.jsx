import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import { useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/Feather';
import { colors, fonts, height, isIPad, width } from '../theme';
import globalstyle from '../theme/style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RequestPrayerApiCall } from '../redux/reducers/ListingApiStateReducer';
import Toast from 'react-native-toast-message';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Loader from '../components/Loader';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import DateTimeModal from '../components/DateTimeModal';

const PrayerRequest = props => {
  const [user, setUser] = useState(props.userInfo);
  const [loading, isLoading] = useState(false);
  const { handleSubmit, formState: { errors }, register, setValue, } = useForm();

  const prevRequestPrayerResRef = useRef(props.requestPrayerResponse);

  useEffect(() => {
    // console.log('props.requestPrayerResponse => ', props.requestPrayerResponse);
    if (props.requestPrayerResponse !== prevRequestPrayerResRef.current && props.requestPrayerResponse.success && props.requestPrayerResponse.data) {
      prevRequestPrayerResRef.current = props.requestPrayerResponse;
      //   props.SetUserInfo(props.requestPrayerResponse.data);
      console.log('props.requestPrayerResponse => ', props.requestPrayerResponse,);
      showToast('success', 'Your request sumitted successfully..');
      props.navigation.navigate('RequestedPrayers');
    }
    isLoading(false);
  }, [props.requestPrayerResponse]);

  const showToast = (type, message) => {
    Toast.show({
      type: type, // Can be 'success', 'error', 'info', or 'none'
      // text1: 'Success',
      text2: message,
      position: 'top', // Can be 'top', 'bottom', or 'center'
      visibilityTime: 3000, // Duration to show the toast message (in milliseconds)
      autoHide: true, // Automatically hide the toast after the duration
      topOffset: 30, // Additional offset from the top/bottom (in pixels)
      // bottomOffset: 40,
    });
  };

  const onSubmit = data => {
    console.log('data => ', data);
    props.RequestPrayerApiCall(data);
    isLoading(true);
  };

  const input01 = useRef();
  const input02 = useRef();
  const input03 = useRef();
  const input04 = useRef();
  // const input05 = useRef();

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');

  const _handleChangeDate = (event, date) => {
    const { type, nativeEvent: { timestamp }, } = event;
    // console.log('type => ', type);
    if (type != 'dismissed') {
      // console.log('date => ', date);
      const momentdate = moment(date).format('DD-MM-YYYY')
      // console.log('momentdate => ', momentdate);
      if (showStartDate) {
        setShowStartDate(false);
        setValue('start_date', momentdate)
        setStartDate(momentdate);
      } else {
        setShowEndDate(false);
        setValue('end_date', momentdate)
        setEndDate(momentdate);
      }
    } else {
      setShowStartDate(false);
      setShowEndDate(false);
    }
  };

  const _handleChangeTime = (event, date) => {
    const { type, nativeEvent: { datestamp }, } = event;
    if (type != 'dismissed') {
      setShowTime(false);
      console.log('date => ', date);
      const momenttime = moment(date).format('HH:mm')
      console.log('momenttime => ', momenttime);
      setValue('time', momenttime)
      setStartTime(momenttime);
    } else {
      setShowTime(false);
    }
  };

  function _handleSetVisible(data) {
    setShowStartDate(false);
    setShowEndDate(false);
    setShowTime(false);
  }

  // console.log('errors => ', errors)

  return (
    <SafeAreaView style={globalstyle.fullview}>
      <Loader isLoading={loading} />
      <ImageBackground source={require('./../../assets/images/background-with-img.png')}
        style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 60 }}
              style={isIPad && globalstyle.authscreencontainer}
            // style={[globalstyle.authContainer, { paddingHorizontal: 15 }]}
            // contentContainerStyle={{justifyContent: 'center',}}
            >
              {/* <ImageBackground source={require('./../../assets/images/background-with-img.png')}
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}> */}
              {/* <ScrollView> */}
              <View
                style={[globalstyle.authLogoContainer, { alignItems: 'flex-start' }]}>
                <Text style={[globalstyle.authheading, { fontSize: 30, marginTop: 10 }]}>Prayer Request </Text>
                <Text style={[globalstyle.authdescription, { fontSize: 15, marginBottom: 10 },]}>Invoking collective prayers in the ashram, seeking divine blessings </Text>
              </View>

              {/* {Platform.OS === 'ios' && <DateTimeModal showDate={showStartDate || showEndDate} showTime={showTime} maxDate={startDate} isStartDate={showStartDate} setVisible={_handleSetVisible} _handleChangeDate={_handleChangeDate} _handleChangeTime={_handleChangeTime} />}

              {(showStartDate || showEndDate) && Platform.OS !== 'ios' && (
                <RNDateTimePicker
                  value={new Date()}
                  dataFormat="day month year"
                  mode="date"
                  display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
                  // display={'spinner'}
                  // minimumDate={new Date()}
                  minimumDate={!showStartDate ? new Date(moment(startDate, "DD-MM-YYYY").format("YYYY"), (moment(startDate, "DD-MM-YYYY").format("MM")-1), moment(startDate, "DD-MM-YYYY").format("DD")) : new Date()}
                  onChange={_handleChangeDate}
                />
              )}
              {showTime && Platform.OS !== 'ios' && (
                <RNDateTimePicker
                  value={new Date()}
                  mode="time"
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
                  // display={'spinner'}
                  onChange={_handleChangeTime}
                />
              )} */}

              <View>
                <View style={globalstyle.inputbox}>
                  <Icon color={colors.green} name={'user'} size={18} />
                  <TextInput
                    style={globalstyle.inputfield}
                    placeholder="Prayer For"
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('name', {
                      // value: user.first_name + ' ' + user.last_name,
                      required: 'Prayer for is required',
                      pattern: {
                        value: /^[A-Za-z\s]+$/i,
                        message: 'Please provide a valid name',
                      },
                    })}
                    //   defaultValue={user.first_name + ' ' + user.last_name}
                    onChangeText={value => setValue('name', value)}
                    ref={input01}
                    returnKeyType="next"
                    onSubmitEditing={() => input02.current.focus()}
                  />
                </View>
                {errors.name && (
                  <Text style={globalstyle.errorField}>{errors.name.message}</Text>
                )}

                <View style={globalstyle.inputbox}>
                  <Icon color={colors.green} name={'mail'} size={18} />
                  <TextInput
                    style={globalstyle.inputfield}
                    placeholder="Email Address"
                    editable={false}
                    placeholderTextColor={colors.placeholdercolor}
                    {...register('email', {
                      value: user.email,
                      required: 'Email Address is required',
                      pattern: {
                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        message: 'Please provide valid email',
                      },
                    })}
                    defaultValue={user.email}
                    onChangeText={value => setValue('email', value)}
                    autoCapitalize="none"
                    ref={input02}
                    returnKeyType="next"
                    onSubmitEditing={() => input03.current.focus()}
                  />
                </View>
                {errors.email && (
                  <Text style={globalstyle.errorField}>{errors.email.message}</Text>
                )}

                <View style={globalstyle.inputbox}>
                  <Icon color={colors.green} name={'phone'} size={18} />
                  <TextInput
                    style={globalstyle.inputfield}
                    placeholder="Contact"
                    placeholderTextColor={colors.placeholdercolor}
                    // keyboardType='phone-pad'
                    keyboardType="numeric"
                    {...register('contact', {
                      value: user.phone,
                      required: 'Contact is required',
                      pattern: {
                        value: /[0-9+]$/i,
                        message: 'Please provide valid contact number',
                      },
                    })}
                    defaultValue={user.phone}
                    onChangeText={value => setValue('contact', value)}
                    ref={input03}
                    returnKeyType="next"
                    onSubmitEditing={() => input04.current.focus()}
                  />
                </View>
                {errors.contact && (
                  <Text style={globalstyle.errorField}>{errors.contact.message}</Text>
                )}

                {/* <View style={globalstyle.inputbox}>
                  <Icon color={colors.green} name={'calendar'} size={18} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setShowStartDate(true)}
                    style={{ width: '45%', paddingVertical: 5 }}>
                    <Text style={globalstyle.inputfield}>{startDate != '' ? startDate : 'Start Date'}</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[globalstyle.inputfield, { width: '45%', display: 'none' }]}
                    placeholder="Start Date"
                    placeholderTextColor={colors.placeholdercolor}
                    // keyboardType='phone-pad'
                    // keyboardType='numeric'
                    {...register('start_date', {
                      value: startDate,
                      required: 'Start date is required',
                      // pattern: {
                      //     value: /[0-9+]$/i,
                      //     message: "Please provide valid contact number"
                      // },
                    })}
                    defaultValue={startDate}
                    // onFocus={() => setShowStartDate(true)}
                    onChangeText={value => setValue('start_date', value)}
                    ref={input03}
                    returnKeyType="next"
                    onSubmitEditing={() => input04.current.focus()}
                  />
                  <Icon color={colors.green} name={'calendar'} size={18} />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      if (startDate == '') {
                        showToast('error', 'Please select start date first');
                      } else {
                        setShowEndDate(true)
                      }
                    }}
                    style={{ width: '45%', paddingVertical: 5 }}>
                    <Text style={globalstyle.inputfield}>{endDate != '' ? endDate : 'End Date'}</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[globalstyle.inputfield, { width: '45%', display: 'none' }]}
                    placeholder="End Date"
                    placeholderTextColor={colors.placeholdercolor}
                    // keyboardType='phone-pad'
                    keyboardType="numeric"
                    {...register('end_date', {
                      value: endDate,
                      required: 'End date is required',
                      // pattern: {
                      //     value: /[0-9+]$/i,
                      //     message: "Please provide valid contact number"
                      // },
                    })}
                    defaultValue={endDate}
                    // onFocus={() => setShowEndDate(true)}
                    onChangeText={value => setValue('end_date', value)}
                    ref={input03}
                    returnKeyType="next"
                    onSubmitEditing={() => input04.current.focus()}
                  />
                </View>
                {(errors?.start_date || errors?.end_date) && (<Text style={globalstyle.errorField}> {errors?.start_date?.message} {errors?.end_date?.message} </Text>)} */}

                {/* <View
                  style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon color={colors.green} name={'clock'} size={18} />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => setShowTime(true)}
                      style={{ width: '100%', paddingVertical: 5 }}>
                      <Text style={globalstyle.inputfield}>{startTime != '' ? startTime : 'Select Time'}</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={[globalstyle.inputfield, { flex: 0.8, display: 'none' }]}
                      placeholder="Time"
                      placeholderTextColor={colors.placeholdercolor}
                      {...register('time', {
                        value: startTime,
                        required: 'Time is required',
                      })}
                      defaultValue={startTime}
                      // onFocus={() => setShowTime(true)}
                      onChangeText={value => setValue('time', value)}
                      ref={input04}
                    // returnKeyType="next"
                    // onSubmitEditing={() => input05.current.focus()}
                    />
                  </View>
                </View>
                {errors?.time && (<Text style={globalstyle.errorField}>{errors?.time?.message}</Text>)} */}

                <View style={[globalstyle.inputbox, { justifyContent: 'space-between', },]}>
                  <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: width }}>
                    <Icon
                      color={colors.green}
                      name={'lock'}
                      size={18}
                      style={{ marginTop: 15 }}
                    />
                    <TextInput
                      style={[globalstyle.inputfield, { flex: 0.8, textAlignVertical: 'top', paddingTop: 17 },]}
                      placeholder="Prayer Request"
                      placeholderTextColor={colors.placeholdercolor}
                      {...register('description', {
                        // value: 'This is the description for prayer request',
                        required: 'Prayer Request is required',
                        // minLength: { value: 20, message: 'description length must be greater then 20 characters', },
                      })}
                      multiline={true}
                      // numberOfLines={6}
                      numberOfLines={Platform.OS === 'ios' ? null : 6}
                      minHeight={(Platform.OS === 'ios' && 6) ? (20 * 6) : null}
                      // defaultValue={'This is the description for prayer request'}
                      // inputRef={description.ref}
                      onChangeText={value => setValue('description', value)}
                      ref={input04}
                    // returnKeyType="next"
                    // onSubmitEditing={() => input05.current.focus()}
                    />
                  </View>
                </View>
                {errors.description && (<Text style={globalstyle.errorField}> {errors.description.message} </Text>)}
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleSubmit(onSubmit)}
                  style={globalstyle.authSubmitButton}>
                  <Text style={globalstyle.authSubmitButtonText}>Submit Now</Text>
                </TouchableOpacity>
              </View>

              <View style={{ paddingBottom: 30 }} />
              {/* </ScrollView> */}
              {/* </ImageBackground> */}
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const setStateToProps = state => ({
  userInfo: state.appstate.userInfo,
  requestPrayerResponse: state.listingstate.requestPrayerResponse,
});

const mapDispatchToProps = dispatch => {
  return {
    RequestPrayerApiCall: bindActionCreators(RequestPrayerApiCall, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(PrayerRequest);

const styles = StyleSheet.create({
});
