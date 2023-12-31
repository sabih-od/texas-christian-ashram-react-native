import React, { useRef } from "react";
import { SafeAreaView, ScrollView, View, Text, FlatList, ImageBackground, StyleSheet, Image, RefreshControl } from "react-native";
import { colors, fonts, height, isIPad, width } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";

import Icon from 'react-native-vector-icons/Feather';
import { useCallback, useEffect, useState } from "react";
import { GetOurStaffDetailApiCall } from "../../redux/reducers/DetailPageStateReducer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import globalstyle from "../../theme/style";

const OurStaffDetail = (props) => {

    const [refreshing, setRefreshing] = useState(false);
    const [item, setItem] = useState(props.route.params.item);

    const prevProps = useRef(props.getOurStaffDetailResponse);
    useEffect(() => {
        if (prevProps.current != props.getOurStaffDetailResponse && props.getOurStaffDetailResponse?.success && props.getOurStaffDetailResponse?.data) {
            setItem(props.getOurStaffDetailResponse?.data);
        }
        setRefreshing(false);
    }, [props.getOurStaffDetailResponse])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        props.GetOurStaffDetailApiCall(item.id)
        // setTimeout(() => {
        //     setRefreshing(false);
        // }, 2000);
    }, []);

    console.log('item => ', item);

    return <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ padding: 15 }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                <Image
                    source={{ uri: item.image }}
                    // onError={(error) => console.log('Image failed to load:', error)}
                    // onLoad={() => console.log('Image loading:' )}
                    defaultSource={require('./../../../assets/images/speaker-placeholder.png')}
                    style={globalstyle.speakerdetailimage}
                />
                <View style={{ width: width - 140 }}>
                    <Text style={globalstyle.speakerdetailheading}>{item.name}</Text>
                    {/* <Text style={{fontFamily: fonts.latoBold, color: colors.green, fontSize: 14}}>{item.designation}</Text> */}
                    {/* <Text style={[styles.paragraph, { marginTop: 7 }]} numberOfLines={3}>{item.description}</Text> */}
                </View>
            </View>
            <Text style={globalstyle.speakerdetailparagraph}>{item.description.replace(/\\n/g, '\n\n')}</Text>
            {/* <Text style={styles.paragraph}><Text style={styles.parabold}>Lorem Ipsum</Text> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text>
            <Text style={styles.paragraph}><Text style={styles.parabold}>Contrary to popular belief</Text> is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.</Text>
            <Text style={styles.paragraph}><Text style={styles.parabold}>Lorem Ipsum</Text> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Text> */}
            <View style={{ height: 20 }} />
        </ScrollView>
    </SafeAreaView>
}

const setStateToProps = (state) => ({
    getOurStaffDetailResponse: state.detailpagestate.getOurStaffDetailResponse,
})
const mapDispatchToProps = (dispatch) => {
    return {
        GetOurStaffDetailApiCall: bindActionCreators(GetOurStaffDetailApiCall, dispatch),
    }
}
export default connect(setStateToProps, mapDispatchToProps)(OurStaffDetail);
// export default OurStaffDetail;


const styles = StyleSheet.create({
    })