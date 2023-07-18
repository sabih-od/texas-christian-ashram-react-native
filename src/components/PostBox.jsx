import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts, isIPad } from '../theme';
import postslist from '../data/postslist';
import { useState } from 'react';
import moment from 'moment';

const PostBox = ({ item, width, navigation, marginfalse }) => {
    // console.log(item.created_at)
    return (
        <TouchableOpacity
            style={[{ marginBottom: 10, width: width ? width : '48%', }, isIPad && !marginfalse && { marginRight: 10 }]}
            activeOpacity={0.8}
            onPress={() => {
                navigation.navigate('PostDetail', { item: item });
            }}>
            <Image
                source={{ uri: item?.media }}
                defaultSource={require('./../../assets/images/event-placeholder.png')}
                style={styles.postimage}
            />
            {/* <Image source={
                item?.image ?
                    Number.isInteger(item?.image) ? item?.image : { uri: item?.media }
                    : require('./../../assets/images/post-01.png')
            }
                style={{ height: 130, borderRadius: 10, overflow: 'hidden', width: '100%' }}
            /> */}
            <View style={{ paddingVertical: 10 }}>
                <Text style={styles.eventtime}>{moment(parseInt(item.created_at)).format("DD MMM, YYYY")}</Text>
                <Text numberOfLines={2} style={[styles.postboxtitle, { marginBottom: 3 }]}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.postdesc}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostBox;

const styles = StyleSheet.create({
    postboxtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: isIPad ? 22 : 16, },
    postimage: { height: 130, borderRadius: 10, overflow: 'hidden', width: '100%' },
    postdesc: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: isIPad ? 18 : 13, },
    eventtime: { fontFamily: fonts.latoBold, fontSize: isIPad ? 14 : 11, color: colors.orange, marginTop: 3 },
})