import { ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { IOS, colors, fonts, isIPad } from '../theme';

const SectionHeading = ({title}) => {
    return <Text style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: IOS ? isIPad ? 26 : 22 : 20, paddingVertical: 15, paddingTop: 20 }}>{title}</Text>
}

export default SectionHeading;