import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, isIPad, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import { useCallback, useEffect, useState } from "react";
import { GetEventsDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const BORDER_RADIUS = 20;
const EventDetail = (props) => {
    // console.log('props.route.params.item => ', props.route.params.item);
    // const { item } = props.route.params;
    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);

    useEffect(() => {
        if (props.route.params.refresh) {
            setRefreshing(true);
            props.GetEventsDetailApiCall(props.route.params.id)
        }
    }, [props.route.params.refresh])

    useEffect(() => {
        if (props.getEventDetailResponse.success && props.getEventDetailResponse.data) {
            setItem(props.getEventDetailResponse.data);
        }
        setRefreshing(false);
    }, [props.getEventDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetEventsDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    return (
        <SafeAreaView style={globalstyle.fullview}>
            <Image source={{ uri: item?.image }} style={{ height: isIPad ? (width / 2) : 250, overflow: 'hidden', width: '100%', }} />
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                // contentContainerStyle={{ padding: 20, borderTopLeftRadius: 10, overflow: 'hidden' }}
                style={{
                    padding: 20,
                    marginTop: -BORDER_RADIUS,
                    backgroundColor: colors.white,
                    borderTopLeftRadius: BORDER_RADIUS,
                    borderTopRightRadius: BORDER_RADIUS,
                }}>
                <Text style={styles.title}>{item?.title}</Text>

                <View style={{ flexDirection: 'row', borderBottomColor: '#ddd', borderBottomWidth: 1, paddingVertical: 15 }}>
                    <Icon name={'map-pin'} style={styles.eventpinicon} />
                    <View>
                        <Text style={styles.subheading}>Location</Text>
                        <Text style={styles.eventlocation}>{item?.location}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', borderBottomColor: '#ddd', borderBottomWidth: 1, paddingVertical: 15, marginBottom: 15 }}>
                    <Icon name={'clock'} style={styles.eventpinicon} />
                    <View style={{ flexDirection: 'row', }}>
                        <View>
                            <Text style={styles.subheading}>Start Date</Text>
                            <Text style={styles.eventlocation}>{moment.parseZone(item?.date_from, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text>
                        </View>
                        <View style={styles.sperator} />
                        <View>
                            <Text style={styles.subheading}>End Date</Text>
                            <Text style={styles.eventlocation}>{moment.parseZone(item?.date_to, 'DD-MM-YYYY').format('DD MMM, YYYY')}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.subheading}>Description</Text>
                <Text style={styles.description}>{item?.description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    getEventDetailResponse: state.detailpagestate.getEventDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetEventsDetailApiCall: bindActionCreators(GetEventsDetailApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(EventDetail);

const styles = StyleSheet.create({
    date: { fontFamily: fonts.latoRegular, color: colors.orange },
    title: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 32 : 28, marginBottom: 5 },
    subheading: { fontFamily: fonts.headingFont, marginBottom: 3, fontSize: isIPad ? 22 : 18, color: colors.black },
    description: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: isIPad ? 18 : 15 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 17 : 13, },
    eventpinicon: { color: colors.orange, marginRight: 15, marginTop: 2, fontSize: isIPad ? 24 : 20 },
    seperator: { height: 22, width: 1, marginTop: 10, backgroundColor: '#ddd', marginHorizontal: 20, }
})