import { ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, isIPad, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import Video from "react-native-video";
import { GetSermonsDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState, useRef } from "react";
import { useCallback } from "react";
// import YouTube from "react-native-youtube";
import YoutubePlayer from "react-native-youtube-iframe";

const SermonsDetail = (props) => {
    console.log('props.route.params.item => ', props.route.params.item);

    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);
    const [playing, setPlaying] = useState(true);
    const [isStarted, setStarted] = useState(true);

    useEffect(() => {
        if (props.route.params.refresh) {
            setRefreshing(true);
            props.GetSermonsDetailApiCall(props.route.params.id)
        }
    }, [props.route.params.refresh])

    const prevProps = useRef(props.getSermonDetailResponse);
    useEffect(() => {
        if (prevProps.current != props.getSermonDetailResponse && props.getSermonDetailResponse?.success && props.getSermonDetailResponse?.data) {
            console.log('props.getSermonDetailResponse?.data => ', props.getSermonDetailResponse?.data);
            setItem(props.getSermonDetailResponse?.data);
        }
        setRefreshing(false);
    }, [props.getSermonDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetSermonsDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    const _handleStateChanged = (e) => {
        console.log('state change', e);
        if (e == 'unstarted') setStarted(false);
        // else setStarted(false);
    }

    function findvideoid(url) {
        var regex = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|v\/|embed\/|shorts\/)?([^\/\?\s&]+)/;

        var match = url.match(regex);
        var videoId = match ? match[1] : null;
        console.log('videoId => ', videoId);
        return videoId;  // Output: dQw4w9WgXcQ
    }

    return (
        <SafeAreaView style={globalstyle.fullview}>
            {isStarted && <View style={{ height: width / 1.8, justifyContent: 'center', backgroundColor: colors.black, position: 'absolute', zIndex: 1, width: width, left: 0, top: 0 }}>
                <ActivityIndicator color={colors.green} />
            </View>}
            {item?.url && <YoutubePlayer
                height={width / 1.8}
                play={playing}
                videoId={findvideoid(item?.url)} // youtube_video_id
                onChangeState={_handleStateChanged}
                onReady={() => console.log('onReady')}
                onError={() => console.log('onError')}
            />}

            {/* <YouTube
                videoId="Gxb8BKoMASc"
                apiKey="AIzaSyDPSZ0cWHpLdZll6bugk-1XANGuQPaQHNs" // Sam Garcia
                onReady={e => console.log('onReady YouTube')}
                onError={e => console.log({ error: e.error })}
                style={{ alignSelf: 'stretch', height: width / 1.6 }}
            /> */}
            {/* <Image source={{ uri: item?.image }} style={{ height: 250, overflow: 'hidden', width: '100%', }} /> */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 15, borderTopLeftRadius: 10, overflow: 'hidden' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Text style={globalstyle.detaildate}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                <Text style={globalstyle.detailtitle}>{item?.title}</Text>
                {/* <Text style={globalstyle.detaildescription}>{item?.description}</Text> */}
                <Text style={globalstyle.detaildescription}>{item?.description}</Text>
                {/* <YouTube
                    videoId="VI9yRXbNyn8"
                    // apiKey="YOUR_YOUTUBE_API_KEY"
                    style={{ alignSelf: 'stretch', height: width / 1.90 }}
                /> */}
                {/* <Video source={{ uri: item?.media }} style={{ width: width - 30, height: 200 }} controls={true} /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const setStateToProps = (state) => ({
    getSermonDetailResponse: state.detailpagestate.getSermonDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetSermonsDetailApiCall: bindActionCreators(GetSermonsDetailApiCall, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(SermonsDetail);
// export default SermonsDetail;

const styles = StyleSheet.create({
})