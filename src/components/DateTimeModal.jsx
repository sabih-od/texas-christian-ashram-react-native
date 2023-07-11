import { Linking, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import Icon from 'react-native-vector-icons/Feather';
import { useCallback, useEffect } from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DateTimeModal = ({ setVisible, showDate, showTime, maxDate,isStartDate, _handleChangeDate, _handleChangeTime }) => {

    useEffect(() => {
        // navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         //do stuff with location
        //     },
        //     (error) => {
        //         this.setState({ locationEnabled: false }),
        //     },
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        // );
    }, [])

    const goToSetting = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);

    useEffect(() => {
        console.log('maxDate => ', `${moment(maxDate, "DD-MM-YYYY").format("YYYY")}, ${moment(maxDate, "DD-MM-YYYY").format("MM")-1}, ${moment(maxDate, "DD-MM-YYYY").format("DD")}`);
    }, [maxDate])

    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={showDate || showTime}
            onRequestClose={() => {
                setVisible(false)
            }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    setVisible(false)
                }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: '90%', padding: 20 }}>
                    {(showDate) && (
                        <RNDateTimePicker
                            value={new Date()}
                            dataFormat="day month year"
                            mode="date"
                            display={'inline'}
                            // display={'spinner'}
                            minimumDate={maxDate && !isStartDate ? new Date(moment(maxDate, "DD-MM-YYYY").format("YYYY"), (moment(maxDate, "DD-MM-YYYY").format("MM") - 1), moment(maxDate, "DD-MM-YYYY").format("DD")) : new Date()}
                            // minimumDate={new Date()} 
                            onChange={_handleChangeDate}
                        />
                    )}
                    {showTime && (
                        <RNDateTimePicker
                            value={new Date()}
                            mode="time"
                            is24Hour={true}
                            display={'spinner'}
                            onChange={_handleChangeTime}
                        />
                    )}
                    {/* <Icon name={'map-pin'} size={30} color={colors.primary} style={{ marginLeft: 'auto', marginRight: 'auto', width: 30 }} />
                    <Text style={{ fontFamily: fonts.primarySemiBold, color: '#000', textAlign: 'center', paddingTop: 15, paddingBottom: 0, fontSize: 18, color: colors.primary }}>Enable Location</Text>
                    <Text style={{ fontFamily: fonts.primary, textAlign: 'center', fontSize: 13, paddingHorizontal: 15, paddingBottom: 10, color: '#444' }}>Please make sure the location is enabled</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        goToSetting()
                    }} style={{ backgroundColor: colors.primary, width: 140, paddingHorizontal: 15, paddingVertical: 7, marginLeft: 'auto', marginRight: 'auto', borderRadius: 5 }}>
                        <Text style={{ fontFamily: fonts.primary, textAlign: 'center', fontSize: 13, color: '#fff' }}>Enable Location</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </Modal>
    )
}
export default DateTimeModal;