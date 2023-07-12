import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, width } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

const RequestedPrayerModal = ({ visible, setVisible, item }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);
    console.log('item => ', item);
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
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: '90%', paddingBottom: 15 }}>
                    <Text style={{ fontFamily: fonts.latoBlack, color: colors.black, textAlign: 'left', paddingVertical: 15, paddingHorizontal: 15, fontSize: 24, color: colors.black }}>Requested Prayer</Text>
                    {/* <Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', fontSize: 13, paddingHorizontal: 15, paddingBottom: 15, color: '#444' }}>Please make sure your photo clearly shows your face</Text> */}

                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Prayer For</Text>
                        <Text style={styles.rowdetail}>{item?.name}</Text>
                    </View>
                    {/* <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Start Date</Text>
                        <Text style={styles.rowdetail}>{moment.parseZone(item?.start_date, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text>
                    </View>
                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>End Date</Text>
                        <Text style={styles.rowdetail}>{moment.parseZone(item?.end_date, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text>
                    </View>
                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Time</Text>
                        <Text style={styles.rowdetail}>{item?.time}</Text>
                    </View> */}
                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Prayer Request</Text>
                        <Text style={styles.rowdetail}>{item?.description}</Text>
                    </View>
                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Email</Text>
                        <Text style={styles.rowdetail}>{item?.email}</Text>
                    </View>
                    <View style={styles.itemrow}>
                        <Text style={styles.rowheading}>Contact</Text>
                        <Text style={styles.rowdetail}>{item?.contact}</Text>
                    </View>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', borderTopColor: '#ddd', borderTopWidth: 1, }}>
                        <TouchableOpacity onPress={() => { handleCamera(true) }} activeOpacity={0.6} style={{ width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightColor: '#ddd', borderRightWidth: 1, }}><Icon name="camera" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center' }}>Camera</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleCamera(false) }} activeOpacity={0.6} style={{ width: '50%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}><Icon name="image" size={17} color={colors.green} style={{ marginRight: 10 }} /><Text style={{ fontFamily: fonts.latoRegular, color: colors.black, textAlign: 'center', paddingVertical: 14, textAlign: 'center' }}>Gallery</Text></TouchableOpacity>
                    </View> */}
                </View>
            </View>
        </Modal>
    )
}
export default RequestedPrayerModal;

const styles = StyleSheet.create({
    itemrow: { flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 15 },
    rowheading: { fontFamily: fonts.latoBold, minWidth: 110, color: colors.green },
    rowdetail: { fontFamily: fonts.latoRegular, color: colors.grey, maxWidth: width - 180, }
})