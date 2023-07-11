import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, TextInput } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import globalstyle from "../theme/style";
import { useForm } from "react-hook-form";

const donationlist = [
    { title: '10', amount: 10 },
    { title: '50', amount: 50 },
    { title: '100', amount: 100 },
    { title: '250', amount: 250 },
    { title: '500', amount: 500 },
    { title: '1,000', amount: 1000 }
];

const Donation = (props) => {
    const [amount, setAmount] = useState(250);
    const [errorAmount, setErrorAmount] = useState('');
    const { handleSubmit, formState: { errors }, register, setValue } = useForm();

    console.log('data => ', errors)
    const onSubmit = () => {
        console.log('amount => ', amount)
        if ((amount == '' || amount == 0) || (amount != '' && !(/^\d*$/.test(amount)))) {
            setErrorAmount('Please provide a valid donation amount')
        } else {
            setErrorAmount('');
            props.navigation.navigate('PaymentMethod');
        }
    }

    useEffect(() => {
        console.log('here');
    }, [])

    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ paddingHorizontal: 15 }}>
            <View style={[globalstyle.authLogoContainer, { alignItems: 'flex-start', paddingVertical: 15 }]}>
                <Text style={[globalstyle.authheading, { fontSize: 30, }]}>Donation Amount</Text>
                <Text style={[globalstyle.authdescription, { fontSize: 15 }]}>Lorem Ipsum is simply dummy text of the printing</Text>
            </View>
            <View>
                {donationlist.map((item, index) => (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={[{ padding: 13, backgroundColor: '#e7e7e7', marginBottom: 10, borderRadius: 20 }, amount == item.amount && { backgroundColor: colors.green }]}
                        key={index}
                        onPress={() => setAmount(item.amount)}>
                        <Text style={[{ color: colors.black, fontFamily: fonts.latoBold, fontSize: 16, textAlign: 'center' }, amount == item.amount && { color: colors.white }]}>{`$${item.title}`}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View>
                <Text style={{ fontFamily: fonts.latoRegular, fontSize: 17, color: colors.black, marginTop: 20 }}>Other Amount</Text>
                <View style={globalstyle.inputbox}>
                    <Icon color={colors.green} name={'dollar-sign'} size={18} />
                    <TextInput
                        style={globalstyle.inputfield}
                        placeholder="Enter your donation amount"
                        placeholderTextColor={colors.placeholdercolor}
                        keyboardType="numeric"
                        defaultValue={''}
                        onChangeText={(value) => setAmount(value)}
                        // onSubmitEditing={() => onSubmit()}
                        autoCapitalize='none'
                    />
                </View>
                {errorAmount != '' && <Text style={globalstyle.errorField}>{errorAmount}</Text>}

                <TouchableOpacity
                    activeOpacity={0.8}
                    // onPress={handleSubmit(onSubmit)}
                    onPress={() => onSubmit()}
                    style={globalstyle.authSubmitButton}
                >
                    <Text style={globalstyle.authSubmitButtonText}>Select Mayment Method</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
}

export default Donation;


const styles = StyleSheet.create({

})