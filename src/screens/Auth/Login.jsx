import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";

import { useForm } from 'react-hook-form';
import { IOS, colors, fonts, isIPad, width } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";

import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import { bindActionCreators } from "redux";
import { LoginApiCall } from "../../redux/reducers/AuthReducer";
import { CommonActions, DrawerActions, StackActions } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/toastConfig";
import axios from "axios";
import AnimatedFloatingPlaceholder from "../../components/AnimatedPlaceholder";


const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.loginResponse);
    const prevLoginErrorRef = useRef(props.loginError);

    useEffect(() => {

        // fetch('https://texaschristianashram.org:3023/auth/login', {
        //     method: 'POST',
        //     mode: "cors",
        //     cache: "no-cache",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: 'kalenparker@mailinator.com',
        //         password: '12345678',
        //     }),
        // }).then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.log(error));

        if (!IOS) {
            axios.defaults.headers.common['Authorization'] = `Bearer 1656|35uwDzTjVDwexmX0Om94BtA9VPUKPHo2etdpGSUV`
            axios.request({ url: 'https://hunterssocial.com/api/user', method: 'GET' })
                .then(function (response) { console.log('response hunter => ', response); })
                .catch(function (error) { console.log(error); });
        }

        // axios.request({
        //     url: 'https://texaschristianashram.org:3023/auth/login', method: 'POST', data: {
        //         email: 'kalenparker@mailinator.com',
        //         password: '12345678',
        //     }
        // })
        // .then(function (response) { console.log('response texas => ', response); })
        // .catch(function (error) { console.log(error); });

        // axios.post('https://reqres.in/api/users/2').then(function (response) { console.log(response); }).catch(function (error) { console.log(error); });


        // axios.post('https://reqres.in/api/users', {
        //     "name": "morpheus",
        //     "job": "leader"
        // }).then(function (response) { console.log(response); }).catch(function (error) { console.log(error); });

    }, [])

    useEffect(() => {
        // console.log('props.loginResponse => ', props.loginResponse);
        if (props.loginResponse !== prevLoginResponseRef.current && props.loginResponse.success && props.loginResponse.data) {
            prevLoginResponseRef.current = props.loginResponse;
            props.SetUserInfo(props.loginResponse.data);
            console.log('props.loginResponse => ', props.loginResponse);
            // showToast();
            props.SetIsLogin(true);
            // props.navigation.navigate('Screens', { screen: 'Home' })
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }

        if (props.loginResponse !== prevLoginResponseRef.current && !props.loginResponse.success) {
            showToast('error', props.loginResponse.message.replaceAll(' ', '-').toLowerCase() == 'user-not-found' ? 'Email or Password incorrect' : props.loginResponse.message)
        }
        isLoading(false);
    }, [props.loginResponse])

    useEffect(() => {
        console.log('props.loginError => ', props.loginError);
        if (props.loginError && props.loginError !== prevLoginErrorRef.current && props.loginError?.message) {
            console.log('props.loginError => ', props.loginError);
            showToast('error', props.loginError?.message)
        }
        isLoading(false);
    }, [props.loginError])

    // const showToast = () => {
    //     Toast.show({
    //         type: 'success', // Can be 'success', 'error', 'info', or 'none'
    //         // text1: 'Success',
    //         text2: 'User logedin successfully..',
    //         position: 'top', // Can be 'top', 'bottom', or 'center'
    //         visibilityTime: 3000, // Duration to show the toast message (in milliseconds)
    //         autoHide: true, // Automatically hide the toast after the duration
    //         topOffset: 30, // Additional offset from the top/bottom (in pixels)
    //         // bottomOffset: 40,
    //     });
    // }

    const onSubmit = (data) => {
        console.log('onSubmit data => ', data)
        props.LoginApiCall(data);
        isLoading(true);
    }

    const input01 = useRef();
    const input02 = useRef();

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        {/* <ScrollView style={globalstyle.authContainer}> */}
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')} style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            <KeyboardAvoidingView behavior={IOS ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={isIPad && globalstyle.authscreencontainer}>
                        <View style={globalstyle.authLogoContainer}>
                            <Image source={require('./../../../assets/images/logo-with-text.png')} style={globalstyle.authLogo} />
                            <Text style={globalstyle.authheading}>Hello!</Text>
                            <Text style={globalstyle.authdescription}>So glad you are here</Text>
                        </View>


                        {/* <Text style={[globalstyle.inputlabel,]}>Email Address</Text> */}
                        <View style={globalstyle.inputbox}>
                            <Icon color={colors.green} name={'mail'} size={18} />
                            <TextInput
                                style={globalstyle.inputfield}
                                placeholder="Email Address"
                                // value=''
                                {...register('email', {
                                    // value: 'kalenparker@mailinator.com',
                                    required: 'Email Address is required',
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                        message: "Please provide valid email"
                                    },
                                })}
                                // defaultValue={'kalenparker@mailinator.com'}
                                placeholderTextColor={colors.placeholdercolor}
                                autoCapitalize='none'
                                onChangeText={(value) => setValue('email', value)}
                                ref={input01}
                                returnKeyType="next"
                                onSubmitEditing={() => input02.current.focus()}
                            />
                        </View>
                        {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.navigation.navigate('ForgetPassword')}
                            style={styles.forgetpasslink}>
                            <Text style={styles.forgetpasstext}>Forget Password?</Text>
                        </TouchableOpacity>

                        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <AnimatedFloatingPlaceholder />
                        </View> */}

                        {/* <Text style={[globalstyle.inputlabel,]}>Password</Text> */}
                        <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon color={colors.green} name={'lock'} size={18} />
                                <TextInput
                                    style={[globalstyle.inputfield, { width: width - 115 }]}
                                    placeholder="Password"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // value=''
                                    {...register('password', {
                                        // value: '12345678',
                                        required: 'Password is required',
                                        // minLength: { value: 8, message: 'Password length must be greater then 8' }
                                    })}
                                    // defaultValue={'12345678'}
                                    // inputRef={password.ref}
                                    onChangeText={(value) => setValue('password', value)}
                                    secureTextEntry={!showPassword ? true : false}
                                    autoCapitalize='none'
                                    ref={input02}
                                // returnKeyType="next"
                                // onSubmitEditing={() => input05.current.focus()}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                                <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={handleSubmit(onSubmit)}
                            // onPress={() => {props.navigation.navigate('Screens', { screen: 'Home' })}}
                            style={globalstyle.authSubmitButton}>
                            <Text style={globalstyle.authSubmitButtonText}>Login</Text>
                        </TouchableOpacity>
                        <View style={globalstyle.alreadysignin}>
                            <Text style={globalstyle.alreadyaccount}>Don't have an account? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { props.navigation.navigate('Register') }}>
                                <Text style={globalstyle.actionauthtext}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
        {/* </ScrollView> */}
    </SafeAreaView>
}



const setStateToProps = (state) => ({
    loginResponse: state.authstate.loginResponse,
    loginError: state.authstate.loginError,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
        LoginApiCall: bindActionCreators(LoginApiCall, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(Login);
// export default Login;

const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: isIPad ? 16 : 13 },
})


// "react-native-reanimated": "^3.2.0",