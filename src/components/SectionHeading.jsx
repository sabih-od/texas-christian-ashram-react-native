import { ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';

const SectionHeading = ({title}) => {
    return <Text style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: Platform.OS === 'ios' ? 22 : 20, paddingVertical: 15 }}>{title}</Text>
}

export default SectionHeading;