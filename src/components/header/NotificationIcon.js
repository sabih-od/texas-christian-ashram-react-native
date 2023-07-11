import React from "react";
import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { colors } from "../../theme"

const NotificationIcon = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: colors.orange, width: 36, height: 36, marginRight: 10, alignItems: 'center', justifyContent: 'center', borderRadius: 40, overflow: 'hidden', }}>
            <Icon name={'bell'} size={18} color={colors.white} />
        </TouchableOpacity>
    )
}

export default NotificationIcon;