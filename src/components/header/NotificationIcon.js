import React from "react";
import { TouchableOpacity } from "react-native"
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
            {props.notificationBadge > 0 && <View style={styles.badge}></View>}
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