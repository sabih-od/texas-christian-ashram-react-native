import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colors, fonts, isIPad, width } from '../theme';
import { Platform, Text, View } from 'react-native';

export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={[{ borderLeftColor: colors.green }, isIPad && {width: width - 200}]}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: isIPad ? 17 : 14,
                fontWeight: '700',
                fontFamily: fonts.latoRegular
            }}
            text2NumberOfLines={2}
            text2Style={{
                fontSize: isIPad ? 17 : 14,
                fontFamily: fonts.latoRegular,
                color: colors.grey
            }}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: isIPad ? 17 : 14,
                fontWeight: '700',
                fontFamily: fonts.latoRegular
            }}
            text2NumberOfLines={2}
            text2Style={{
                fontSize: isIPad ? 17 : 14,
                fontFamily: fonts.latoRegular,
                color: colors.grey
            }}
        />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    // tomatoToast: ({ text1, props }) => (
    //     <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
    //         <Text>{text1}</Text>
    //         <Text>{props.uuid}</Text>
    //     </View>
    // )
};


export const showToast = (type, message) => {
    Toast.show({
        type: type, // Can be 'success', 'error', 'info', or 'none'
        // text1: 'Success',
        text2: message,
        position: 'top', // Can be 'top', 'bottom', or 'center'
        visibilityTime: 3000, // Duration to show the toast message (in milliseconds)
        autoHide: true, // Automatically hide the toast after the duration
        topOffset: Platform.OS === 'ios' ? 60 : 30, // Additional offset from the top/bottom (in pixels)
        // bottomOffset: 40,
    });
};