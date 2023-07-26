import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const ProfileModal = ({ profile, visible, handleBlockUser, setVisible }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);

    console.log('profile => ', profile);

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
                    <View style={{ padding: 20, alignItems: 'center' }}>
                        <Image source={profile?.profile_picture ? { uri: profile?.profile_picture } : require('./../../../assets/images/dummy-profile-image.png')} style={styles.proficon} />
                        <Text style={styles.username}>John Martin {profile?.id}</Text>
                        <Text style={{ fontFamily: fonts.latoRegular, fontSize: 14, textAlign: 'center', color: colors.grey, marginTop: 13 }}>Are you sure you want to block this user? This action will restrict all interactions and communications with them.</Text>
                    </View>
                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => { handleBlockUser(profile?.id) }} activeOpacity={0.6}
                            style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}>
                            <Icon name="user" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Block User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={0.6} style={globalstyle.modalbtn}>
                            <Icon name="x" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default ProfileModal;

const styles = StyleSheet.create({
    proficon: { width: isIPad ? 100 : 90, height: isIPad ? 100 : 90, borderRadius: isIPad ? 100 : 90, marginBottom: 10, resizeMode: 'cover', },
    username: { textTransform: 'capitalize', fontFamily: fonts.latoBold, fontSize: 16, color: colors.black }
})