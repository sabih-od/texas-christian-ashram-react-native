import { combineReducers } from 'redux';
import AppStateReducer from './reducers/AppStateReducer';
import AuthStateReducer from './reducers/AuthReducer';
import UserStateReducer from './reducers/UserStateReducer';
import ListingApiStateReducer from './reducers/ListingApiStateReducer';
import ChatStateReducer from './reducers/ChatStateReducer';
import DetailPageStateReducer from './reducers/DetailPageStateReducer';

const reducer = combineReducers({
    appstate: AppStateReducer,
    authstate: AuthStateReducer,
    userstate: UserStateReducer,
    listingstate: ListingApiStateReducer,
    detailpagestate: DetailPageStateReducer,
    chatstate: ChatStateReducer,
});

export default reducer;