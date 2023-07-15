import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors } from "../../theme";

const GoBackIcon = ({ navigation }) => {
    return (<TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
            navigation.goBack();
        }}
        style={[{ padding: 10, paddingHorizontal: 15, borderRadius: 40, overflow: 'hidden', marginRight: 15 }]} >
        <Icon name={'chevron-left'} size={22} color={colors.black} />
    </TouchableOpacity >)
}

export default GoBackIcon;