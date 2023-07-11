import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';

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
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: '90%', }}>
                    <Text style={{ fontFamily: fonts.latoBlack, color: colors.black, textAlign: 'center', paddingTop: 15, paddingBottom: 5, fontSize: 18, color: colors.green }}>Choose Photo</Text>
                    <Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', fontSize: 13, paddingHorizontal: 15, paddingBottom: 15, color: '#444' }}>Please make sure your photo clearly shows your face</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1, }}>
                        <TouchableOpacity onPress={() => { handleCamera(true) }} activeOpacity={0.6} style={{ width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightColor: '#ddd', borderRightWidth: 1, }}><Icon name="camera" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center' }}>Camera</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleCamera(false) }} activeOpacity={0.6} style={{ width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Icon name="image" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center' }}>Gallery</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default CameraModal;