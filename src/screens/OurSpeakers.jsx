import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather";
import OurSpeakerBox from "../components/OurSpeakerBox";
import ourspeakers from "../data/ourspeakers";
import { GetOurSpeakerList } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";
import { colors } from "../theme";

const itemslimit = 50;
const OurSpeakers = (props) => {
    const [ourSpeakers, setOurSpeakers] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const prevOurSpeakerListResponseRef = useRef(props.getOurSpeakersListResponse);

    useEffect(() => {
        props.GetOurSpeakerList({ pageno, limit })
        console.log({pageno, limit})
        return () => {
            console.log('Announcement Unmount');
            setOurSpeakers([])
        }
    }, [])

    useEffect(() => {
        if (props.getOurSpeakersListResponse !== prevOurSpeakerListResponseRef.current && props.getOurSpeakersListResponse.success && props.getOurSpeakersListResponse.data.length) {
            prevOurSpeakerListResponseRef.current = props.getOurSpeakersListResponse;
            console.log('props.getOurSpeakersListResponse => ', props.getOurSpeakersListResponse)
            if (refreshing) setOurSpeakers(props.getOurSpeakersListResponse.data)
            else setOurSpeakers(prevState => [...prevState, ...props.getOurSpeakersListResponse.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getOurSpeakersListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetOurSpeakerList({ pageno, limit });
        console.log('_handleRefresh ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetOurSpeakerList({ pageno: pageno + 1, limit });
        if(!loadmore){
            if(ourSpeakers.length < props.getOurSpeakersListResponse.total){
                console.log('_handleLoadMore ');
                props.GetOurSpeakerList({ pageno: pageno + 1, limit });
                setLoadmore(false)
            }
        }
    }
    
    return <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            style={{ padding: 15 }}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore && <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View>}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}            
            data={ourSpeakers}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<OurSpeakerBox key={index} item={item} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getOurSpeakersListResponse: state.listingstate.getOurSpeakersListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetOurSpeakerList: bindActionCreators(GetOurSpeakerList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(OurSpeakers);