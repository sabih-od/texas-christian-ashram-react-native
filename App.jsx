/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './src/navigation/Navigation';
import { colors, IOS, isIPad } from './src/theme';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/redux/store';
import Loader from './src/components/Loader';

// import Toast from 'react-native-toast-message';

import Toast from 'react-native-toast-message';
import { toastConfig } from './src/helpers/toastConfig';


function App() {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={IOS ? 'dark-content' : 'light-content'}
          backgroundColor={colors.green}
        />
        {/* <Loader /> */}
        <Navigation />
        <Toast config={toastConfig}
        />
      </PersistGate>
    </Provider>
  );
}

export default App;