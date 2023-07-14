import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import CameraModal from '../../components/modal/CameraModal';

// import auth from '@react-native-firebase/auth';
// import analytics from '@react-native-firebase/analytics';
// import database from '@react-native-firebase/database';

import { useForm } from 'react-hook-form';
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

const Profile = props => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [filePath, setFilePath] = useState(null);

  const handleCamera = value => {
    setShowModal(false);
    console.log('value => ', value);
    chooseFile(value);
  };

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const chooseFile = async isCamera => {
    var options = {
      title: 'Select Profile Picture',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: { skipBackup: true, path: 'images' },
    };

    // setTimeout(() => {
    //   launchCamera(
    //     options,
    //     // { saveToPhotos: true, mediaType: 'photo', includeBase64: true, maxHeight: 400, maxWidth: 400, },
    //     response => {
    //       // console.log({ response }); 
    //       if (response.didCancel) {
    //         console.log(' Photo picker didCancel');
    //       } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //       } else {
    //         console.log('ImagePicker: ', response);
    //         // setResponse(response)
    //       }
    //     });
    // }, 200);


    let response = {};
    if (isCamera) {
      console.log('launchCamera');
      await delay(200);
      response = await launchCamera(options);
      // response = setTimeout(() => { launchCamera(options) }, 200);
    } else {
      console.log('launchImageLibrary');
      await delay(200);
      response = await launchImageLibrary(options);
      // response = setTimeout(() => { launchImageLibrary(options) }, 200);
    }

    console.log('response here => ', response);
    if (Object.keys(response).length > 0) {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('response: ', response);
        setFilePath(response.assets[0]);
      }
    }
  };

  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState(props.userInfo);

  useEffect(() => {
    console.log('Profile props.userInfo => ', props.userInfo);
    setUser(props.userInfo);
  }, [props.userInfo])

  const [showPassword, setShowPassword] = useState(false);
  // const [showConfPassword, setShowConfPassword] = useState(false);

  const input01 = useRef();
  const input02 = useRef();
  const input03 = useRef();
  const input04 = useRef();
  const input05 = useRef();

  const prevUpdateProfilePicResRef = useRef(props.updateProfilePicResponse);
  const prevEditProfileResRef = useRef(props.editProfileResponse);
  const prevFilePathRef = useRef(filePath);
  const prevDeleteUserResRef = useRef(props.deleteUserResponse);

  const { handleSubmit, formState: { errors }, register, setValue, } = useForm();

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
    // console.log('props.updateProfilePicResponse => ', props.updateProfilePicResponse);
    if (props.updateProfilePicResponse !== prevUpdateProfilePicResRef.current && props.updateProfilePicResponse.success && props.updateProfilePicResponse?.data) {
      prevUpdateProfilePicResRef.current = props.updateProfilePicResponse;
      console.log('updateProfilePicResponse => ', props.updateProfilePicResponse,);
      if (props.updateProfilePicResponse?.data?.profile_picture) {
        console.log('set user profile pic => ', props.updateProfilePicResponse);
        props.SetUserInfo({ ...props.userInfo, profile_picture: props.updateProfilePicResponse?.data?.profile_picture, });
        showToast('success', 'Your profile picture updated successfully');
      }
    }
    isLoading(false);
  }, [props.updateProfilePicResponse]);

  const prevUpdateProfilePicErrorRef = useRef(props.updateProfilePicError);
  useEffect(() => {
    if (props.updateProfilePicError !== prevUpdateProfilePicErrorRef.current) {
      prevUpdateProfilePicErrorRef.current = props.updateProfilePicError;
      console.log('updateProfilePicError => ', props.updateProfilePicError);
      showToast('error', props.updateProfilePicError.message);
    }
    isLoading(false);
  }, [props.updateProfilePicError]);

  useEffect(() => {
    console.log('user => ', user);
  }, [user]);

  useEffect(() => {
    if (props.deleteUserResponse !== prevDeleteUserResRef.current && props.deleteUserResponse.success && props.deleteUserResponse?.data) {
      prevDeleteUserResRef.current = props.deleteUserResponse;
      console.log('deleteUserResponse => ', props.deleteUserResponse);
      props.LogOut();
      showToast('success', 'User deleted successfully');
    }
    isLoading(false);
  }, [props.deleteUserResponse]);


  useEffect(() => {
    if (props.editProfileResponse !== prevEditProfileResRef.current && props.editProfileResponse.success && props.editProfileResponse?.data) {
      prevEditProfileResRef.current = props.editProfileResponse?.data;
      console.log('props.editProfileResponse => ', props.editProfileResponse);
      props.SetUserInfo({
        ...props.userInfo,
        email: props.editProfileResponse?.data?.email,
        first_name: props.editProfileResponse?.data?.first_name,
        last_name: props.editProfileResponse?.data?.last_name,
        phone: props.editProfileResponse?.data?.phone,
      });
      showToast('success', 'Your profile updated successfully');
      isLoading(false);
      // if (props.editProfileResponse?.data?.profile_picture) {
      //   console.log('set user profile pic => ', props.editProfileResponse);
      //   // props.SetUserInfo({ ...props.userInfo, profile_picture: props.editProfileResponse?.data });
      // }
    }
  }, [props.editProfileResponse])

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

  return (
    <>
      <DeleteProfileConfirmationModal handleDeleteConfirmValue={_handleDeleteConfirmValue} visible={showConfirmationModal} setVisible={setShowConfirmationModal} />

      <Loader isLoading={loading} />
      <SafeAreaView style={styles.fullview}>
        <ImageBackground source={require('./../../../assets/images/background-with-img.png')}
          style={[globalstyle.authContainer, { justifyContent: 'center', paddingHorizontal: 15 }]}>
          <View style={styles.container}>
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
                {isEditable && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ borderWidth: 1, borderColor: colors.white, position: 'absolute', right: 5, bottom: 2, zIndex: 1, alignItems: 'center', justifyContent: 'center', width: 35, height: 35, borderRadius: 35, backgroundColor: colors.white, }}
                    onPress={() => {
                      setShowModal(true);
                    }}>
                    <Icon name="camera" size={17} color={colors.green} />
                  </TouchableOpacity>
                )}
              </View>


              <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'user'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.first_name} ${user?.last_name}`}</Text>
              </View>

              <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'mail'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.email}`}</Text>
              </View>

              <View style={globalstyle.inputbox}>
                <Icon color={colors.green} name={'phone'} size={18} />
                <Text style={globalstyle.inputfield}>{`${user?.phone}`}</Text>
              </View>

              <View style={{
                flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,
                //marginTop: 'auto' 
              }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    props.navigation.navigate('EditProfile')
                    // setShowConfirmationModal(true)
                  }}
                  style={[globalstyle.authSubmitButton, { width: '49%' }]}>
                  <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    setShowConfirmationModal(true)
                  }}
                  style={[globalstyle.authSubmitButton, { width: '49%', backgroundColor: colors.black, }]}>
                  <Text style={[globalstyle.authSubmitButtonText, { fontSize: isIPad ? 16 : 13 }]}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
  editProfileResponse: state.userstate.editProfileResponse,
  updateProfilePicResponse: state.userstate.updateProfilePicResponse,
  updateProfilePicError: state.userstate.updateProfilePicError,
  deleteUserResponse: state.userstate.deleteUserResponse,
});

const mapDispatchToProps = dispatch => {
  return {
    SetUserInfo: bindActionCreators(SetUserInfo, dispatch),
    EditProfileApiCall: bindActionCreators(EditProfileApiCall, dispatch),
    UpdateProfilePicApiCall: bindActionCreators(UpdateProfilePicApiCall, dispatch),
    DeleteUserApiCall: bindActionCreators(DeleteUserApiCall, dispatch),
    LogOut: bindActionCreators(LogOut, dispatch),
  };
};

export default connect(setStateToProps, mapDispatchToProps)(Profile);
