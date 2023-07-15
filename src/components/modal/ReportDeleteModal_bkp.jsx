import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, height, width } from "../../theme";
import Icon from "react-native-vector-icons/Feather";

const ReportDeleteModal = ({ item, showDeleteModal }) => {
    return (
        <View style={{
            position: 'absolute', top: 0, width: width - 20, left: 0, zIndex: 1, height: height
        }}>
            <TouchableOpacity style={{backgroundColor: '#ddd', width: width, height: height, position: 'absolute'}} onPress={() => showDeleteModal(false)}></TouchableOpacity>
            <View style={styles.modalstyle}>
                <Text style={{ paddingHorizontal: 25, paddingVertical: 15, backgroundColor: colors.green, color: colors.white, fontFamily: fonts.latoRegular }}>{item?.message}</Text>
                <TouchableOpacity activeOpacity={0.7} style={[styles.deletebtn]}>
                    <Icon name={'trash'} style={styles.iconstyle} />
                    <Text style={styles.deletebtntext}>Delete Message</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.deletebtn}>
                    <Icon name={'users'} style={styles.iconstyle} />
                    <Text style={styles.deletebtntext}>Report User</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={[styles.deletebtn, { borderBottomWidth: 0 }]}>
                    <Icon name={'message-square'} style={styles.iconstyle} />
                    <Text style={styles.deletebtntext}>Report Message</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
    // return (
    //     <View style={[styles.reportmodalbox, sender ? { right: 0 } : { left: 0 }]}>
    //         {sender && <TouchableOpacity activeOpacity={0.8} style={styles.reportbtn} onPress={() => {
    //             // handleDelete(item.id)
    //         }}>
    //             <Text style={styles.deletemsgbtn}>Delete Message</Text>
    //         </TouchableOpacity>}
    //         {!sender && <><TouchableOpacity activeOpacity={0.8} style={styles.reportbtn} onPress={() => {
    //             // handleDelete(item.id)
    //         }}>
    //             <Text style={styles.deletemsgbtn}>Report Message</Text>
    //         </TouchableOpacity>
    //         <TouchableOpacity activeOpacity={0.8} style={[styles.reportbtn, { borderBottomWidth: 0, }]} onPress={() => {
    //             // handleDelete(item.id)
    //         }}>
    //             <Text style={styles.deletemsgbtn}>Report User</Text>
    //         </TouchableOpacity></>}
    //     </View>
    // )
}

export default ReportDeleteModal;

const styles = StyleSheet.create({
    // deletemsgbtn: { color: colors.black, textAlign: 'center', fontFamily: fonts.latoRegular, fontSize: 12, padding: 10 },
    // reportmodalbox: { position: 'absolute', backgroundColor: '#f5f5f5', paddingVertical: 1, width: 150, borderRadius: 4, top: 21, zIndex: 5, overflow: 'hidden', borderTopColor: colors.green, borderTopWidth: 1 },
    // reportbtn: { borderBottomColor: '#e5e5e5', borderBottomWidth: 1, paddingHorizontal: 10 },

    deletebtn: {
        paddingVertical: 15, paddingHorizontal: 25, borderBottomColor: '#e5e5e5', borderBottomWidth: 1,
        flexDirection: 'row', alignItems: 'center',
    },
    deletebtntext: { fontFamily: fonts.latoRegular },
    modalstyle: {
        position: 'absolute', bottom: 10, width: width - 20, left: 0, zIndex: 1,
        backgroundColor: '#f7f7f7', borderRadius: 10, marginLeft: 10, overflow: 'hidden',
        shadowColor: "#000", shadowOffset: { width: 0, height: 9, }, shadowOpacity: 0.30, shadowRadius: 12.35, elevation: 19,
    },
    iconstyle: { fontSize: 15, marginRight: 15, color: colors.black }
})