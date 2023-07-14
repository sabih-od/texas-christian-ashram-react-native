import React from "react";
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Entypo"
import { colors, fonts, isIPad } from "../theme";

const SermonsBox = ({ item, width, navigation }) => {

    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('SermonsDetail', { item: item })}
        style={[{ width: width ? width : '48%', marginBottom: 12 }, isIPad && { marginRight: 10, marginBottom: 20 }]}>
        <ImageBackground
            source={{ uri: item?.image }}
            defaultSource={require('./../../assets/images/event-placeholder.png')}
            style={styles.sermonbgimage}
        >
            <View style={styles.sermonbgopacity} />
            <View style={styles.serplayiconbg}>
                <Icon name={'controller-play'} style={styles.serplayicon} />
            </View>
        </ImageBackground>
        <Text style={styles.postboxtitle}>{item?.title}</Text>
    </TouchableOpacity>)
}

export default SermonsBox;


const styles = StyleSheet.create({
    postboxtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 18 : 16, textTransform: 'capitalize' },
    sermonbgimage: { width: '100%', height: 130, borderRadius: 8, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', marginBottom: isIPad ? 10 : 4 },
    sermonbgopacity: { backgroundColor: colors.white, opacity: 0.1, width: '100%', height: 200, zIndex: 0, left: 0, top: 0, position: 'absolute', },
    serplayiconbg: { width: 35, height: 35, borderRadius: 35, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.green },
    serplayicon: { color: colors.white, fontSize: 26, marginRight: -4 }
})