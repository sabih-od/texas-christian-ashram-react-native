import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts } from "../../theme";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { GetAnnouncementDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const AnnouncementDetail = (props) => {
    // console.log('props.route.params.item => ', props.route.params.item);
    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);

    useEffect(() => {
        if (props.route.params.refresh) {
            setRefreshing(true);
            props.GetAnnouncementDetailApiCall(props.route.params.id)
        }
    }, [props.route.params.refresh])

    useEffect(() => {
        if (props.getAnnouncementDetailResponse.success && props.getAnnouncementDetailResponse.data) {
            setItem(props.getAnnouncementDetailResponse.data);
        }
        setRefreshing(false);
    }, [props.getAnnouncementDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetAnnouncementDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    return (
        <SafeAreaView style={globalstyle.fullview}>
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                style={{ padding: 15 }}
            >
                <Text style={styles.date}>{moment.parseZone(item?.date, 'DD-MM-YYYY').format('DD MMM, YYYY, hh:mm A')}</Text>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.description}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    getAnnouncementDetailResponse: state.detailpagestate.getAnnouncementDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetAnnouncementDetailApiCall: bindActionCreators(GetAnnouncementDetailApiCall, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(AnnouncementDetail);
// export default AnnouncementDetail;

const styles = StyleSheet.create({
    date: { fontFamily: fonts.latoBold, color: colors.orange, marginBottom: 5 },
    title: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 26, marginBottom: 5 },
    description: { fontFamily: fonts.latoRegular, color: colors.black, }
})