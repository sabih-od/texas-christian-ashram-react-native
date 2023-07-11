import { StyleSheet, Text } from "react-native";
import { colors, fonts, width } from "../../theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import globalstyle from "../../theme/style";

const DrawerItem = ({ item, navigation, activescreen }) => {
    // console.log('activescreen => ', activescreen)
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('Screens', { screen: item.nav });
                // logout() 
            }}
            style={[globalstyle.draweritemrow, { borderLeftColor: activescreen == item.nav ? colors.orange : 'transparent' }]}>
            {/* <Icon name={item.icon} style={{ color: colors.white, marginRight: 15 }} size={16} /> */}
            <Text style={globalstyle.draweritemtext}>{item.title}</Text>
            {/* <View style={{ width: 20, height: 20, backgroundColor: colors.orange, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.white, fontFamily: fonts.latoRegular, fontSize: 10 }}>12</Text>
        </View> */}
        </TouchableOpacity>
    )
}

export default DrawerItem;

const styles = StyleSheet.create({
    
})