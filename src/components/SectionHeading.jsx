import { ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { IOS, colors, fonts, isIPad } from '../theme';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

const SectionHeading = ({ title, viewall }) => {
    const navigation = useNavigation();
    if (viewall) {
        return <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: IOS ? isIPad ? 26 : 22 : 20, paddingVertical: 15, paddingTop: 20 }}>{title}</Text>
            {viewall && <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate(viewall)}
                style={{ backgroundColor: colors.green, width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 10, }}
            >
                {/* <Text style={{ color: colors.grey, fontFamily: fonts.latoRegular, fontSize: 12 }}>View All</Text> */}
                <Icon name={'arrow-right'} style={{ color: colors.white, fontSize: 15 }} />
            </TouchableOpacity>}
        </View>
    } else {
        return <Text style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: IOS ? isIPad ? 26 : 22 : 20, paddingVertical: 15, paddingTop: 20 }}>{title}</Text>
    }
}

export default SectionHeading;