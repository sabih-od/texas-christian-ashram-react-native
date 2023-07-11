import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import apiMiddleware from '../api/apimiddleware';

// const middleware = [thunk];
const persistConfig = {
    key: 'root',
    // storage,
    storage: AsyncStorage,
    timeout: null,
    blacklist: [
    ]
};


// if (process.env.NODE_ENV === `development`) {
//     // const { logger } = require(`redux-logger`);
//     const logger = createLogger({
//         predicate, // if specified this function will be called before each action is processed with this middleware.
//         collapsed, // takes a Boolean or optionally a Function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise.
//     });
//     middleware.push(logger)
// }


const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk, apiMiddleware, logger))
export const persistor = persistStore(store);