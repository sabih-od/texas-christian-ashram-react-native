import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad, width, height } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const DeleteReportMessageModal = ({ item, visible, userid, handleDelete, setShowDeleteModal, handleReportUserModal }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);

    const sender = item?.user?.id == userid;

    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setShowDeleteModal(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setShowDeleteModal(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '70%' : '90%', overflow: 'hidden' }}>
                    {/* <Text style={{ paddingHorizontal: 25, paddingVertical: 15, backgroundColor: colors.green, color: colors.white, fontFamily: fonts.latoRegular }}>{item?.message}</Text> */}
                    {/* <View style={{ paddingHorizontal: 25, paddingVertical: 15, flexDirection: 'row', backgroundColor: '#f5f5f5' }} >
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
                    </View> */}

                    {/* {sender && <TouchableOpacity
                        onPress={() => handleDelete(item)}
                        activeOpacity={0.7} style={[styles.deletebtn]}>
                        <Icon name={'trash'} style={styles.iconstyle} />
                        <Text style={styles.deletebtntext}>Delete Message</Text>
                    </TouchableOpacity>}
                    {!sender && <>
                        <TouchableOpacity 
                            onPress={() => handleReportUserModal(true)}
                            activeOpacity={0.7} style={styles.deletebtn}>
                            <Icon name={'users'} style={styles.iconstyle} />
                            <Text style={styles.deletebtntext}>Report User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.deletebtn, { borderBottomWidth: 0 }]}>
                            <Icon name={'message-square'} style={styles.iconstyle} />
                            <Text style={styles.deletebtntext}>Report Message</Text>
                        </TouchableOpacity>
                    </>} */}
                    {/* <Text style={globalstyle.modaltitle}>Confirmation</Text> */}
                    <View style={{ height: 15 }} />
                    {sender && <Text style={globalstyle.modaldesc}>Are you sure you want to delete this message? {'\n'}This action cannot be undone.</Text>}
                    {!sender && <Text style={globalstyle.modaldesc}>Are you sure you want to report this user or message? {'\n'}Your report will be reviewed by our team.</Text>}
                    <View style={{ paddingHorizontal: 20, paddingVertical: 15, paddingBottom: 13, flexDirection: 'row', backgroundColor: '#f5f5f5' }} >
                        <Image
                            source={item?.user?.profile_picture ? { uri: item?.user?.profile_picture } : require('./../../../assets/images/dummy-profile-image.png')}
                            // source={require('./../../../assets/images/dummy-profile-image.png')}
                            defaultSource={require('./../../../assets/images/speaker-placeholder.png')}
                            style={[styles.proficon]}
                        />
                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ backgroundColor: colors.green, paddingVertical: 9, paddingHorizontal: 15, borderRadius: 10, borderBottomLeftRadius: 0, marginBottom: 6 }}>
                                <Text style={{ fontFamily: fonts.latoRegular, color: colors.white, fontSize: isIPad ? 18 : 15, width: width - 157 }}>{item.message}</Text>
                            </View>
                            <Text style={{ fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 16 : 12 }}>From <Text style={{ fontFamily: fonts.latoBold }}>{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text></Text>
                        </View>
                    </View>
                    <View style={[globalstyle.modalbtnsrow, { flexWrap: 'wrap' }]}>
                        {sender && <TouchableOpacity
                            onPress={() => { handleDelete(item) }}
                            activeOpacity={0.6}
                            style={[globalstyle.modalbtn, { borderRightColor: '#ddd', width: '100%' }]}>
                            <Icon name="message-circle" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Delete Message</Text>
                        </TouchableOpacity>}
                        {!sender && <>
                            <TouchableOpacity onPress={() => {
                                setShowDeleteModal(false)
                                handleReportUserModal('message')
                            }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, justifyContent: 'flex-start', paddingLeft: 30 }]}>
                                <Icon name="message-circle" size={17} color={colors.green} style={{ marginRight: 10 }} />
                                <Text style={globalstyle.modalbtntext}>Report Message</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowDeleteModal(false)
                                handleReportUserModal('user')
                            }} activeOpacity={0.6} style={[globalstyle.modalbtn, { justifyContent: 'flex-start', paddingLeft: 30 }]}>
                                <Icon name="user" size={17} color={colors.green} style={{ marginRight: 10 }} />
                                <Text style={globalstyle.modalbtntext}>Report User</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => {
                                setShowDeleteModal(false)
                                handleReportUserModal('block')
                            }} activeOpacity={0.6} style={[globalstyle.modalbtn, { justifyContent: 'flex-start', paddingLeft: 30, borderRightColor: '#ddd', borderRightWidth: 1, borderTopColor: '#ddd', borderTopWidth: 1 }]}>
                                <Icon name="user" size={17} color={colors.green} style={{ marginRight: 10 }} />
                                <Text style={globalstyle.modalbtntext}>Block User</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setShowDeleteModal(false)
                            }} activeOpacity={0.6} style={[globalstyle.modalbtn, { justifyContent: 'flex-start', paddingLeft: 30, borderTopColor: '#ddd', borderTopWidth: 1, backgroundColor: colors.green }]}>
                                <Icon name="x" size={17} color={colors.white} style={{ marginRight: 10 }} />
                                <Text style={[globalstyle.modalbtntext, { color: colors.white }]}>Cancel</Text>
                            </TouchableOpacity> */}
                        </>}
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default DeleteReportMessageModal;

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

    proficon: { width: isIPad ? 50 : 45, height: isIPad ? 50 : 45, borderRadius: isIPad ? 50 : 45, resizeMode: 'cover', },
    msgusername: { textTransform: 'capitalize', fontSize: isIPad ? 16 : 14, fontFamily: fonts.latoBold, marginBottom: 5, color: colors.black }


})
