import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { useForm } from 'react-hook-form';
import { colors, fonts, isIPad, width } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import { bindActionCreators } from "redux";
import { RegisterApiCall, ResendOTPApiCall, SubmitOTPApiCall } from "../../redux/reducers/AuthReducer";
import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { showToast } from "../../helpers/toastConfig";
import Loader from "../../components/Loader";


const SubmitOTP = (props) => {

    // const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    const prevSubmitOtpResRef = useRef(props.submitOtpResponse);
    const prevResendOtpResRef = useRef(props.resendOtpResponse);

    useEffect(() => {
        // console.log('props.submitOtpResponse => ', props.submitOtpResponse);
        if (props.submitOtpResponse !== prevSubmitOtpResRef.current && props.submitOtpResponse?.success && props.submitOtpResponse?.data) {
            prevSubmitOtpResRef.current = props.submitOtpResponse;
            console.log('props.submitOtpResponse => ', props.submitOtpResponse);
            props.SetUserInfo(props.submitOtpResponse?.data);
            // props.SetIsLogin(true);
            props.navigation.navigate('ResetPassword');
        } else if (props.submitOtpResponse !== prevSubmitOtpResRef.current && !props.submitOtpResponse?.success) {
            showToast('error', props.submitOtpResponse?.message)
        }
        isLoading(false);
    }, [props.submitOtpResponse])

    useEffect(() => {
        // // console.log('props.resendOtpResponse => ', props.resendOtpResponse);
        // if (props.resendOtpResponse !== prevResendOtpResRef.current && props.resendOtpResponse?.success && props.resendOtpResponse?.data) {
        //     prevResendOtpResRef.current = props.resendOtpResponse;
        //     props.SetUserInfo(props.resendOtpResponse?.data);
        //     console.log('props.resendOtpResponse => ', props.resendOtpResponse);
        //     props.SetIsLogin(true);
        //     props.navigation.navigate('Screens', { screen: 'Home' })
        // }
    }, [props.resendOtpResponse])

    // console.log('data => ', errors)
    const onSubmit = (data) => {
        console.log('data => ', data)
        const OTPCodeString = Object.values(data).join('');
        let OTPCode = parseInt(OTPCodeString);
        console.log('OTPCode => ', OTPCode);
        props.SubmitOTPApiCall({ otp: OTPCode, email: props?.route?.params?.email });
        isLoading(true);
        // console.log(OTPCode);
        // console.log('OTPCode.length => ', OTPCode.toString().length);

        // if (OTPCode.toString().length < 4 || OTPCode == NaN) {
        //     this.changeErrorState('otpcode', 'Please provide valid OTP Code');
        // } else {
        //     //this.changeErrorState('otpcode', '')
        //     this.props.OTPVerification({
        //         otp_type_id: this.state.otp_type_id,
        //         otp_code: OTPCode,
        //     })
        //     console.log(this.state);
        // }


        // props.SubmitOTPApiCall(data)
        // props.navigation.navigate('Login');
    }

    onResendCode = () => {
        //console.log('onResendCode => ');
        // this.props.ClearResponses();
        // this.props.ForgetPassEmail({ email_address: this.state.email_address });
    }


    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();
    const input06 = useRef();

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        {/* <ScrollView style={globalstyle.authContainer}> */}
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')}
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={isIPad && globalstyle.authscreencontainer}>
                        {/* <ScrollView> */}
                        <View style={globalstyle.authLogoContainer}>
                            <Image
                                source={require('./../../../assets/images/logo-with-text.png')}
                                style={globalstyle.authLogo}
                            />
                            <Text style={globalstyle.authheading}>Submit OTP</Text>
                            <Text style={[globalstyle.authdescription, { textAlign: 'center', lineHeight: 22 }]}>Provide the OTP sent on your email <Text style={{ fontSize: 14, color: colors.black }}>{props?.route?.params?.email}</Text></Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                {/* <Icon color={colors.green} name={'user'} size={18} /> */}
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp1', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp1', value)}
                                    ref={input01}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp1', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input01.current.focus() : input02.current.focus()
                                    }}
                                    returnKeyType="next"
                                // onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp2', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp2', value)}
                                    ref={input02}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp2', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input01.current.focus() : input03.current.focus()
                                    }}
                                    returnKeyType="next"
                                // onSubmitEditing={() => input03.current.focus()}
                                />
                            </View>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp3', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp3', value)}
                                    ref={input03}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp3', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input02.current.focus() : input04.current.focus()
                                    }}
                                    returnKeyType="next"
                                // onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp4', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp4', value)}
                                    ref={input04}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp4', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input03.current.focus() : input05.current.focus()
                                    }}
                                />
                            </View>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp5', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp5', value)}
                                    ref={input05}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp5', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input04.current.focus() : input06.current.focus()
                                    }}
                                />
                            </View>
                            <View style={[globalstyle.inputbox, styles.inputboxotp]}>
                                <TextInput
                                    style={[globalstyle.inputfield, styles.inputfieldotp]}
                                    placeholder=""
                                    // value=''
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('otp6', {
                                        // value: '',
                                        required: 'Please provide a valid OTP',
                                        pattern: {
                                            value: /^[0-9]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('otp6', value)}
                                    ref={input06}
                                    maxLength={1}
                                    keyboardType="numeric"
                                    onFocus={() => setValue('otp6', '')}
                                    onKeyPress={({ nativeEvent }) => {
                                        // console.log(nativeEvent.key)
                                        nativeEvent.key === 'Backspace' ? input05.current.focus() : input06.current.focus()
                                    }}
                                />
                            </View>
                        </View>
                        {errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4 || errors.otp5 || errors.otp6 && <Text style={globalstyle.errorField}>{`Please provide valid OTP`}</Text>}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSubmit(onSubmit)}
                            // onPress={() => props.navigation.navigate('ResetPassword')}
                            style={globalstyle.authSubmitButton}
                        >
                            <Text style={globalstyle.authSubmitButtonText}>Submit</Text>
                        </TouchableOpacity>

                        <View style={globalstyle.alreadysignin}>
                            <Text style={globalstyle.alreadyaccount}>Change email address? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { props.navigation.navigate('ForgetPassword') }}>
                                <Text style={globalstyle.actionauthtext}> Forget Password</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 30 }} />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {/* </ScrollView> */}
        </ImageBackground>
        {/* </ScrollView> */}
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    submitOtpResponse: state.authstate.submitOtpResponse,
    resendOtpResponse: state.authstate.resendOtpResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        SubmitOTPApiCall: bindActionCreators(SubmitOTPApiCall, dispatch),
        ResendOTPApiCall: bindActionCreators(ResendOTPApiCall, dispatch),

        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(SubmitOTP);

const styles = StyleSheet.create({
    inputfieldotp: { paddingHorizontal: 0, textAlign: 'center', fontSize: 16, width: 50 },
    inputboxotp: { width: 50, paddingHorizontal: 0 },
})