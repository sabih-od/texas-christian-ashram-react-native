import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import NotFound from '../../components/NotFound';
import Loader from '../../components/Loader';


const BookDetail = (props) => {
    const [loading, isLoading] = useState(false)
    useEffect(() => {
        isLoading(true);
        props.navigation.setOptions({ headerTitle: props.route.params?.title });
        if(!props.route.params?.url){
            isLoading(false)
        }
    }, [])

    return (
        <>
            {loading && <Loader isLoading={loading} />}
            {props.route.params?.url && <WebView
                onLoad={() => isLoading(false)}
                // bounces={false}
                // javaScriptEnabled
                // source={{
                //     html: `
                //           <!DOCTYPE html>
                //           <html>
                //             <head></head> // <--add header styles if needed
                //             <body>
                //               <div id="baseDiv">${iframeString}</div> //<--- add your iframe here
                //             </body>
                //           </html>
                //     `,
                // }}
                // scrollEnabled={true}
                // automaticallyAdjustContentInsets={false}
                source={{ uri: props.route.params?.url }} style={{ flex: 1 }}
            />}
            {!props.route.params?.url && <NotFound title={'Book Link'} />}
        </>
    )
}

export default BookDetail;
const styles = StyleSheet.create({

})