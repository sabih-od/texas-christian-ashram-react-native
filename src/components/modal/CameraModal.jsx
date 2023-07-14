import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const CameraModal = ({ visible, handleCamera, setVisible }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);
    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '70%' : '90%', }}>
                    <Text style={globalstyle.modaltitle}>Choose Photo</Text>
                    <Text style={globalstyle.modaldesc}>Select an option to capture a new photo using your device's camera or select a photo from your device's photo gallery</Text>
                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => { handleCamera(true) }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}><Icon name="camera" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Camera</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleCamera(false) }} activeOpacity={0.6} style={globalstyle.modalbtn}><Icon name="image" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={globalstyle.modalbtntext}>Gallery</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default CameraModal;