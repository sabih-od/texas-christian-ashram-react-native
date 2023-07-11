import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ActivityIndicator, View, Image, Modal, Animated, Easing, Text } from 'react-native';
import { colors, fonts } from './../theme';
import NetInfo from '@react-native-community/netinfo'

function AnimatedImage() {

    const fadeAnimInOut = useRef(new Animated.Value(0.6)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    Animated.loop(
        Animated.sequence([
            Animated.timing(fadeAnimInOut, { toValue: 1, duration: 1000, useNativeDriver: true, }),
            Animated.timing(fadeAnimInOut, { toValue: 0.6, duration: 1000, useNativeDriver: true, })
        ]),
        {
            // iterations: 4
        }
    ).start()

    // Animated.loop(
    //     Animated.sequence([
    //         Animated.timing(rotateAnim, { toValue: 1, duration: 1000, easing: Easing.linear, useNativeDriver: true, }),
    //     ]),
    //     {
    //         // iterations: 4
    //     }
    // ).start()


    return (
        <Animated.View
            style={[{ opacity: fadeAnimInOut, }]}
        // style={[styles.image, { transform: [{ rotate: rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }] }]}
        // style={[styles.image, { transform: [{ translateX: fadeAnimInOut.interpolate({ inputRange: [0, 1], outputRange: [-15, 15] }) }] }]}
        >
            <Image style={{ width: 40, height: 40 }} source={require('./../../assets/images/logo.png')} />
        </Animated.View>
    );
}


const Loader = (props) => {

    const [isConnected, setIsConnected] = useState(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
        });
        return () => {
            unsubscribe();
        }
    }, [])


    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.isLoading || !isConnected} // {!isConnected}
            statusBarTranslucent={true}
            onRequestClose={() => { }}>
            <View style={styles.modalContainer}>
                <View style={{backgroundColor: colors.green, alignItems: 'center', flexDirection: 'row', padding: 15, borderRadius: 10}}>
                    {/* <AnimatedImage /> */}
                    <ActivityIndicator color={colors.black} size={'small'} />
                    {!isConnected ? <Text style={styles.nonetwork}>No Network Connection</Text> : <Text style={styles.nonetwork}>Loading. Please wait...</Text>}
                </View>
            </View>
        </Modal>
    );
}

export default Loader;
const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.6)' },
    nonetwork: { fontFamily: fonts.latoRegular, marginTop: 0, textAlign: 'center', padding: 8, paddingLeft: 15, paddingRight: 15, color: colors.white, backgroundColor: colors.green, borderRadius: 4 }
});
