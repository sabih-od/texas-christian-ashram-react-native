import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, isIPad } from "../theme";

const EventsTable = ({ list, width }) => {
    return <>
        <View style={[styles.tablehead, { backgroundColor: colors.grey }]}>
            <View style={{ width: (width - 200), }}><Text style={[styles.tablebodydata, { color: colors.white }]}>Title</Text></View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 90 }}><Text style={[styles.tablebodydata, { color: colors.white, textAlign: 'center' }]} numberOfLines={1}>Start Time</Text></View>
                <View style={{ width: 90 }}><Text style={[styles.tablebodydata, { color: colors.white, textAlign: 'center' }]} numberOfLines={1}>End Time</Text></View>
            </View>
        </View >
        {list && list.map((item, index) =>
            <View key={index} style={[styles.tablehead]}>
                <View style={{ width: (width - 200), }}><Text style={styles.tablebodydata}>{item?.title}</Text></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 90 }}><Text style={[styles.tablebodydata, { textAlign: 'center' }]} numberOfLines={1}>{item?.start_time}</Text></View>
                    <View style={{ width: 90 }}><Text style={[styles.tablebodydata, { textAlign: 'center' }]} numberOfLines={1}>{item?.end_time}</Text></View>
                </View>
            </View >)
        }
    </>
}

export default EventsTable;

const styles = StyleSheet.create({
    tablebodydata: { fontFamily: fonts.latoRegular, fontSize: isIPad ? 15 : 13 },
    tablehead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 13, paddingHorizontal: 15, borderBottomColor: '#ddd', borderBottomWidth: 1, }
})