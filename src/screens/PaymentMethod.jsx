import React, { useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TextInput, Image } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import { useForm } from "react-hook-form";
import globalstyle from "../theme/style";

const PaymentMethod = (props) => {

    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    console.log('data => ', errors)
    const onSubmit = (data) => {
        console.log('data => ', data)
    }

    const [paymentMethod, setPaymentMethod] = useState(1);

    const input01 = useRef();
    const input02 = useRef();
    const input03 = useRef();
    const input04 = useRef();
    const input05 = useRef();

    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={[globalstyle.authContainer, { paddingHorizontal: 15 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20,  justifyContent: 'center' }}>
                <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.8}
                onPress={() => setPaymentMethod(1)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Icon style={{ marginRight: 7 }} color={colors.green} name={paymentMethod == 1 ? 'check-circle' : 'circle'} size={18} />
                        <Text style={{ fontFamily: fonts.latoRegular }}>Creadit Card</Text>
                    </View>
                    <View style={{width: 80, height: 40, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: paymentMethod == 1 ? colors.green : '#777'}}><Image source={require('./../../assets/images/visa-image.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} /></View>
                </TouchableOpacity>
                <TouchableOpacity
                style={{alignItems: 'center'}}
                activeOpacity={0.8}
                onPress={() => setPaymentMethod(2)}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Icon style={{ marginRight: 7 }} color={colors.green} name={paymentMethod == 2 ? 'check-circle' : 'circle'} size={18} />
                        <Text style={{ fontFamily: fonts.latoRegular }}>Creadit Card</Text>
                    </View>
                    <View style={{width: 80, height: 40, backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center', borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: paymentMethod == 2 ? colors.green : '#777'}}><Image source={require('./../../assets/images/paypal-image.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} /></View>
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.labeltext}>Name On Card *</Text>
                <View style={[globalstyle.inputbox, { paddingHorizontal: 14 }]}>
                    <TextInput
                        style={globalstyle.inputfield}
                        placeholder="Enter Name on Card"
                        placeholderTextColor={colors.placeholdercolor}
                        {...register('nameoncard', {
                            // value: '',
                            required: 'Name on card is required',
                            pattern: {
                                value: /^[A-Za-z\s]+$/i,
                                message: "Please provide a valid name"
                            },
                        })}
                        onChangeText={(value) => setValue('nameoncard', value)}
                        ref={input01}
                        returnKeyType="next"
                        onSubmitEditing={() => input02.current.focus()}
                    />
                </View>
                {errors.nameoncard && <Text style={globalstyle.errorField}>{errors.nameoncard.message}</Text>}

                <Text style={styles.labeltext}>Card Number *</Text>
                <View style={[globalstyle.inputbox, { paddingHorizontal: 14 }]}>
                    {/* <Icon color={colors.green} name={'phone'} size={18} /> */}
                    <TextInput
                        style={globalstyle.inputfield}
                        placeholder="Enter Your Card Number"
                        placeholderTextColor={colors.placeholdercolor}
                        // keyboardType='phone-pad'
                        keyboardType='numeric'
                        {...register('cardnumber', {
                            // value: '',
                            required: 'Card number is required',
                            pattern: {
                                value: /[0-9+]$/i,
                                message: "Please provide valid card number"
                            },
                        })}
                        onChangeText={(value) => setValue('cardnumber', value)}
                        ref={input02}
                        returnKeyType="next"
                        onSubmitEditing={() => input03.current.focus()}
                    />
                </View>
                {errors.cardnumber && <Text style={globalstyle.errorField}>{errors.cardnumber.message}</Text>}

                <Text style={styles.labeltext}>Verification Number *</Text>
                <View style={[globalstyle.inputbox, { paddingHorizontal: 14 }]}>
                    {/* <Icon color={colors.green} name={'calendar'} size={18} /> */}
                    <TextInput
                        style={globalstyle.inputfield}
                        placeholder="Enter Your Verification Number"
                        placeholderTextColor={colors.placeholdercolor}
                        // keyboardType='phone-pad'
                        keyboardType='numeric'
                        {...register('verificationno', {
                            // value: '',
                            required: 'Contact is required',
                            pattern: {
                                value: /[0-9+]$/i,
                                message: "Please provide valid verification number"
                            },
                        })}
                        onChangeText={(value) => setValue('verificationno', value)}
                        ref={input03}
                        returnKeyType="next"
                        onSubmitEditing={() => input04.current.focus()}
                    />
                </View>
                {errors.verificationno && <Text style={globalstyle.errorField}>{errors.verificationno.message}</Text>}

                <Text style={styles.labeltext}>Expiration Date *</Text>
                <View style={[globalstyle.inputbox, { justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Icon color={colors.green} name={'clock'} size={18} /> */}
                        <TextInput
                            style={[globalstyle.inputfield, { flex: 0.45 }]}
                            placeholder="Month"
                            placeholderTextColor={colors.placeholdercolor}
                            onChangeText={(value) => setValue('month', value)}
                            {...register('month', {
                                // value: '',
                                required: 'Month is required',
                            })}
                            ref={input04}
                            returnKeyType="next"
                            onSubmitEditing={() => input05.current.focus()}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <Icon color={colors.green} name={'clock'} size={18} /> */}
                        <TextInput
                            style={[globalstyle.inputfield, { flex: 0.45 }]}
                            placeholder="Year"
                            placeholderTextColor={colors.placeholdercolor}
                            onChangeText={(value) => setValue('year', value)}
                            {...register('year', {
                                // value: '',
                                required: 'Year is required',
                            })}
                            ref={input05}
                        // returnKeyType="next"
                        // onSubmitEditing={() => input05.current.focus()}
                        />
                    </View>
                </View>
                {(errors.month || errors.year) && <Text style={globalstyle.errorField}>{errors.month.message} {errors.year.message}</Text>}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSubmit(onSubmit)}
                    style={globalstyle.authSubmitButton}
                >
                    <Text style={globalstyle.authSubmitButtonText}>Donate Now</Text>
                </TouchableOpacity>
            </View>

            <View style={{ paddingBottom: 30 }} />
            {/* </ScrollView> */}
            {/* </ImageBackground> */}
        </ScrollView>
    </SafeAreaView>
}

export default PaymentMethod;


const styles = StyleSheet.create({
    labeltext: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 15, marginTop: 17, marginBottom: -5, marginLeft: 10 }
})