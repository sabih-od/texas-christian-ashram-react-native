import { NativeModules, Platform } from 'react-native';
import { store } from '../redux/store';
// import { LoadingStart, LoadingEnd } from './../state';
// inspired by https://leanpub.com/redux-book
import axios from 'axios';
// import { showToast } from '../helpers/toastConfig';

export const API_REQUEST = "API_REQUEST";
const API_START = "API_START";
const API_END = "API_END";
const ACCESS_DENIED = "ACCESS_DENIED";
const API_ERROR = "API_ERROR";

const apiStart = label => ({
  type: API_START,
  payload: label
});
const apiEnd = label => ({
  type: API_END,
  payload: label
});
const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});
const apiError = error => ({
  type: API_ERROR,
  error
});


const apiMiddleware = ({ dispatch }) => next => action => {

  let cancel;

  next(action);

  console.log('action => ', action);


  if (action.type !== API_REQUEST) return;

  const { url, method, data, accessToken, onSuccess, onFailure, label, headers, headersOverride, } = action.payload;

  // Create a new cancellation token
  const source = axios.CancelToken.source();

  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  const state = store.getState();
  // console.log('state => ', state);

  console.log('process.env.API_BASE_URL => ', process.env.API_BASE_URL);
  // console.log(`Bearer ${state?.appstate?.userInfo?.access_token}`);

  // axios default configs
  axios.defaults.baseURL = process.env.API_BASE_URL ? process.env.API_BASE_URL : 'https://texaschristianashram.org:3023' // 'http://service.demowebsitelinks.com:3023';
  if(state?.appstate?.isLogin) axios.defaults.headers.common['Authorization'] = `Bearer ${state?.appstate?.userInfo?.access_token}`;

  // if (Platform.OS === 'android') {

  //   // Disable SSL verification only for Android
  //   const { XMLHttpRequest } = require('react-native');
  //   XMLHttpRequest.prototype.open = function () {
  //     if (arguments[1].startsWith('https')) {
  //       arguments[1] = arguments[1].replace('https', 'http');
  //     }
  //     return this.origOpen.apply(this, arguments);
  //   };

  //   // const { SSLPinning } = NativeModules;
  //   // SSLPinning.disableSSLPinning();

  //   // axios.defaults.httpsAgent = new https.Agent({
  //   //   rejectUnauthorized: false
  //   // });
  // }

  console.log(' axios.defaults.baseURL => ',  axios.defaults.baseURL)

  if (headersOverride) {
    axios.defaults.headers.common["Content-Type"] = 'multipart/form-data';
  } else {
    axios.defaults.headers.common["Content-Type"] = 'application/json';
  }

  console.log('data => ', data);

  if (label) {
    dispatch(apiStart(label));
  }

  // dispatch(LoadingStart(''));

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data,
    })
    .then(({ data }) => {
      console.log(`API: ${url} => `, data);
      dispatch(onSuccess(data));
    })
    .catch(error => {
      console.log('APIERROR => ', error.message);
      console.log('API Error message_to_show => ', error?.response)

      // dispatch(apiError(error));
      // showToast('error', props.loginError?.message)
      dispatch(onFailure(error));
      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      // dispatch(LoadingEnd(''));
      if (label) {
        dispatch(apiEnd(label));
      }
    });

  // Store the cancellation function to cancel the API call if needed
  // cancel = source.cancel;
};

export default apiMiddleware;
