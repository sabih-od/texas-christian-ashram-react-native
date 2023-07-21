import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { useForm } from 'react-hook-form';
import { colors, fonts, isIPad } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import { bindActionCreators } from "redux";
import { RegisterApiCall } from "../../redux/reducers/AuthReducer";
import { connect } from "react-redux";
import { SetIsLogin, SetUserInfo } from "../../redux/reducers/AppStateReducer";
import Loader from "../../components/Loader";
import TermsAndConditionsModal from "../../components/modal/TermsAndConditionsModal";
import { showToast } from "../../helpers/toastConfig";

const Register = (props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading, isLoading] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    const prevResgisterResponseRef = useRef(props.registerResponse);

    useEffect(() => {
        if (props.registerResponse !== prevResgisterResponseRef.current && props.registerResponse?.success && props.registerResponse?.data) {
            prevResgisterResponseRef.current = props.registerResponse;
            props.SetUserInfo(props.registerResponse?.data);
            console.log('props.registerResponse => ', props.registerResponse);
            props.SetIsLogin(true);
            // props.navigation.reset({ index: 0, routes: [{ name: 'Screens' }] })
        }
        isLoading(false);
    }, [props.registerResponse])

    const onSubmit = (data) => {
        if (isChecked) {
            console.log('data => ', data)
            props.RegisterApiCall(data)
            isLoading(true);
        } else {
            showToast('success', 'Please read and agree with terms and conditions')
        }
    }

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    const [showTermsModal, setShowTermsModal] = useState(false);

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        <TermsAndConditionsModal visible={showTermsModal} setVisible={setShowTermsModal} />
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')}
            style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false} style={isIPad && globalstyle.authscreencontainer}>
                        {/*  <View> */}
                        <View style={globalstyle.authLogoContainer}>
                            <Image
                                source={require('./../../../assets/images/logo-with-text.png')}
                                style={globalstyle.authLogo}
                            />
                            <Text style={globalstyle.authheading}>Welcome</Text>
                            <Text style={globalstyle.authdescription}>Please register your account</Text>
                        </View>
                        <View>
                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'user'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="First Name"
                                    // defaultValue={'John'}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('first_name', {
                                        // value: 'John',
                                        required: 'First name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('first_name', value)}
                                    ref={input01}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input02.current.focus()}
                                />
                            </View>
                            {errors.first_name && <Text style={globalstyle.errorField}>{errors.first_name.message}</Text>}
                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'user'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Last Name"
                                    // defaultValue={'Canady'}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('last_name', {
                                        // value: 'Canady',
                                        required: 'Last name is required',
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/i,
                                            message: "Please provide a valid name"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('last_name', value)}
                                    ref={input02}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input03.current.focus()}
                                />
                            </View>
                            {errors.last_name && <Text style={globalstyle.errorField}>{errors.last_name.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'mail'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Email Address"
                                    // defaultValue={'johncanady@mailinator.com'}
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('email', {
                                        // value: 'johncanady@mailinator.com',
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Please provide valid email"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('email', value)}
                                    autoCapitalize='none'
                                    ref={input03}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input04.current.focus()}
                                />
                            </View>
                            {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'phone'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Phone Number (Optional)"
                                    // defaultValue={'+81112345637'}
                                    placeholderTextColor={colors.placeholdercolor}
                                    // keyboardType='phone-pad'
                                    keyboardType='phone-pad'
                                    {...register('phone', {
                                        // value: '+81112345637',
                                        // required: 'Phone number is required',
                                        pattern: {
                                            value: /[0-9+]$/i,
                                            message: "Please provide valid phone number"
                                        },
                                    })}
                                    onChangeText={(value) => setValue('phone', value)}
                                    ref={input04}
                                    returnKeyType="next"
                                    onSubmitEditing={() => input05.current.focus()}
                                />
                            </View>
                            {errors.phone && <Text style={globalstyle.errorField}>{errors.phone.message}</Text>}

                            <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon color={colors.green} name={'lock'} size={18} />
                                    <TextInput
                                        style={[globalstyle.inputfield, { flex: 0.8 }]}
                                        placeholder="Password"
                                        // defaultValue={'password123'}
                                        placeholderTextColor={colors.placeholdercolor}
                                        {...register('password', {
                                            // value: 'password123',
                                            required: 'Password is required',
                                            minLength: { value: 8, message: 'Password length must be greater then 8' }
                                        })}
                                        // inputRef={password.ref}
                                        onChangeText={(value) => setValue('password', value)}
                                        secureTextEntry={!showPassword ? true : false}
                                        autoCapitalize='none'
                                        ref={input05}
                                    // returnKeyType="next"
                                    // onSubmitEditing={() => input05.current.focus()}
                                    />
                                </View>
                                <TouchableOpacity activeOpacity={0.8} style={globalstyle.showhideicontouch} onPress={() => { setShowPassword(!showPassword) }}>
                                    <Icon name={!showPassword ? 'eye' : 'eye-off'} size={18} style={globalstyle.showhideicon} />
                                </TouchableOpacity>
                            </View>
                            {errors.password && <Text style={globalstyle.errorField}>{errors.password.message}</Text>}

                            <View style={{ marginTop: 15, marginBottom: 15 }}>
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => setChecked(!isChecked)}
                                    style={{
                                        flexDirection: 'row', alignItems: 'center',
                                        // justifyContent: 'center' 
                                    }}>
                                    <Icon
                                        name={isChecked ? "check-circle" : "circle"}
                                        style={{ fontSize: isIPad ? 20 : 14, marginRight: 10 }}
                                    />
                                    <Text style={styles.termstext}>Yes, I agree to the </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        onPress={() => setShowTermsModal(true)}>
                                        <Text style={styles.termstextbold}>Term & Condition</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={handleSubmit(onSubmit)}
                                style={globalstyle.authSubmitButton}
                            >
                                <Text style={globalstyle.authSubmitButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={globalstyle.alreadysignin}>
                            <Text style={globalstyle.alreadyaccount}>Already have an account? </Text>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { props.navigation.navigate('Login') }}>
                                <Text style={globalstyle.actionauthtext}> Login</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{ paddingBottom: 30 }} /> */}
                        {/* </View>*/}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    registerResponse: state.authstate.registerResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        RegisterApiCall: bindActionCreators(RegisterApiCall, dispatch),
        SetIsLogin: bindActionCreators(SetIsLogin, dispatch),
        SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Register);

const styles = StyleSheet.create({
    termstext: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14 },
    termstextbold: { fontFamily: fonts.latoBold, fontSize: isIPad ? 18 : 14 }
})