import React from "react";
import { Keyboard, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import { colors, fontcolor } from "../../theme"

const DrawerIcon = ({ navigation }) => {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            Keyboard.dismiss();
            navigation.openDrawer();
        }}
        style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
        <Icon name={'align-right'} size={22} color={fontcolor} />
    </TouchableOpacity >)
}

export default DrawerIcon;