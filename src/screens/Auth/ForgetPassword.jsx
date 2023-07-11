import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

import { useForm } from 'react-hook-form';
import { colors, fonts } from "../../theme";

import Icon from "react-native-vector-icons/Feather";
import globalstyle from "../../theme/style";
import { ForgetPasswordApiCall } from "../../redux/reducers/AuthReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Loader from "../../components/Loader";
import { showToast } from "../../helpers/toastConfig";


const ForgetPassword = (props) => {

    // const [showPassword, setShowPassword] = useState(false);
    const [emailaddress, setEmailAddress] = useState('');
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();
    const [loading, isLoading] = useState(false);

    const prevForgetPasswordResRef = useRef(props.forgetPasswordResponse);

    useEffect(() => {
        if (props.forgetPasswordResponse !== prevForgetPasswordResRef.current && props.forgetPasswordResponse.success && props.forgetPasswordResponse.data) {
            prevForgetPasswordResRef.current = props.forgetPasswordResponse;
            console.log('props.forgetPasswordResponse => ', props.forgetPasswordResponse);
            props.navigation.navigate('SubmitOTP', { email: emailaddress })
            // props.navigation.navigate('SubmitOTP')
        }
        else if (props.forgetPasswordResponse !== prevForgetPasswordResRef.current && !props.forgetPasswordResponse.success) {
            prevForgetPasswordResRef.current = props.forgetPasswordResponse;
            console.log('props.forgetPasswordResponse Eroor => ', props.forgetPasswordResponse);
            showToast('error', props.forgetPasswordResponse.message)
            // props.navigation.navigate('SubmitOTP', { email: data.email })
            // props.navigation.navigate('SubmitOTP')
        }
        isLoading(false);
    }, [props.forgetPasswordResponse])

    const onSubmit = (data) => {
        console.log('data => ', data)
        props.ForgetPasswordApiCall(data)
        setEmailAddress(data.email)
        isLoading(true);
        // props.navigation.navigate('SubmitOTP', { email: data.email })
    }

    return <SafeAreaView style={globalstyle.fullview}>
        <Loader isLoading={loading} />
        {/* <ScrollView style={globalstyle.authContainer}> */}
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')} style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
            {/* <ScrollView> */}
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <View style={globalstyle.authLogoContainer}>
                            <Image source={require('./../../../assets/images/logo-with-text.png')} style={globalstyle.authLogo} />
                            <Text style={globalstyle.authheading}>Forget Password</Text>
                            <Text style={globalstyle.authdescription}>Please recover your account</Text>
                        </View>
                        <View>

                            <View style={globalstyle.inputbox}>
                                <Icon color={colors.green} name={'mail'} size={18} />
                                <TextInput
                                    style={globalstyle.inputfield}
                                    placeholder="Email Address"
                                    placeholderTextColor={colors.placeholdercolor}
                                    {...register('email', {
                                        // value: 'johncanady@mailinator.com',
                                        required: 'Email Address is required',
                                        pattern: {
                                            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                                            message: "Please provide valid email"
                                        },
                                    })}
                                    // defaultValue={'johncanady@mailinator.com'}
                                    onChangeText={(value) => setValue('email', value)}
                                    autoCapitalize='none'
                                />
                            </View>
                            {errors.email && <Text style={globalstyle.errorField}>{errors.email.message}</Text>}

                            <TouchableOpacity activeOpacity={0.8} onPress={
                                handleSubmit(onSubmit)
                                // () => { props.navigation.navigate('SubmitOTP', { email: emailaddress }) }
                            } style={globalstyle.authSubmitButton} >
                                <Text style={globalstyle.authSubmitButtonText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 30 }} />
                        {/* </ScrollView> */}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
        {/* </ScrollView> */}
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    forgetPasswordResponse: state.authstate.forgetPasswordResponse,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ForgetPasswordApiCall: bindActionCreators(ForgetPasswordApiCall, dispatch),
    }
};

export default connect(setStateToProps, mapDispatchToProps)(ForgetPassword);

const styles = StyleSheet.create({
    forgetpasslink: { marginLeft: 'auto', marginTop: 10, marginBottom: 0, marginRight: 15 },
    forgetpasstext: { color: colors.black, fontFamily: fonts.latoRegular, fontSize: 13 },
})