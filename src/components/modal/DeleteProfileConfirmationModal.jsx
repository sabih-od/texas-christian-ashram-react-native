import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const DeleteProfileConfirmationModal = ({ visible, handleDeleteConfirmValue, setShowConfirmationModal }) => {
    let [visibility, setVisiblity] = useState(visible ? visible : false)
    useEffect(() => {
        setVisiblity(visible)
        return () => {
        };
    }, [visible]);
    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setShowConfirmationModal(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { handleDeleteConfirmValue(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? 470 : '90%', }}>
                    <Text style={globalstyle.modaltitle}>Delete Account</Text>
                    <Text style={globalstyle.modaldesc}>Are you sure you want to delete your account?</Text>
                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => {
                            handleDeleteConfirmValue(false)
                        }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}>
                            <Icon name="x" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            handleDeleteConfirmValue(true)
                        }} activeOpacity={0.6} style={globalstyle.modalbtn}>
                            <Icon name="check" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default DeleteProfileConfirmationModal;

const styles = StyleSheet.create({
    modaltitle: { fontFamily: fonts.latoBlack, color: colors.black, textAlign: 'center', paddingTop: 15, paddingBottom: 5, fontSize: 18, color: colors.green },
    modaldesc: { fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', fontSize: 13, paddingHorizontal: 15, paddingBottom: 15, color: '#444' },
    modalbtnsrow: { flexDirection: 'row', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1, },
    confirmbtntext: { fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center' },
    confirmbtn: { width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }
})