import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad, width, height } from './../../theme';
import Icon from 'react-native-vector-icons/Feather';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const ReportDeleteBottomSheet = ({ item, visible, userid, handleDelete, setShowDeleteModal, showDeleteModal }) => {

    const sender = item?.user?.id == userid;

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => [10, 220], []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    useEffect(() => {
        bottomSheetRef.current?.close();
    }, [bottomSheetRef])

    useEffect(() => {
        if (showDeleteModal) {
            bottomSheetRef.current?.present();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [showDeleteModal])



    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            // onChange={handleSheetChanges}
            enablePanDownToClose={true}
        >
            <View style={[styles.fullview, { backgroundColor: '#f7f7f7' }]}>
                <View style={{ paddingHorizontal: 25, paddingVertical: 15, flexDirection: 'row' }} >
                    <Image
                        // source={item?.user?.profile_picture ? { uri: item?.user?.profile_picture } : require('./../../../assets/images/dummy-profile-image.png')} 
                        source={require('./../../../assets/images/dummy-profile-image.png')}
                        defaultSource={require('./../../../assets/images/dummy-profile-image.png')}
                        style={[styles.proficon]}
                    />
                    <View style={{ fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14, marginLeft: 10 }}>
                        <Text style={[styles.msgusername]}>{!item?.user?.first_name ? 'User not found' : `${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 9, borderRadius: 7, borderTopLeftRadius: 0, overflow: 'hidden', maxWidth: width - 110, backgroundColor: colors.green, }}><Text style={{ fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 14, color: colors.white, }}>{item?.message}</Text></View>
                    </View>
                </View>
                {sender && <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    activeOpacity={0.7} style={[styles.deletebtn]}>
                    <Icon name={'trash'} style={styles.iconstyle} />
                    <Text style={styles.deletebtntext}>Delete Message</Text>
                </TouchableOpacity>}
                {!sender && <>
                    <TouchableOpacity activeOpacity={0.7} style={styles.deletebtn}>
                        <Icon name={'users'} style={styles.iconstyle} />
                        <Text style={styles.deletebtntext}>Report User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.deletebtn, { borderBottomWidth: 0 }]}>
                        <Icon name={'message-square'} style={styles.iconstyle} />
                        <Text style={styles.deletebtntext}>Report Message</Text>
                    </TouchableOpacity>
                </>}
            </View>
        </BottomSheetModal>
    );
};

export default ReportDeleteBottomSheet;

const styles = StyleSheet.create({
    // deletemsgbtn: { color: colors.black, textAlign: 'center', fontFamily: fonts.latoRegular, fontSize: 12, padding: 10 },
    // reportmodalbox: { position: 'absolute', backgroundColor: '#f5f5f5', paddingVertical: 1, width: 150, borderRadius: 4, top: 21, zIndex: 5, overflow: 'hidden', borderTopColor: colors.green, borderTopWidth: 1 },
    // reportbtn: { borderBottomColor: '#e5e5e5', borderBottomWidth: 1, paddingHorizontal: 10 },

    deletebtn: {
        paddingVertical: 18, paddingHorizontal: 25, borderBottomColor: '#e5e5e5', borderBottomWidth: 1,
        flexDirection: 'row', alignItems: 'center',
    },
    deletebtntext: { fontFamily: fonts.latoRegular, color: colors.black },
    modalstyle: {
        position: 'absolute', bottom: 10, width: width - 20, left: 0, zIndex: 1,
        backgroundColor: '#f7f7f7', borderRadius: 10, marginLeft: 10, overflow: 'hidden',
        shadowColor: colors.green, shadowOffset: { width: 0, height: 9, }, shadowOpacity: 0.30, shadowRadius: 12.35, elevation: 19,
    },
    iconstyle: { fontSize: 15, marginRight: 15, color: colors.black },

    proficon: { width: isIPad ? 50 : 40, height: isIPad ? 50 : 40, borderRadius: isIPad ? 50 : 40, resizeMode: 'cover', },
    msgusername: { textTransform: 'capitalize', fontSize: isIPad ? 16 : 14, fontFamily: fonts.latoBold, marginBottom: 5, color: colors.black }


})
