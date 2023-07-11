import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, width } from '../theme';
import Icon from 'react-native-vector-icons/Feather';

const UpComingEventBox = (props) => {
    // console.log('props?.item?.image => ', props?.item?.image);
    return (
        <TouchableOpacity
            style={{ marginBottom: 10, width: props.width ? props.width : '48%' }}
            activeOpacity={0.8}
            onPress={() => {
                props.navigation.navigate('EventDetail', { item: props.item });
            }}>
            <Image
                source={{ uri: props?.item?.image }}
                defaultSource={require('./../../assets/images/event-placeholder.png')}
                style={{ height: width / 3, borderRadius: 10, overflow: 'hidden', width: '100%' }}
            />
            <View style={styles.eventtitlerow}>
                <View
                //style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}
                >
                    <View><Text style={styles.eventtime}>July 15th, 2024</Text></View>
                    <Text style={styles.eventtitle}>{props?.item?.title ? props?.item?.title : 'Article'}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name={'map-pin'} style={styles.eventpinicon} />
                    <Text style={styles.eventlocation} numberOfLines={1}>{props?.item?.location ? props?.item?.location : 'C253 Martin Drive, New California, LA, USA'}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default UpComingEventBox;

const styles = StyleSheet.create({
    eventtime: { fontFamily: fonts.latoBold, fontSize: 11, color: colors.orange, marginTop: 5 },
    timeicon: {},
    eventtitlerow: { paddingVertical: 7 },
    eventtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 16, marginBottom: 3 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.black, fontSize: 13, },
    eventpinicon: { color: colors.orange, marginRight: 5, marginTop: 2, }
})