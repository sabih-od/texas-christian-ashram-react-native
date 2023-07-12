import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import { useCallback, useEffect, useState } from "react";
import { GetPostDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const BORDER_RADIUS = 20;
const PostDetail = (props) => {
    // console.log('props.route.params.item => ', props.route.params.item);
    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);

    useEffect(() => {
        if (props.route.params.refresh) {
            setRefreshing(true);
            props.GetPostDetailApiCall(props.route.params.id)
        }
    }, [props.route.params.refresh])

    useEffect(() => {
        if (props.getPostDetailResponse.success && props.getPostDetailResponse.data) {
            setItem(props.getPostDetailResponse.data);
        }
        setRefreshing(false);
    }, [props.getPostDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetPostDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    return (
        <SafeAreaView style={globalstyle.fullview}>
            <Image source={{ uri: item?.media }} style={{ height: 250, overflow: 'hidden', width: '100%', }} />
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
                }}
            >
                <Text style={styles.date}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.content}</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    getPostDetailResponse: state.detailpagestate.getPostDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetPostDetailApiCall: bindActionCreators(GetPostDetailApiCall, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(PostDetail);
// export default PostDetail;

const styles = StyleSheet.create({
    date: { fontFamily: fonts.latoBold, color: colors.orange, marginBottom: 5 },
    title: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 28, marginBottom: 5 },
    subheading: { fontFamily: fonts.headingFont, marginBottom: 3, fontSize: 18 },
    description: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 15 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 13, },
    eventpinicon: { color: colors.orange, marginRight: 15, marginTop: 2, fontSize: 20 }
})