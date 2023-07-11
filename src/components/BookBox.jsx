import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../theme';

const BookBox = ({ item, navigation }) => {
    console.log('item => ', item);
    return (
        <View style={{ width: '48%', padding: 10, paddingBottom: 0, marginBottom: 25, borderRadius: 8, backgroundColor: colors.white }} >
            <Image
                // source={{ uri: item.image }} 
                source={{ uri: item.image }}
                // onError={(error) => console.log('Image failed to load:', error)}
                // onLoad={() => console.log('Image loading:')}
                defaultSource={require('./../../assets/images/book-placeholder.png')}
                style={styles.bookimage} />
            <View style={styles.bookinfo}>
                <Text style={styles.booktitle}>{item.title}</Text>
                <TouchableOpacity
                    style={styles.readmore}
                    activeOpacity={0.8}
                    onPress={() => {
                        navigation.navigate('PdfView', { file: item.file, title: item.title })
                    }}>
                    <Text style={styles.readmoretext} numberOfLines={1}>Read More</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default BookBox;

const styles = StyleSheet.create({
    booktitle: { fontFamily: fonts.latoBold, color: colors.black, fontSize: 14, marginBottom: 10, textTransform: 'capitalize' },
    bookimage: { height: 230, borderRadius: 5, overflow: 'hidden', width: '100%' },
    bookinfo: { paddingVertical: 10, alignItems: 'center' },
    readmoretext: { fontFamily: fonts.latoBold, color: colors.white, fontSize: 12, textTransform: 'uppercase' },
    readmore: { position: 'absolute', bottom: -12, backgroundColor: colors.green, width: 100, height: 25, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
})