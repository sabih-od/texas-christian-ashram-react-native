import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

import { useForm } from 'react-hook-form';
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, isIPad } from "../theme";
import globalstyle from "../theme/style";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ContactApiCall } from "../redux/reducers/ListingApiStateReducer";

import { showToast } from "../helpers/toastConfig";
import Loader from "../components/Loader";

const Contact = (props) => {

    const [user, setUser] = useState(props.userInfo);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue, reset, resetField } = useForm();

    const prevContactResRef = useRef(props.contactResponse);

    useEffect(() => {
        if (props.contactResponse !== prevContactResRef.current && props.contactResponse.success && props.contactResponse.data) {
            prevContactResRef.current = props.contactResponse;
            console.log('props.contactResponse => ', props.contactResponse,);
            // reset({ message: '', company: '' })
            // resetField('message');
            // resetField('company');
            showToast('success', 'Your message sumitted successfully');
        }
        isLoading(false);
    }, [props.contactResponse]);

    const onSubmit = data => {
        console.log('data => ', data);
        props.ContactApiCall(data);
        isLoading(true);
    };

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        <ImageBackground source={require('./../../assets/images/background-with-img.png')}
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        style={isIPad && globalstyle.authscreencontainer}
                    // style={[globalstyle.authContainer, { paddingHorizontal: 15 }]}
                    // contentContainerStyle={{justifyContent: 'center',}}
                    >
                        {/* <ImageBackground source={require('./../../assets/images/background-with-img.png')}
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}> */}
                        {/* <ScrollView> */}
                        <View style={[globalstyle.authLogoContainer, { alignItems: 'flex-start', }]}>
                            <Text style={[globalstyle.authheading, { fontSize: 30, marginTop: 10 }]}>Contact Us</Text>
                            <Text style={[globalstyle.authdescription, { fontSize: 15, marginBottom: 10 }]}>Contact us for any question and query</Text>
                        </View>
                        <View>
                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'user'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Full Name"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('name', {
                                        value: user.first_name + ' ' + user.last_name,
                                        required: 'Full name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    defaultValue={user.first_name + ' ' + user.last_name}
                                    onChangeText={(value) => setValue('name', value)}
                                    ref={input01}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            {errors.name && <Text style={globalstyle.errorField}>{errors.name.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'mail'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Email Address"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('email', {
                                        value: user.email,
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Please provide valid email"
                                        },
                                    })}
                                    editable={false}
                                    selectTextOnFocus={false}
                                    defaultValue={user.email}
                                    onChangeText={(value) => setValue('email', value)}
                                    autoCapitalize='none'
                                    ref={input02}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input03.current.focus()}
                                />
                            </View>
                            {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'phone'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Phone Number (Optional)"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='numeric'
                                    {...register('phone', {
                                        value: user.phone,
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    defaultValue={user.phone}
                                    onChangeText={(value) => setValue('phone', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.phone && <Text style={globalstyle.errorField}>{errors.phone.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'globe'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Your Company"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    // keyboardType='numeric'
                                    {...register('company', {
                                        // value: '',
                                        required: 'Company is required',
                                    })}
                                    onChangeText={(value) => setValue('company', value)}
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.company && <Text style={globalstyle.errorField}>{errors.company.message}</Text>}

                            <View style={[globalstyle.inputbox, { justifyContent: 'space-between', borderRadius: 25 }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                    <Icon color={colors.green} name={'message-square'} size={18} style={{ marginTop: 15 }} />
                                    <TextInput
                                        style={[globalstyle.inputfield, { flex: 0.8, textAlignVertical: 'top', paddingTop: 17 }]}
                                        placeholder="Enter Your Message"
                                        placeholderTextColor={colors.placeholdercolor}
                                        {...register('message', {
                                            value: '',
                                            required: 'Message is required',
                                            // minLength: { value: 20, message: 'message length must be greater then 20 characters' }
                                        })}
                                        multiline={true}
                                        numberOfLines={Platform.OS === 'ios' ? null : 8}
                                        minHeight={(Platform.OS === 'ios' && 8) ? (20 * 8) : null} numberOf
                                        // defaultValue={'tabish@123'}
                                        // inputRef={message.ref}
                                        onChangeText={(value) => setValue('message', value)}
                                        ref={input04}
                                    // returnKeyType="next"
                                    // onSubmitEditing={() => input05.current.focus()}
                                    />
                                </View>
                            </View>
                            {errors.message && <Text style={globalstyle.errorField}>{errors.message.message}</Text>}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleSubmit(onSubmit)}
                                style={globalstyle.authSubmitButton}
                            >
                                <Text style={globalstyle.authSubmitButtonText}>Ask A Question</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ paddingBottom: 30 }} />
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
        {/* </ScrollView> */}
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    userInfo: state.appstate.userInfo,
    contactResponse: state.listingstate.contactResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        ContactApiCall: bindActionCreators(ContactApiCall, dispatch)
    }
}
export default connect(setStateToProps, mapDispatchToProps)(Contact);

const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: 13 },
})