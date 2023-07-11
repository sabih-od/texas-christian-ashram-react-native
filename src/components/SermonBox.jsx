import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import Icon from 'react-native-vector-icons/Entypo';

const SermonBox = ({ item, width, navigation }) => {
    return (
        <TouchableOpacity
            style={{ marginBottom: 15, width: width ? width : '48%' }}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('Sermons');
            }}>
            <Image source={
                { uri: item?.image }
                // item.media
                // item?.image ?
                //     Number.isInteger(item?.image) ? item?.image : { uri: item?.media }
                // : require('./../../assets/images/post-01.png')
            }
                style={{ height: 130, borderRadius: 10, overflow: 'hidden', width: '100%' }}
            />
            <View
                style={{ paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flex: 0.8}}>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> */}
                    <Text numberOfLines={1} style={{ fontFamily: fonts.headingFont, color: colors.black, fontSize: 16, textTransform: 'capitalize'}}>{item.title}</Text>
                    {/* <Icon name={'arrow-right'} style={{ color: colors.orange, fontSize: 15 }} /> */}
                    {/* </View> */}
                    {/* <Text style={{ fontFamily: fonts.latoRegular, color: colors.grey, fontSize: 13, }} numberOfLines={1}>{'meditaion - 8 - 9 min'}</Text> */}
                </View>
                <View style={{ width: 30, height: 30, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.green }}>
                    <Icon name={'controller-play'} style={{ color: colors.white, fontSize: 20, marginRight: -2 }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SermonBox;