import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width } from '../theme';

const Seperator = ({item}) => {
    return (
        <View style={{ width: width, height: 1, backgroundColor: '#ddd', marginBottom: 20 }} />
    )
}

export default Seperator;

const styles = StyleSheet.create({
})