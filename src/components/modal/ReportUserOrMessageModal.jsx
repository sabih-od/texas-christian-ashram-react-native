import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad, width } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const initialOptions = [
    { id: 1, checked: false, text: 'Harassment' },
    { id: 2, checked: false, text: 'Spam or Scam' },
    { id: 3, checked: false, text: 'Inappropriate Content' },
    { id: 4, checked: false, text: 'Impersonation' },
    { id: 5, checked: false, text: 'Threats' },
    { id: 6, checked: false, text: 'Other' },
]

const RadioButton = ({ item, handleCheck }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCheck(item.id, 'radio')}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Icon name={item.checked ? "check-circle" : "circle"} style={{ marginRight: 6, color: colors.green, fontSize: isIPad ? 18 : 15 }} />
            <Text style={{ fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 17 : 14 }}>{item.text}</Text>
        </TouchableOpacity>
    )
}

const ReportUserOrMessageModal = ({ visible, handleReportAction, setVisible, reportType }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);

    const [options, setOptions] = useState(initialOptions)
    // const [showError, setShowError] = useState(false)

    function _handleCheck(id, type) {
        let newarr = initialOptions;
        if (type != 'radio') {
            newarr = [...options]
        }
        const updatedOptions = newarr.map(obj => {
            if (obj.id == id) {
                return { ...obj, checked: !obj.checked };
            }
            return obj;
        });
        setOptions(updatedOptions)
    }

    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={true}
            onRequestClose={() => { setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '70%' : '90%', }}>
                    <Text style={[globalstyle.modaltitle, { textTransform: 'capitalize', textAlign: 'left', paddingHorizontal: 15, paddingTop: 15, paddingBottom: 10, fontSize: isIPad ? 26 : 20 }]}>Report {reportType}</Text>
                    <Text style={[globalstyle.modaldesc, { textAlign: 'left', fontSize: isIPad ? 18 : 15 }]}>Thank you for reporting this {reportType}. Your feedback helps us maintain a safe and welcoming community. Please review the information below and provide additional details regarding your report.{'\n\n'}Please select the category that best describes the reason for your report.An appropriate action will be taken within 24 hours</Text>

                    <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                        {options?.map((item, index) => {
                            return <RadioButton key={index} item={item} handleCheck={_handleCheck} />
                        })}
                    </View>
                    {<Text></Text>}
                    <View style={globalstyle.modalbtnsrow}>
                        <TouchableOpacity onPress={() => {
                            handleReportAction(false)
                        }} activeOpacity={0.6} style={[globalstyle.modalbtn, { borderRightColor: '#ddd', borderRightWidth: 1, }]}>
                            <Icon name="x-circle" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (options.some(element => element.checked === true)) {
                                // setShowError(false)
                                handleReportAction(true)
                            }
                            // else{
                            //     setShowError(true)
                            // }
                        }} activeOpacity={0.6} style={globalstyle.modalbtn}>
                            <Icon name="check-circle" size={17} color={colors.green} style={{ marginRight: 10 }} />
                            <Text style={globalstyle.modalbtntext}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
export default ReportUserOrMessageModal;