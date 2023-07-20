import { LOGOUT_USER, SET_IS_LOGIN, SET_USER_INFO, UPDATE_CURRENT_SCREEN, UPDATE_FCM_TOKEN, UPDATE_NOTIFICATION_BADGE, UPDATE_MESSAGE_BADGE } from "../actiontypes";

export const initialState = {
    isLogin: false,
    fcmToken: '',
    currentScreen: '',
    userInfo: null,
    notificationBadge: 0,
    messageBadge: 0,
    accessToken: '',
    isLoading: false,
}

export function SetIsLogin(data) {
    return {
        type: SET_IS_LOGIN,
        payload: data
    }
}
export function SetUserInfo(data) {
    return {
        type: SET_USER_INFO,
        payload: data
    }
}
export function UpdateCurrentScreen(data) {
    return {
        type: UPDATE_CURRENT_SCREEN,
        payload: data
    }
}
export function UpdateNotificationBadge(data) {
    return {
        type: UPDATE_NOTIFICATION_BADGE,
        payload: data
    }
}
export function UpdateMessageBadge(data) {
    return {
        type: UPDATE_MESSAGE_BADGE,
        payload: data
    }
}
export function UpdateFcmToken(data) {
    return {
        type: UPDATE_FCM_TOKEN,
        payload: data
    }
}
export function LogOut(data) {
    return {
        type: LOGOUT_USER,
        payload: data
    }
}

const AppStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        case UPDATE_CURRENT_SCREEN:
            return {
                ...state,
                currentScreen: action.payload
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case UPDATE_FCM_TOKEN:
            return {
                ...state,
                fcmToken: action.payload
            }
        case UPDATE_NOTIFICATION_BADGE:
            return {
                ...state,
                notificationBadge: action.payload
            }
        case UPDATE_MESSAGE_BADGE:
            return {
                ...state,
                messageBadge: action.payload
            }
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}

export default AppStateReducer;