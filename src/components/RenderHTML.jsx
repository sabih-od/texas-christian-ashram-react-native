import { useRef, useState } from "react";
import { ActivityIndicator, Linking, Text, View } from "react-native";
import WebView from "react-native-webview";
import { fonts, colors, isIPad } from "../theme";

const RenderHTML = ({ htmlcontent, htmlstyle }) => {

    const [renderLoading, setRenderLoading] = useState(true);
    const [webheight, setWebheight] = useState(webheight);
    const webview = useRef();

    //         const webViewScript = `
    //             setTimeout(function () {
    //                 window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight)
    //             }, 500)
    //         true; // note: this is required, or you'll sometimes get silent failures
    //         `;

    htmlcontent = htmlcontent?.replace(/<p>&nbsp;<\/p>/gim, '');

    if (htmlcontent) {

        let fontfamily = 'Lato'
        let fontFamilyHeading = 'Yeseva One'
        //var htmlcontent = htmlcontent.replace(/<p>\[embedpost.*p>/, " ");
        //body:before {content: ''; display: block; width: 100%; height: 100%; position: absolute; left: 0; top: 0;}
        let html = `<!DOCTYPE html>\
        <html>\
          <head>\
            <meta charset="utf-8">\
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\
            <link rel="preconnect" href="https://fonts.googleapis.com">\
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Yeseva+One&display=swap" rel="stylesheet">\
            </head>\
            <style>\
            *{ user-select: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; }\
            body, html {margin: 0; padding: 10px 10px; line-height: 1.5; font-family: ${fontfamily};  }\
            p{ font-family: ${fontfamily}; color: #444;font-size: ${isIPad ? '18px': '15px'};margin: 0px;margin: 10px 0;}\
            h1,h2,h3,h4{font-family: ${fontFamilyHeading};margin: 0px;font-weight: 500;line-height:1.3}\
            h3{font-size: 24px;}\
            h4{font-size: 20px;}\
            h5{font-size: 18px; margin: 0;}\
            h6{font-size: 16px; margin: 0;}\
            a{color: ${colors.green}; text-decoration: none;}\
            iframe{max-width: 100%;}\
            iframe[src*="https://www.facebook.com/plugins/video.php"] {width: 100%; height: 310px}\
            iframe[src*="https://www.youtube"] { width: 100% !important; height: 200px; }\
            video, .wp-video{ width: 100% !important; height: auto !important;}
            table{width: 100%;border-collapse: collapse;border-spacing: 0;}
            table th { background:  ${colors.green}; color: #fff; text-transform: capitalize;padding: 5px; text-align: left; font-size: 13px; border: 0;}\
            table td { border: 1px solid #ddd; padding: 5px; font-size: 13px; }\
            ul li {color: #333;}
            ul { margin: 0px; padding: 0px; list-style: none; z-index: 0;padding-left: 18px; margin-bottom: 15px; } hr {margin: 20px 0;}
            ul li:before {content: '';display: inline-block;vertical-align: middle;width: 7px;height: 7px;margin-right: 10px;background: #c72026;border-radius: 16px;margin-left: -17px;}
            figure {width: 100%;margin: 10px 0;} img {width: 100%; height: auto;} strong{font-weight: 500; color: #111;}\
            ${htmlstyle}
            </style>\                  
            <script src="ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>\
            <script>
            setTimeout(function(){
                window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight)
            }, 5000)
            </script>              
            <body>\                
              ${htmlcontent}\
            </body>\
        </html>`
        return (
            <View style={{ flex: 1 }}>
                <WebView
                    source={{ html: html }}
                    onMessage={event => {
                        console.log('event.nativeEvent -> ', event.nativeEvent)
                        setWebheight(parseInt(event.nativeEvent.data));
                        setRenderLoading(false)
                    }}
                    style={{
                        height: webheight,
                        //backgroundColor: 'transparent', 
                        // backgroundColor: '#f2f2f2',
                        fontFamily: fonts.latoRegular
                    }}
                    scrollEnabled={false}
                    javaScriptEnabled={true}
                    //injectedJavaScript={webViewScript}
                    automaticallyAdjustContentInsets={false}
                    ref={webview}
                    onOpenWindow={(syntheticEvent) => {
                        const { nativeEvent } = syntheticEvent;
                        const { targetUrl } = nativeEvent
                        console.log('Intercepted OpenWindow for', targetUrl)
                    }}
                onNavigationStateChange={(event) => {
                    //console.log('event.url => ', event.url)
                    if (event.url !== 'about:blank') {
                        if (event.url.includes("https://www.google.com")) {
                            // this.setState({ postLoading: true, renderLoading: true, webheight: 300 });
                            // this.props.GetPostByUrlHit({ url: event.url })
                        } else {
                            webview.current.stopLoading();
                            Linking.openURL(event.url);
                        }
                    }
                }}
                />
                {/* {this.state.renderLoading &&
                    <View style={{ paddingVertical: 15, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="small" color={colors.primary} />
                        <Text style={{ color: colors.primary, fontFamily: fonts.latoRegular, marginLeft: 5, fontSize: 15 }}>Loading...</Text>
                    </View>} */}

                {renderLoading &&
                    <View style={{ alignItems: 'center', marginVertical: 20 }}>
                        <ActivityIndicator color={colors.green} />
                        <Text style={{ color: colors.grey, fontFamily: fonts.latoRegular, marginTop: 15, fontSize: 15 }}>{'Loading Content...'}</Text>
                    </View>}
            </View>
        )
    }
}

export default RenderHTML;