import React from "react";
import { TouchableOpacity, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { colors } from "../../theme"
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalstyle from "../../theme/style";

const NotificationIcon = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                console.log('Notifications Clicked');
                props.navigation.navigate('Notifications');
            }}
            style={globalstyle.notibadge}>
            <Icon name={'bell'} size={20} color={colors.black} />
            {props.notificationBadge > 0 && <View style={globalstyle.badge}></View>}
        </TouchableOpacity>
    )
}

const setStateToProps = (state) => ({
    notificationBadge: state.appstate.notificationBadge
})

const mapDispatchToProps = (dispatch) => {
    return {
        //   LogOut: bindActionCreators(LogOut, dispatch),
    }
}

export default connect(setStateToProps, mapDispatchToProps)(NotificationIcon);

// const styles = StyleSheet.create({
//     badge: { backgroundColor: colors.orange, color: colors.white, position: 'absolute', width: 11, height: 11, top: 5, right: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderRadius: 10, zIndex: 1, fontSize: 12, fontFamily: fonts.primary, },
//     notibadge: { position: 'relative', width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', },
// });