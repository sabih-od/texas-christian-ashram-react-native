import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { colors, fonts, height, isIPad, width } from "../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import BookBox from "../components/BookBox";
import bookslist from "../data/bookslist";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetBooksList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";
// import Logo from "./../../assets/images/logo.svg";

const itemslimit = 50;
const Books = (props) => {
    const [booksList, setBooksList] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const prevBooksListResponseRef = useRef(props.getBooksListResponse);

    useEffect(() => {
        props.GetBooksList({ pageno, limit })
        console.log({pageno, limit})
        return () => {
            console.log('Books Unmount');
            setBooksList([])
        }
    }, [])

    useEffect(() => {
        if (props.getBooksListResponse !== prevBooksListResponseRef.current && props.getBooksListResponse?.success && props.getBooksListResponse?.data.length) {
            prevBooksListResponseRef.current = props.getBooksListResponse;
            console.log('props.getBooksListResponse => ', props.getBooksListResponse)
            if (refreshing) setBooksList(props.getBooksListResponse.data)
            else setBooksList(prevState => [...prevState, ...props.getBooksListResponse.data])
            // setLoadmore(false)
        }
        setRefreshing(false)
    }, [props.getBooksListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetBooksList({ pageno, limit });
        console.log('_handleRefresh ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetBooksList({ pageno: pageno + 1, limit });
        if(!loadmore){
            console.log('_handleLoadMore ');
            props.GetBooksList({ pageno: pageno + 1, limit });
            setLoadmore(false)
        }
    }

    return <SafeAreaView style={{ flex: 1 }}>
        <FlatList
            style={{ padding: 15,  }}
            // horizontal
            // snapToInterval={width / 2}
            // scrollEnabled
            // scrollEventThrottle={16}
            columnWrapperStyle={{ justifyContent: isIPad ? 'flex-start' : 'space-between' }}
            numColumns={isIPad ? 3 : 2}
            showsVerticleScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={_handleRefresh}
            ListFooterComponent={() => loadmore ? <View style={globalstyle.footerloadmore}>
                <ActivityIndicator size={Platform.OS == 'android' ? 25 : 'large'} color={colors.primary} />
                <Text style={globalstyle.footerloadingtext}>Loading</Text>
            </View> : <View style={{ height: 20 }} />}
            // onEndReachedThreshold={0.8}
            // onEndReached={_handleLoadMore}
            data={booksList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<BookBox key={index} item={item} width={isIPad ? (width / 3) - 17  : (width / 2) - 20} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getBooksListResponse: state.listingstate.getBooksListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetBooksList: bindActionCreators(GetBooksList, dispatch)
    }
}

export default connect(setStateToProps, mapDispatchToProps)(Books);

const styles = StyleSheet.create({
})