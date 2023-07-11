import React from "react";
import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-vector-icons/Feather"
import { colors, fontcolor } from "../../theme"

const DrawerIcon = (props) => {
    return (<TouchableOpacity activeOpacity={0.8}
        onPress={() => {
            console.log('props OpenDrawerIcon => ', props.navigation);
        }}
        style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
        <Icon name={'align-right'} size={22} color={fontcolor} />
    </TouchableOpacity >)
}

export default DrawerIcon;