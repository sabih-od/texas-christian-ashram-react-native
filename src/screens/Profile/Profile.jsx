import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View, Text, Image, TextInput, Platform, ImageBackground, } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
// import CameraModal from '../../components/modal/CameraModal';

// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

// import { useForm } from 'react-hook-form';
import globalstyle from '../../theme/style';
import { colors, fonts, isIPad } from '../../theme';
import { useRef } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeleteUserApiCall, EditProfileApiCall, UpdateProfilePicApiCall } from '../../redux/reducers/UserStateReducer';
import { LogOut, SetUserInfo } from '../../redux/reducers/AppStateReducer';
import { showToast } from '../../helpers/toastConfig';
import Loader from "../../components/Loader";
import DeleteProfileConfirmationModal from '../../components/modal/DeleteProfileConfirmationModal';
// import BlockedUsers from '../../components/bottom-sheet/BlockedUsers';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BlockedUsersListModal from '../../components/modal/BlockedUsersListModal';

const Profile = props => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const [user, setUser] = useState(props.userInfo);

  useEffect(() => {
    console.log('Profile props.userInfo => ', props.userInfo);
    setUser(props.userInfo);
  }, [props.userInfo])


  const prevFilePathRef = useRef(filePath);
  const prevDeleteUserResRef = useRef(props.deleteUserResponse);

  useEffect(() => {
    console.log('filePath => ', filePath);
    if (filePath != null && filePath != prevFilePathRef.current) {
      const formData = new FormData();
      formData.append('profile_picture', {
        name: filePath.fileName,
        type: filePath.type,
        uri: Platform.OS === 'android' ? filePath.uri : filePath.uri.replace('file://', '')
      });
      props.UpdateProfilePicApiCall(formData);
      isLoading(true);
    }
  }, [filePath]);

  useEffect(() => {
    console.log('user => ', user);
  }, [user]);

  useEffect(() => {
    if (props.deleteUserResponse !== prevDeleteUserResRef.current && props.deleteUserResponse?.success && props.deleteUserResponse?.data) {
      prevDeleteUserResRef.current = props.deleteUserResponse;
      console.log('deleteUserResponse => ', props.deleteUserResponse);
      props.LogOut();
      showToast('success', 'User deleted successfully');
    }
    isLoading(false);
  }, [props.deleteUserResponse]);


  // console.log('errors => ', errors);
  const [loading, isLoading] = useState(false);

  function _handleDeleteConfirmValue(value) {
    console.log('value => ', value);
    if (value) {
      isLoading(true);
      props.DeleteUserApiCall({ userid: props?.userInfo?.id })
    }
    setShowConfirmationModal(false)
  }

  const PROFILE_SQUARE = isIPad ? 170 : 140;



  // const bottomSheetModalRef = useRef(null);
  // const handleChildReference = (ref) => {
  //   bottomSheetModalRef.current = ref;
  // };

  const [showBlockedUsers, setShowBlockedUsers] = useState(false)

  return (
    <>
      <Loader isLoading={loading} />
      <SafeAreaView style={styles.fullview}>
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')}
          style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
          {/* <BottomSheetModalProvider> */}
          <View style={styles.container}>

            {/* <BlockedUsers passReferenceToParent={handleChildReference} /> */}
            <DeleteProfileConfirmationModal handleDeleteConfirmValue={_handleDeleteConfirmValue} visible={showConfirmationModal} setVisible={setShowConfirmationModal} />
            <BlockedUsersListModal visible={showBlockedUsers} setVisible={setShowBlockedUsers} />
            {/* <View style={{ backgroundColor: colors.green, height: 400, width: '100%', top: 0, position: 'absolute', }}></View> */}
            <View style={[{ paddingVertical: 20, paddingHorizontal: 15 }, isIPad && globalstyle.authscreencontainer, { marginTop: 'auto', marginBottom: 'auto' }]}>
              <View style={{ width: PROFILE_SQUARE, height: PROFILE_SQUARE, borderRadius: PROFILE_SQUARE, marginLeft: 'auto', marginRight: 'auto', marginVertical: 20, position: 'relative', backgroundColor: '#ddd', borderColor: colors.white, borderWidth: 2 }}>
                <Image
                  source={
                    filePath?.uri
                      ? { uri: filePath?.uri }
                      : user?.profile_picture
                        ? { uri: user?.profile_picture }
                        : require('./../../../assets/images/dummy-profile-image.png')
                    // { uri: user?.profilepic }
                    // require('./../../assets/images/profile-image.jpg')
                  }
                  defaultSource={require('./../../../assets/images/speaker-placeholder.png')}
                  style={{ width: '100%', height: '100%', borderRadius: 120, resizeMode: 'cover', }}
                />
              </View>


              <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'user'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.first_name} ${user?.last_name}`}</Text>
              </View>

              <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'mail'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.email}`}</Text>
              </View>

              {user?.phone && <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'phone'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.phone}`}</Text>
              </View>}

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
                //marginTop: 'auto' 
              }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    // props.navigation.navigate('EditProfile')
                    // bottomSheetModalRef.current?.present()
                    setShowBlockedUsers(true)
                    // setShowConfirmationModal(true)
                  }}
                  style={[globalstyle.authSubmitButton, { width: '49%', backgroundColor: colors.orange }]}>
                  <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Blocked Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    props.navigation.navigate('EditProfile')
                    // setShowConfirmationModal(true)
                  }}
                  style={[globalstyle.authSubmitButton, { width: '49%', backgroundColor: colors.black }]}>
                  <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Edit Profile</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      setShowConfirmationModal(true)
                    }}
                    style={[globalstyle.authSubmitButton, { width: '49%', backgroundColor: colors.black, }]}>
                    <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Delete Account</Text>
                  </TouchableOpacity> */}
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setShowConfirmationModal(true)
            }}
            style={[globalstyle.authSubmitButton, globalstyle.authscreencontainer, { width: '100%', backgroundColor: colors.black, marginBottom: 15 }]}>
            <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Delete Account</Text>
          </TouchableOpacity>
          {/* </BottomSheetModalProvider> */}
        </ImageBackground>
      </SafeAreaView >
    </>
  );
};

const styles = StyleSheet.create({
  fullview: { flex: 1 },
  container: { flex: 1 },
  checkboxtick: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  labelinput: { fontFamily: fonts.latoRegular, fontSize: 13, color: '#000' },
});

const setStateToProps = state => ({
  userInfo: state.appstate.userInfo,
  deleteUserResponse: state.userstate.deleteUserResponse,
});

const mapDispatchToProps = dispatch => {
  return {
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    DeleteUserApiCall: bindActionCreators(DeleteUserApiCall, dispatch),
    LogOut: bindActionCreators(LogOut, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(Profile);
