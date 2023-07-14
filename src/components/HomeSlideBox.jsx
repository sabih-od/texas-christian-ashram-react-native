import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad, width } from '../theme';

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
                style={[styles.sliderimage, //isIPad && { width: props.width }
                ]}
            >
                <View style={[styles.contentwidth, // isIPad && { width: props.width - 20 }
                ]}>
                    <Text style={styles.slidertitle}>{props.item.title}</Text>
                    <Text style={styles.sliderdescription}>{props.item.description}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export default HomeSlideBox;

const styles = StyleSheet.create({
    contentwidth: { position: 'absolute', bottom: isIPad ? 25 : 15, left: isIPad ? 25 : 15, width: width - 50 },
    slidertitle: { fontFamily: fonts.headingFont, color: colors.white, fontSize: isIPad ? 36 : 22, marginBottom: 4 },
    sliderdescription: { fontFamily: fonts.latoRegular, color: colors.white, fontSize: isIPad ? 20 : 14, },
    sliderimage: { height: isIPad ? 400 : 250, borderRadius: 10, overflow: 'hidden', width: width - 30, marginHorizontal: 5 }
})