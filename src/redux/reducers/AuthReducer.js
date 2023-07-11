import apiAction from "../../api/apiAction";
import { ForgetPassAPI, GetProfileAPI, LoginAPI, RegisterAPI, ResendOTPAPI, ResetPasswordAPI, SubmitOTPAPI } from "../../api/routes";
import { FORGET_PASSWORD_API_SUCCESS, GET_PROFILE_API_SUCCESS, GET_USER_INFO_SUCCESS, LOGIN_API_SUCCESS, LOGOUT_USER, REGISTER_API_SUCCESS, RESEND_OTP_API_SUCCESS, RESET_PASSWORD_API_SUCCESS, SET_ERROR, SUBMIT_OTP_API_SUCCESS } from "../actiontypes";

const initialState = {
    loginResponse: {},
    loginError: {},
    registerResponse: {},
    registerError: {},
    forgetPasswordResponse: {},
    forgetPasswordError: {},
    submitOtpResponse: {},
    resendOtpResponse: {},
    resetPasswordResponse: {},
    getUserProfileResponse: {},
}


// Login Api Call
export function LoginApiCall(params) {
    console.log('params => ', params);
    return apiAction({
        url: LoginAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: LOGIN_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

//Register Api Call
export function RegisterApiCall(params) {
    return apiAction({
        url: RegisterAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: REGISTER_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Forget Password Api Call
export function ForgetPasswordApiCall(params) {
    return apiAction({
        url: ForgetPassAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: FORGET_PASSWORD_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Submit OTP Api Call
export function SubmitOTPApiCall(params) {
    return apiAction({
        url: SubmitOTPAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: SUBMIT_OTP_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Resend OTP Api Call
export function ResendOTPApiCall(params) {
    return apiAction({
        url: ResendOTPAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: RESEND_OTP_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Reset Password Api Call
export function ResetPasswordApiCall(params) {
    return apiAction({
        url: ResetPasswordAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: RESET_PASSWORD_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Get Profile By User ID Api Call
export function GetProfileApiCall() {
    return apiAction({
        url: GetProfileAPI, // + '/' + userid,
        method: 'GET',
        // data: params,
        onSuccess: (response) => {
            return { type: GET_PROFILE_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

const AuthStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_API_SUCCESS:
            return Object.assign({}, state, {
                loginResponse: action.payload,
            });
        case REGISTER_API_SUCCESS:
            return Object.assign({}, state, {
                registerResponse: action.payload,
            });
        case FORGET_PASSWORD_API_SUCCESS:
            return Object.assign({}, state, {
                forgetPasswordResponse: action.payload,
            });
        case SUBMIT_OTP_API_SUCCESS:
            return Object.assign({}, state, {
                submitOtpResponse: action.payload,
            });
        case RESEND_OTP_API_SUCCESS:
            return Object.assign({}, state, {
                resendOtpResponse: action.payload,
            });
        case RESET_PASSWORD_API_SUCCESS:
            return Object.assign({}, state, {
                resetPasswordResponse: action.payload,
            });
        case GET_PROFILE_API_SUCCESS:
            return Object.assign({}, state, {
                getUserProfileResponse: action.payload,
            });
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}

export default AuthStateReducer;