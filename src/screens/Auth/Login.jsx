import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";

import { useForm } from 'react-hook-form';
import { colors, fonts, width } from "../../theme";

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


const Login = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const prevLoginResponseRef = useRef(props.loginResponse);

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
            showToast('error', 'Email Id or password incorrect')
        }
        isLoading(false);
    }, [props.loginResponse])

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
        // console.log('data => ', data);
        props.LoginApiCall(data);
        isLoading(true);
        // props.navigation.navigate({ index: 0, routes: ['Screens', { screen: 'Home' }] })
        // console.log('navigation => ', props.navigation.getParent('Home'));

        // props.navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             { name: 'Screens' }, // Replace 'Home' with the initial route name of your nested drawer navigator
        //         ],
        //     })
        // );

    }

    const input01 = useRef();
    const input02 = useRef();

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        {/* <ScrollView style={globalstyle.authContainer}> */}
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')} style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={globalstyle.authLogoContainer}>
                            <Image source={require('./../../../assets/images/logo-with-text.png')} style={globalstyle.authLogo} />
                            <Text style={globalstyle.authheading}>Hello!</Text>
                            <Text style={globalstyle.authdescription}>So glad you are here</Text>
                        </View>
                        <View style={globalstyle.inputbox}>
                            <Icon color={colors.green} name={'mail'} size={18} />
                            <TextInput
                                style={globalstyle.inputfield}
                                placeholder="Email Address"
                                // value=''
                                {...register('email', {
                                    // value: 'johnmartin@mailinator.com',
                                    // value: 'testuser06@mailinator.com',
                                    required: 'Email Address is required',
                                    pattern: {
                                        value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                        message: "Please provide valid email"
                                    },
                                })}
                                // defaultValue={'johnmartin@mailinator.com'}
                                // defaultValue={'testuser06@mailinator.com'}
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
                        <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon color={colors.green} name={'lock'} size={18} />
                                <TextInput
                                    style={[globalstyle.inputfield, { width: width - 115 }]}
                                    placeholder="Password"
                                    placeholderTextColor={colors.placeholdercolor}
                                    // value=''
                                    {...register('password', {
                                        // value: 'password123',
                                        // value: '123456789',
                                        required: 'Password is required',
                                        // minLength: { value: 8, message: 'Password length must be greater then 8' }
                                    })}
                                    // defaultValue={'password123'}
                                    // defaultValue={'123456789'}
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
    forgetpasstext: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: 13 },
})


// "react-native-reanimated": "^3.2.0",