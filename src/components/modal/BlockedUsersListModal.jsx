import { ActivityIndicator, FlatList, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, isIPad, width } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';
import { BlockedUserListApiCall, UnblockUserApiCall } from '../../redux/reducers/UserStateReducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BlockedUserItem from '../BlockedUserItem';
import { showToast } from '../../helpers/toastConfig';

const BlockedUsersListModal = (props) => {

    const [blockedUsers, setBlockedUsers] = useState([]);
    const [filterBlockedUsers, setFilterBlockedUsers] = useState([]);
    const [loading, isLoading] = useState([]);
    const prevBlockedUsersListResRef = useRef(props.blockedUsersListResponse);
    const prevUnblockUserResRef = useRef(props.unblockUserResponse);

    // useEffect(() => {
    //     setBlockedUsers([]);
    //     setFilterBlockedUsers([]);
    // }, [])

    useEffect(() => {
        if (props.visible) {
            isLoading(true);
            props.BlockedUserListApiCall();
        }
        console.log('erer => ', props);
    }, [props.visible]);

    useEffect(() => {
        if (props.unblockUserResponse !== prevUnblockUserResRef.current && props.unblockUserResponse?.success) {
            prevUnblockUserResRef.current = props.unblockUserResponse;
            console.log('props.unblockUserResponse => ', props.unblockUserResponse);
            showToast('success', props.unblockUserResponse?.message);
            isLoading(true);
            props.BlockedUserListApiCall()
        }
    }, [props.unblockUserResponse])

    useEffect(() => {
        console.log('props.blockedUsersListResponse => ', props.blockedUsersListResponse);
        if (props.blockedUsersListResponse !== prevBlockedUsersListResRef.current && props.blockedUsersListResponse?.success) {
            prevBlockedUsersListResRef.current = props.blockedUsersListResponse;
            console.log('props.blockedUsersListResponse => ', props.blockedUsersListResponse);
            isLoading(false);
            setBlockedUsers(props.blockedUsersListResponse.data)
            setFilterBlockedUsers(props.blockedUsersListResponse.data)
        }
    }, [props.blockedUsersListResponse])

    const _handleSearch = (text) => {
        if (text && text != '') {
            const newData = blockedUsers.filter(function (item) {
                const itemData = item.first_name.toUpperCase() + " " + item.last_name.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterBlockedUsers(newData);
        } else {
            setFilterBlockedUsers(blockedUsers);
        }
    }

    function _handleUnblock(id) {
        console.log('id => ', id)
        props.UnblockUserApiCall({ user_id: id })
    }

    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={props.visible}
            onRequestClose={() => { props.setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { props.setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, padding: 15, width: isIPad ? 470 : '90%', }}>
                    {loading && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator color={colors.green} />
                        <Text style={{ color: '#666', fontFamily: fonts.latoRegular, marginLeft: 10, fontSize: isIPad ? 16 : 14 }}>Loading. Please Wait...</Text>
                    </View>}
                    {blockedUsers.length > 0 &&
                        <View style={{ marginTop: loading ? 10 : 0, flexDirection: 'row', alignItems: 'center', width: isIPad ? 500 - 60 : width - 70, borderRadius: 5, marginBottom: 15, backgroundColor: '#f7f7f7', overflow: 'hidden', }}>
                            <View style={{ width: 50, alignItems: 'center' }}><Icon name='search' style={{ color: '#999', fontSize: 16 }} /></View>
                            <TextInput
                                placeholder='Search Blocked User..'
                                style={{ width: isIPad ? 500 - 110 : width - 120, paddingVertical: 15, fontFamily: fonts.latoRegular, fontSize: isIPad ? 17 : 14 }}
                                placeholderTextColor={'#999'}
                                onChangeText={value => _handleSearch(value)}
                            />
                        </View>}
                    <FlatList
                        style={{}}
                        data={filterBlockedUsers}
                        ListEmptyComponent={!loading && <View style={{ alignItems: 'center', padding: 10 }}>
                            <Icon name="alert-triangle" style={{ fontSize: isIPad ? 40 : 30, color: colors.orange, marginBottom: 10 }} />
                            <Text style={{ fontFamily: fonts.latoRegular, textAlign: 'center', color: colors.grey, fontSize: isIPad ? 16 : 14 }}>No record found</Text>
                        </View>}
                        keyExtractor={(item) => String(item?.id)}
                        renderItem={({ item, index }) => <BlockedUserItem item={item} index={index} handleUnblock={_handleUnblock} />}
                    // contentContainerStyle={styles.contentContainer}
                    />
                </View>
            </View>
        </Modal>
    )
}

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

export default connect(setStateToProps, mapDispatchToProps)(BlockedUsersListModal);

const styles = StyleSheet.create({
})