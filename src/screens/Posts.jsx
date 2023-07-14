import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator } from "react-native";
import { colors, fonts, height, isIPad, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import PostBox from "../components/PostBox";
import postslist from "../data/postslist";
import { GetPostsList } from "../redux/reducers/ListingApiStateReducer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../theme/style";

const itemslimit = 50;
const Posts = (props) => {
    const [postList, setPostList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [loadmore, setLoadmore] = useState(false);

    const prevPostsListResRef = useRef(props.getPostsListResponse);

    useEffect(() => {
        props.GetPostsList({ pageno, limit })
        return () => {
            console.log('Announcement Unmount');
            setPostList([])
        }
    }, [])

    useEffect(() => {
        if (props.getPostsListResponse !== prevPostsListResRef.current && props.getPostsListResponse.success && props.getPostsListResponse.data.length) {
            prevPostsListResRef.current = props.getPostsListResponse;
            setPostList(prevState => [...prevState, ...props.getPostsListResponse.data])
            console.log('props.getPostsListResponse => ', props.getPostsListResponse)
            if (refreshing) setPostList(props.getPostsListResponse.data)
            else setPostList(prevState => [...prevState, ...props.getPostsListResponse.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getPostsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetPostsList({ pageno, limit });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetPostsList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (postList.length < props.getPostsListResponse.total) {
                console.log('_handleLoadMore ');
                props.GetPostsList({ pageno: pageno + 1, limit });
                setLoadmore(false)
            }
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            style={{ padding: 15 }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 4 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            data={postList}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item, index }) => {
                return (<PostBox key={index} item={item} width={isIPad ? (width / 4) - 15 : (width / 2) - 20} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getPostsListResponse: state.listingstate.getPostsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetPostsList: bindActionCreators(GetPostsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Posts);

const styles = StyleSheet.create({

})