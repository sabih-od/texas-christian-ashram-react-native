import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Image } from "react-native";
import { colors, fonts, height, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import about from "../data/about";
import { AboutApiCall } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const About = (props) => {

    const [body, setBody] = useState({});
    const prevAboutResponseResponseRef = useRef(props.aboutResponse);

    useEffect(() => {
        props.AboutApiCall();
    }, []);

    useEffect(() => {
        if (props.aboutResponse !== prevAboutResponseResponseRef.current && props.aboutResponse.success && props.aboutResponse.data) {
            prevAboutResponseResponseRef.current = props.aboutResponse;
            console.log('props.aboutResponse => ', JSON.parse(props.aboutResponse.data.content))
            setBody(JSON.parse(props.aboutResponse.data.content))
        }
    }, [props.aboutResponse])

    console.log('about => ', about);
    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 15 }}>
            {Object.values(body).map((item, index) => {
                console.log('item => ', item);
                if(item.key == 'h1') return <Text key={index} style={[styles.heading, {fontSize: 23}]}>{item.value}</Text>;
                else if(item.key == 'image') return <Image key={index} source={{uri: item.value}} style={styles.image} />;
                else if(item.key == 'h2') return <Text key={index} style={styles.heading}>{item.value}</Text>;
                else if(item.key == 'p') return <Text key={index} style={styles.paragraph}>{item.value}</Text>;
                else if(item.key == 'strong') return <Text key={index} style={styles.strong}>{item.value}</Text>;
            })}
            {/* <Text style={[styles.heading, {fontSize: 23}]}>What We Believe</Text>
            <Image source={require('./../../assets/images/about-image-01.jpg')} style={styles.image} />
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.heading}>Our Mission</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Image source={require('./../../assets/images/about-image-02.jpg')} style={styles.image} />
            <Text style={styles.heading}>What is Cristian Ashram?</Text>
            <Text style={styles.paragraph}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <View style={{ height: 20 }} /> */}
            <View style={{height: 40, width: 100}} />
        </ScrollView>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    aboutResponse: state.listingstate.aboutResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        AboutApiCall: bindActionCreators(AboutApiCall, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(About);


const styles = StyleSheet.create({
    heading: { fontSize: 20, fontFamily: fonts.headingFont, color: colors.black, marginBottom: 10 },
    paragraph: { fontSize: 14, marginBottom: 0, fontFamily: fonts.latoRegular, color: colors.grey },
    strong: { fontSize: 14, marginBottom: 5, fontFamily: fonts.latoBold, color: colors.black },
    parabold: { fontSize: 14, fontFamily: fonts.latoBold, color: colors.black },
    image: { width: width - 30, height: width / 2, resizeMode: 'cover', borderRadius: 10, marginBottom: 20 },

})