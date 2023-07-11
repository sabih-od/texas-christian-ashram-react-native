import { ActivityIndicator, Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import globalstyle from "../../theme/style";
import { colors, fonts, width } from "../../theme";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import Video from "react-native-video";
import { GetSermonsDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
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
        if (props.getSermonDetailResponse.status && props.getSermonDetailResponse.data) {
            setItem(props.getSermonDetailResponse.data);
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

    return (
        <SafeAreaView style={globalstyle.fullview}>
            {isStarted && <View style={{ height: width / 1.8, justifyContent: 'center', backgroundColor: colors.black, position: 'absolute', zIndex: 1, width: width, left: 0, top: 0 }}>
                <ActivityIndicator color={colors.green} />
            </View>}
            <YoutubePlayer
                height={width / 1.8}
                play={playing}
                videoId={"Gxb8BKoMASc"}
                onChangeState={_handleStateChanged}
                onReady={() => console.log('onReady')}
                onError={() => console.log('onError')}
            />
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
                <Text style={styles.date}>{moment(parseInt(item?.created_at)).format("DD MMM, YYYY, hh:mm A")}</Text>
                <Text style={styles.title}>{item?.title}</Text>
                {/* <Text style={styles.description}>{item?.description}</Text> */}
                <Text style={styles.description}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.\n\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n\nIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. `}</Text>
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
    date: { fontFamily: fonts.latoRegular, color: colors.grey, marginBottom: 5, fontSize: 13 },
    title: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 28, marginBottom: 5, },
    subheading: { fontFamily: fonts.headingFont, marginBottom: 3, fontSize: 18, },
    description: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: 15 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 13, },
    eventpinicon: { color: colors.orange, marginRight: 15, marginTop: 2, fontSize: 20 }
})