import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width } from '../theme';

const HomeSlideBox = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
            }}>
            <ImageBackground
                // source={require('./../../assets/images/home-image.png')}
                source={{ uri: props.item.image }}
                defaultSource={require('./../../assets/images/home-slider-placeholder.png')}
                style={styles.sliderimage}
            >
                <View style={{ position: 'absolute', bottom: 15, left: 15, width: width - 50 }}>
                    <Text style={styles.slidertitle}>{props.item.title}</Text>
                    <Text style={styles.sliderdescription}>{props.item.description}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default HomeSlideBox;

const styles = StyleSheet.create({
    slidertitle: { fontFamily: fonts.headingFont, color: colors.white, fontSize: 22, },
    sliderdescription: { fontFamily: fonts.latoRegular, color: colors.white, fontSize: 14, },
    sliderimage: { height: 250, borderRadius: 10, overflow: 'hidden', width: width - 30, marginHorizontal: 5 }
})