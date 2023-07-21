import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, isIPad, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import { useCallback, useEffect, useRef, useState } from "react";
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

    const prevProps = useRef(props.getPostDetailResponse);
    useEffect(() => {
        if (prevProps.current != props.getPostDetailResponse && props.getPostDetailResponse?.success && props.getPostDetailResponse?.data) {
            setItem(props.getPostDetailResponse?.data);
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
            <Image source={{ uri: item?.media }} style={{ height: isIPad ? (width / 2) : 250, overflow: 'hidden', width: '100%', }} />
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
                <Text style={globalstyle.detaildate}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                <Text style={globalstyle.detailtitle}>{item?.title}</Text>
                <Text style={globalstyle.detaildescription}>{item?.content}</Text>
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
    
})