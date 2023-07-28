import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad, width } from '../theme';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

const UpComingEventBox = (props) => {
    // console.log('props?.item?.image => ', props?.item?.image);
    return (
        <TouchableOpacity
            style={[{ marginBottom: 10, width: props.width ? props.width : '48%', }, isIPad && { marginRight: 15 }]}
            activeOpacity={0.8}
            onPress={() => {
                props.navigation.navigate('EventDetail', { item: props.item });
            }}>
            <Image
                source={{ uri: props?.item?.image }}
                defaultSource={require('./../../assets/images/event-placeholder.png')}
                style={{ height: isIPad ? ((width / 5)) : width / 3, borderRadius: 10, overflow: 'hidden', width: '100%' }}
            />
            <View style={styles.eventtitlerow}>
                <View
                //style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}
                >
                    {props?.item?.date_from && <View><Text style={styles.eventtime}>{moment.parseZone(props?.item?.date_from, 'YYYY-MM-DD').format('DD MMM, YYYY')}</Text></View>}
                    <Text style={styles.eventtitle}>{props?.item?.title}</Text>
                </View>
                {props?.item?.location && <View style={{ flexDirection: 'row', width: '90%' }}>
                    <Icon name={'map-pin'} style={styles.eventpinicon} />
                    <Text style={styles.eventlocation} numberOfLines={1}>{props?.item?.location}</Text>
                </View>}
            </View>
        </TouchableOpacity>
    )
}

export default UpComingEventBox;

const styles = StyleSheet.create({
    eventtime: { fontFamily: fonts.latoBold, fontSize: isIPad ? 14 : 11, color: colors.orange, marginTop: 5 },
    timeicon: {},
    eventtitlerow: { paddingVertical: 7 },
    eventtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 16, marginBottom: 3 },
    eventlocation: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 17 : 13, },
    eventpinicon: { color: colors.orange, marginRight: 5, marginTop: 2, fontSize: isIPad ? 17 : 13 }
})