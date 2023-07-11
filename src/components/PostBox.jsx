import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';
import postslist from '../data/postslist';
import { useState } from 'react';
import moment from 'moment';

const PostBox = ({ item, width, navigation }) => {
    // console.log(item.created_at)
    return (
        <TouchableOpacity
            style={{ marginBottom: 15, width: width ? width : '48%' }}
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
                <Text numberOfLines={1} style={[styles.postboxtitle, { marginBottom: 3 }]}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.postdesc}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default PostBox;

const styles = StyleSheet.create({
    postboxtitle: { fontFamily: fonts.headingFont, color: colors.black, fontSize: 16, },
    postimage: { height: 130, borderRadius: 10, overflow: 'hidden', width: '100%' },
    postdesc: { fontFamily: fonts.latoRegular, color: colors.grey, fontSize: 13, },
    eventtime: { fontFamily: fonts.latoBold, fontSize: 11, color: colors.orange, marginTop: 3 },
})