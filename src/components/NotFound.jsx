import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { colors, fonts, isIPad } from "../theme";

const NotFound = ({ title }) => {
    return (<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <View style={{ alignItems: 'center', }}>
            <Icon name="info" style={{ marginBottom: 10, fontSize: isIPad ? 46 : 36, color: colors.orange }} />
            <Text style={{ fontFamily: fonts.latoRegular, fontSize: isIPad ? 18 : 16 }}>{title} Not Found</Text>
        </View>
    </View>)
}
export default NotFound;