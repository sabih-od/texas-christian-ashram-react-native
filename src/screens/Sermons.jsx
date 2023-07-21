import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator } from "react-native";
import { colors, fonts, height, isIPad, width } from "../theme";
import globalstyle from "../theme/style";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import sermonslist from "../data/sermonslist";
import SermonsBox from "../components/SermonsBox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetSermonsList } from "../redux/reducers/ListingApiStateReducer";

const itemslimit = 50;
const Sermons = (props) => {
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);

    const [sermonslist, setSermonslist] = useState([]);
    const prevSermonsListResponseRef = useRef(props.getSermonsListResponse);

    useEffect(() => {
        props.GetSermonsList({ pageno, limit })
        console.log({pageno, limit})

        // return () => {
        //     console.log('Sermon Unmount');
        //     setSermonslist([])
        // }

    }, [])

    useEffect(() => {
        if (props.getSermonsListResponse !== prevSermonsListResponseRef.current && props.getSermonsListResponse?.success && props.getSermonsListResponse?.data.length) {
            prevSermonsListResponseRef.current = props.getSermonsListResponse;
            console.log('props.getSermonsListResponse => ', props.getSermonsListResponse)
            if (refreshing) setSermonslist(props.getSermonsListResponse?.data)
            else setSermonslist(prevState => [...prevState, ...props.getSermonsListResponse?.data])
        }
        setRefreshing(false)
        setLoadmore(false)
    }, [props.getSermonsListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetSermonsList({ pageno, limit });
        console.log('_handleRefresh ');
    }


    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetSermonsList({ pageno: pageno + 1, limit });
        if(!loadmore){
            console.log('_handleLoadMore ');
            props.GetSermonsList({ pageno: pageno + 1, limit });
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            style={{ padding: 15, marginBottom: 0 }}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 3 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore && <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View>}
            onEndReachedThreshold={0.8}
            onEndReached={_handleLoadMore}
            data={sermonslist}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<SermonsBox key={index} item={item} width={isIPad ? (width / 3) - 20 : (width / 2) - 20} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getSermonsListResponse: state.listingstate.getSermonsListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetSermonsList: bindActionCreators(GetSermonsList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Sermons);

const styles = StyleSheet.create({
    
})