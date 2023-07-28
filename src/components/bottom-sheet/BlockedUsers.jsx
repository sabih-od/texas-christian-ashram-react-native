import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { bindActionCreators } from 'redux';
import { UnblockUserApiCall, BlockedUserListApiCall } from '../../redux/reducers/UserStateReducer';
import { connect } from 'react-redux';
import { colors, fonts, width } from '../../theme';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { showToast } from '../../helpers/toastConfig';


const BlockedUserItem = ({ item, index, handleRemove }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: (index % 2 == 0) ? '#f7f7f7' : '#fff', borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                <Image source={item?.profile_picture ? { uri: item?.profile_picture } : require('./../../../assets/images/dummy-profile-image.png')} style={{ width: 35, height: 35, borderRadius: 35, marginRight: 12, resizeMode: 'cover' }} />
                <Text style={{ fontFamily: fonts.latoRegular, fontSize: 15 }}>{`${item?.first_name} ${item?.last_name}`}</Text>
            </View>
            <TouchableOpacity
                onPress={() => handleRemove(item?.id)}
                style={{
                    backgroundColor: colors.green,
                    width: 25, height: 25, borderRadius: 10,
                    // paddingHorizontal: 9, paddingVertical: 6, borderRadius: 5, 
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Icon name="x" style={{
                    color: colors.white,
                    // marginRight: 7 
                }} />
                {/* <Text style={{ fontFamily: fonts.latoRegular, fontSize: 11, color: colors.white, textTransform: 'uppercase' }}>Unblock</Text> */}
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
        props.BlockedUserListApiCall()
    }, [])

    useEffect(() => {
        props.passReferenceToParent(bottomSheetModalRef.current);
    }, [props.passReferenceToParent]);


    const prevUnblockUserResRef = useRef(props.unblockUserResponse);
    useEffect(() => {
        if (props.unblockUserResponse !== prevUnblockUserResRef.current && props.unblockUserResponse?.success) {
            prevUnblockUserResRef.current = props.unblockUserResponse;
            console.log('props.unblockUserResponse => ', props.unblockUserResponse);
            showToast('success', props.unblockUserResponse?.message);
            props.BlockedUserListApiCall()
        }
    }, [props.unblockUserResponse])

    const [blockedUsers, setBlockedUsers] = useState([]);
    const [filterBlockedUsers, setFilterBlockedUsers] = useState([]);
    const prevBlockedUsersListResRef = useRef(props.blockedUsersListResponse);

    useEffect(() => {
        console.log('props.blockedUsersListResponse => ', props.blockedUsersListResponse);
        if (props.blockedUsersListResponse !== prevBlockedUsersListResRef.current && props.blockedUsersListResponse?.success) {
            prevBlockedUsersListResRef.current = props.blockedUsersListResponse;
            console.log('props.blockedUsersListResponse => ', props.blockedUsersListResponse);
            setBlockedUsers(props.blockedUsersListResponse.data)
            setFilterBlockedUsers(props.blockedUsersListResponse.data)
        }
    }, [props.blockedUsersListResponse])

    function _handleSearch(text) {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = blockedUsers.filter(function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.first_name.toUpperCase() + " " + item.last_name.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterBlockedUsers(newData);
            // setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilterBlockedUsers(blockedUsers);
            // setSearch(text);
        }
    }

    function _handleRemove(id) {
        console.log('id => ', id)
        props.UnblockUserApiCall({ user_id: id })
    }

    return (
        <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
        >
            <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 40, borderRadius: 5, backgroundColor: '#eee', overflow: 'hidden', }}>
                    <View style={{ width: 40, alignItems: 'center' }}><Icon name='search' style={{ color: '#999', fontSize: 16 }} /></View>
                    <TextInput
                        placeholder='Search User..'
                        style={{ width: width - 80, paddingVertical: 10, fontFamily: fonts.latoRegular }}
                        placeholderTextColor={'#999'}
                        onChangeText={value => _handleSearch(value)}
                    />
                </View>
                <BottomSheetFlatList
                    style={{ marginTop: 15 }}
                    data={filterBlockedUsers}
                    keyExtractor={(item) => String(item?.id)}
                    renderItem={({ item, index }) => <BlockedUserItem item={item} index={index} handleRemove={_handleRemove} />}
                // contentContainerStyle={styles.contentContainer}
                />
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
    unblockUserResponse: state.userstate.unblockUserResponse
})

const mapDispatchToProps = dispatch => {
    return {
        BlockedUserListApiCall: bindActionCreators(BlockedUserListApiCall, dispatch),
        UnblockUserApiCall: bindActionCreators(UnblockUserApiCall, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(BlockedUsers);