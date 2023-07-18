import { Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { colors, fonts, height, isIPad } from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import globalstyle from '../../theme/style';

const TermsAndConditionsModal = ({ visible, setVisible }) => {
    // let [visibility, setVisiblity] = useState(visible ? visible : false)
    // useEffect(() => {
    //     setVisiblity(visible)
    //     return () => {
    //     };
    // }, [visible]);
    return (
        <Modal
            // animationType='fade'
            statusBarTranslucent={true}
            transparent={true}
            visible={visible}
            onRequestClose={() => { setVisible(false); }}
        >
            <View style={{ ...StyleSheet.absoluteFillObject, zIndex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => { setVisible(false) }} activeOpacity={1} style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></TouchableOpacity>
                <View style={{ backgroundColor: '#fff', borderRadius: 7, width: isIPad ? '80%' : '90%', height: height - 200, padding: 15 }}>
                    <Text style={styles.heading}>Terms And Conditions</Text>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ paddingTop: 5 }}>
                        <Text style={styles.paragraph}>1.{'  '}<Text style={styles.boldfont}>Terms of Use</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>These terms and conditions ("Terms") govern your use of the Texas Christian Ashram mobile application ("App") and the services provided by Texas Christian Ashram ("we," "us," or "our"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the App.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>2.{'  '}<Text style={styles.boldfont}>App Usage</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Eligibility</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Account Creation</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>To access certain features of the App, you may need to create an account. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur under your account.</Text>
                        <View style={{ height: 15 }} />
                        <Text style={styles.bold}>Prohibited Activities</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.bold}>You agree not to engage in any of the following activities while using the App:</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>a){' '} Violating any applicable laws or regulations;</Text>
                        <Text style={styles.paragraph}>b){' '} Impersonating any person or entity;</Text>
                        <Text style={styles.paragraph}>c){' '} Interfering with or disrupting the App's functionality;</Text>
                        <Text style={styles.paragraph}>d){' '} Uploading or transmitting any viruses, malware, or other harmful code;</Text>
                        <Text style={styles.paragraph}>e){' '} Collecting or harvesting any personally identifiable information from other users of the App;</Text>
                        <Text style={styles.paragraph}>f){' '} Using the App for any illegal or unauthorized purpose;</Text>
                        <Text style={styles.paragraph}>g){' '} Posting or transmitting any content that is unlawful, defamatory, or infringing upon the rights of others.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>3.{'  '}<Text style={styles.boldfont}>Intellectual Property</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>The App and its content, including but not limited to text, graphics, images, logos, and software, are the intellectual property of Texas Christian Ashram and are protected by applicable intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on any content from the App without our prior written consent.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>4.{'  '}<Text style={styles.boldfont}>Limitation of Liability</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Disclaimer of Warranties</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>The App is provided on an "as-is" and "as-available" basis without any warranties, express or implied. We do not warrant that the App will be error-free or uninterrupted or that any defects will be corrected.</Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.bold}>Limitation of Liability</Text>
                        <View style={{ height: 8 }} />
                        <Text style={styles.paragraph}>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use or inability to use the App.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>5.{'  '}<Text style={styles.boldfont}>Privacy</Text></Text>
                        <Text style={styles.paragraph}>We collect and process personal information in accordance with our Privacy Policy, which is incorporated by reference into these Terms. By using the App, you consent to the collection and processing of your personal information as described in the Privacy Policy.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>6.{'  '}<Text style={styles.boldfont}>Termination</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>We may terminate or suspend your access to the App at any time and for any reason without prior notice or liability.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>7.{'  '}<Text style={styles.boldfont}>Governing Law</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>These Terms shall be governed by and construed in accordance with the laws of the state of Texas, without regard to its conflict of laws principles.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>8.{'  '}<Text style={styles.boldfont}>Severability</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>9.{'  '}<Text style={styles.boldfont}>Changes to the Terms</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>We reserve the right to modify or update these Terms at any time without prior notice. The updated Terms will be posted on the App, and your continued use of the App after any such changes constitutes your acceptance of the modified Terms.</Text>
                        <View style={{ height: 20 }} />
                        <Text style={styles.paragraph}>10.{'  '}<Text style={styles.boldfont}>Contact Us</Text></Text>
                        <View style={{ height: 10 }} />
                        <Text style={styles.paragraph}>If you have any questions or concerns regarding these Terms, please contact us.</Text>
                        <Text style={styles.paragraph}>By using the Texas Christian Ashram mobile app, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.{'\n'}</Text>

                        {/* <Text style={styles.paragraph}>
                            1. <Text style={styles.boldfont}>Terms of Use</Text>{'\n\n'}
                            These terms and conditions ("Terms") govern your use of the Texas Christian Ashram mobile application ("App") and the services provided by Texas Christian Ashram ("we," "us," or "our"). By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, you may not use the App.{'\n\n'}
                            2. <Text style={styles.boldfont}>App Usage</Text>{'\n\n'}
                            <Text style={styles.bold}>Eligibility</Text>{'\n'}
                            You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.
                            Account Creation{'\n\n'}
                            To access certain features of the App, you may need to create an account. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and are solely responsible for all activities that occur under your account.
                            Prohibited Activities{'\n\n'}
                            <Text style={styles.bold}>You agree not to engage in any of the following activities while using the App:</Text>{'\n\n'}
                            <Text style={styles.bold}>a)</Text>{' '} Violating any applicable laws or regulations;{'\n'}
                            <Text style={styles.bold}>b)</Text>{' '} Impersonating any person or entity;{'\n'}
                            <Text style={styles.bold}>c)</Text>{' '} Interfering with or disrupting the App's functionality;{'\n'}
                            <Text style={styles.bold}>d)</Text>{' '} Uploading or transmitting any viruses, malware, or other harmful code;{'\n'}
                            <Text style={styles.bold}>e)</Text>{' '} Collecting or harvesting any personally identifiable information from other users of the App;{'\n'}
                            <Text style={styles.bold}>f)</Text>{' '} Using the App for any illegal or unauthorized purpose;{'\n'}
                            <Text style={styles.bold}>g)</Text>{' '} Posting or transmitting any content that is unlawful, defamatory, or infringing upon the rights of others.{'\n\n'}

                            3. <Text style={styles.boldfont}>Intellectual Property</Text>{'\n\n'}
                            The App and its content, including but not limited to text, graphics, images, logos, and software, are the intellectual property of Texas Christian Ashram and are protected by applicable intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on any content from the App without our prior written consent.{'\n\n'}
                            4. <Text style={styles.boldfont}>Limitation of Liability</Text>{'\n\n'}
                            Disclaimer of Warranties
                            The App is provided on an "as-is" and "as-available" basis without any warranties, express or implied. We do not warrant that the App will be error-free or uninterrupted or that any defects will be corrected.
                            Limitation of Liability{'\n\n'}
                            To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of or in connection with the use or inability to use the App.{'\n\n'}
                            5. <Text style={styles.boldfont}>Privacy</Text>{'\n\n'}
                            We collect and process personal information in accordance with our Privacy Policy, which is incorporated by reference into these Terms. By using the App, you consent to the collection and processing of your personal information as described in the Privacy Policy.{'\n\n'}
                            6. <Text style={styles.boldfont}>Termination</Text>{'\n\n'}
                            We may terminate or suspend your access to the App at any time and for any reason without prior notice or liability.{'\n\n'}
                            7. <Text style={styles.boldfont}>Governing Law</Text>{'\n\n'}
                            These Terms shall be governed by and construed in accordance with the laws of the state of Texas, without regard to its conflict of laws principles.{'\n\n'}
                            8. <Text style={styles.boldfont}>Severability</Text>{'\n\n'}
                            If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.{'\n\n'}
                            9. <Text style={styles.boldfont}>Changes to the Terms</Text>{'\n\n'}
                            We reserve the right to modify or update these Terms at any time without prior notice. The updated Terms will be posted on the App, and your continued use of the App after any such changes constitutes your acceptance of the modified Terms.{'\n\n'}
                            10. <Text style={styles.boldfont}>Contact Us</Text>{'\n\n'}
                            If you have any questions or concerns regarding these Terms, please contact us.{'\n'}
                            By using the Texas Christian Ashram mobile app, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.{'\n'}
                        </Text> */}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}
export default TermsAndConditionsModal;

const styles = StyleSheet.create({
    heading: { fontFamily: fonts.headingFont, fontSize: isIPad ? 28 : 20, paddingBottom: 15, textAlign: 'left' },
    paragraph: { fontFamily: fonts.latoRegular, lineHeight: isIPad ? 28 : 20, color: colors.grey, fontSize: isIPad ? 16 : 14 },
    boldfont: { fontFamily: fonts.headingFont, fontSize: isIPad ? 22 : 18, }, // '#BE1E2D'
    bold: { fontFamily: fonts.latoBold, fontSize: isIPad ? 16 : 14, }
})