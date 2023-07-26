import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { bindActionCreators } from 'redux';
import { UnblockUserApiCall, BlockedUserListApiCall } from '../../redux/reducers/UserStateReducer';
import { connect } from 'react-redux';
import { colors, fonts } from '../../theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';


const BlockedUserItem = (props) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#f7f7f7', marginBottom: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image source={require('./../../../assets/images/dummy-profile-image.png')} style={{ width: 35, height: 35, borderRadius: 35, marginRight: 12, resizeMode: 'cover' }} />
                <Text style={{ fontFamily: fonts.latoBold, fontSize: 15 }}>John Martin</Text>
            </View>
            <TouchableOpacity
                onPress={() => { }}
                style={{ backgroundColor: colors.black, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}
            >
                <Icon name="x" style={{ color: colors.white, marginRight: 7 }} />
                <Text style={{ fontFamily: fonts.latoRegular, fontSize: 11, color: colors.white, textTransform: 'uppercase' }}>Unblock</Text>
            </TouchableOpacity>
        </View>
    )
}


const BlockedUsers = (props) => {

    const bottomSheetModalRef = useRef(null);
    const snapPoints = useMemo(() => ['10%', '50%'], []);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        // props.BlockedUserListApiCall()
    }, [])

    useEffect(() => {
        props.passReferenceToParent(bottomSheetModalRef.current);
    }, [props.passReferenceToParent]);


    const prevBlockUserResRef = useRef(props.blockUserResponse);
    useEffect(() => {
        if (props.blockUserResponse !== prevBlockUserResRef.current && props.blockUserResponse?.success) {
            prevBlockUserResRef.current = props.blockUserResponse;
            console.log('props.blockUserResponse => ', props.blockUserResponse);
            showToast('success', 'User unblocked successfully');
        }
    }, [props.blockUserResponse])

    const [blockedUsers, setBlockedUsers] = useState([]);
    const prevBlockedUsersListResRef = useRef(props.blockedUsersListResponse);
    useEffect(() => {
        if (props.blockedUsersListResponse !== prevBlockedUsersListResRef.current && props.blockedUsersListResponse?.success) {
            prevBlockedUsersListResRef.current = props.blockedUsersListResponse;
            console.log('props.blockedUsersListResponse => ', props.blockedUsersListResponse);
            setBlockedUsers(props.blockedUsersListResponse.data)
        }
    }, [props.blockedUsersListResponse])


    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
        >
            <View style={styles.contentContainer}>
                <BlockedUserItem />
                <BlockedUserItem />
                <BlockedUserItem />
                <BlockedUserItem />
            </View>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        // justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 20
        // alignItems: 'center',
    },
});

const setStateToProps = state => ({
    blockedUsersListResponse: state.userstate.blockedUsersListResponse,
    blockUserResponse: state.userstate.blockUserResponse
})

const mapDispatchToProps = dispatch => {
    return {
        BlockedUserListApiCall: bindActionCreators(BlockedUserListApiCall, dispatch),
        UnblockUserApiCall: bindActionCreators(UnblockUserApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(BlockedUsers);