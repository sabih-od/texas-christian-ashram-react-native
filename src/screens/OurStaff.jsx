import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, FlatList, TouchableOpacity, View } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import OurSpeakerBox from "../components/OurSpeakerBox";
import ourstaff from "../data/ourstaff";
import OurStaffBox from "../components/OurStaffBox";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { GetOurStaffList } from "../redux/reducers/ListingApiStateReducer";
import globalstyle from "../theme/style";
import { colors } from "../theme";

const itemslimit = 50;
const OurStaff = (props) => {
    const [ourStaff, setOurStaff] = useState([]);
    const [pageno, setPageno] = useState(1);
    const [limit, setLimit] = useState(itemslimit);
    const [refreshing, setRefreshing] = useState(false);
    const [loadmore, setLoadmore] = useState(false);
    const prevOurStaffListResponseResponseRef = useRef(props.getOurStaffListResponse);

    useEffect(() => {
        props.GetOurStaffList({ pageno, limit })
        console.log({ pageno, limit })
        return () => {
            console.log('Staff Unmount');
            setOurStaff([])
        }
    }, [])

    useEffect(() => {
        if (props.getOurStaffListResponse !== prevOurStaffListResponseResponseRef.current && props.getOurStaffListResponse.success && props.getOurStaffListResponse.data.length) {
            prevOurStaffListResponseResponseRef.current = props.getOurStaffListResponse;
            console.log('props.getOurStaffListResponse => ', props.getOurStaffListResponse)
            if (refreshing) setOurStaff(props.getOurStaffListResponse.data)
            else setOurStaff(prevState => [...prevState, ...props.getOurStaffListResponse.data])
        }
        setRefreshing(false)
        // setLoadmore(false)
    }, [props.getOurStaffListResponse])

    const _handleRefresh = () => {
        setRefreshing(true)
        setPageno(1);
        // setLimit(itemslimit);
        props.GetOurStaffList({ pageno, limit });
        console.log('_handleLoadMore ');
    }

    const _handleLoadMore = () => {
        setLoadmore(true)
        setPageno(prevState => prevState + 1);
        // props.GetOurStaffList({ pageno: pageno + 1, limit });
        if (!loadmore) {
            if (ourStaff.length < props.getOurStaffListResponse.total) {
                console.log('_handleLoadMore ');
                props.GetOurStaffList({ pageno: pageno + 1, limit });
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
            data={ourStaff}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => {
                return (<OurStaffBox key={index} item={item} navigation={props.navigation} />)
            }}
        />
    </SafeAreaView>
}




const setStateToProps = (state) => ({
    getOurStaffListResponse: state.listingstate.getOurStaffListResponse
})

const mapDispatchToProps = (dispatch) => {
    return {
        GetOurStaffList: bindActionCreators(GetOurStaffList, dispatch)
    }
}
export default connect(setStateToProps, mapDispatchToProps)(OurStaff);