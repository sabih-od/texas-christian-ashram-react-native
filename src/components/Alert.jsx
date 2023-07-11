import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../theme";

const Alert = (props) => {

    useEffect(() => {
        console.log('alert props => ', props);
    }, [props])

    return (
        <>
            <View style={styles.fullview}></View>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: '90%', marginHorizontal: '5%',  }}>
                    {/* <Text style={{ fontFamily: fonts.primarySemiBold, color: colors.primary, textAlign: 'center', paddingVertical: 10 }}>Alert</Text> */}
                    <Text style={{ fontFamily: fonts.primary, color: '#000', textAlign: 'center', paddingVertical: 10}}>No location provided</Text>
                </View>
            </View>
        </>
    );
}


const styles = StyleSheet.create({
    fullview: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        backgroundColor: '#0000003f'
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default Alert;