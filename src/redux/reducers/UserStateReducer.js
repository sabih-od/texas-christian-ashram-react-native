import apiAction from "../../api/apiAction";
import { DeleteUserAPI, EditProfileAPI, ReportUserAPI, UpdateProfilePictureAPI } from "../../api/routes";
import { DELETE_USER_API_SUCCESS, EDIT_PROFILE_API_SUCCESS, LOGOUT_USER, REPORT_USER_API_SUCCESS, SET_ERROR, UPDATE_PROFILE_PIC_API_ERROR, UPDATE_PROFILE_PIC_API_SUCCESS } from "../actiontypes";

const initialState = {
    editProfileResponse: {},
    updateProfilePicResponse: {},
    updateProfilePicError: {},
    deleteUserResponse: {},
    reportUserResponse: {},
}

// Edit Profile Api Call
export function EditProfileApiCall(userid, params) {
    return apiAction({
        url: EditProfileAPI, // + '/' + userid,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: EDIT_PROFILE_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

//Delete User Api Call
export function DeleteUserApiCall(params) {
    return apiAction({
        url: DeleteUserAPI + '/' + params.userid,
        method: 'DELETE',
        // data: params,
        onSuccess: (response) => {
            return { type: DELETE_USER_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Edit Profile Api Call
export function UpdateProfilePicApiCall(params) {
    return apiAction({
        url: UpdateProfilePictureAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: UPDATE_PROFILE_PIC_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            console.log('Error Response => ', response);
            return { type: UPDATE_PROFILE_PIC_API_ERROR, payload: response };
        },
        headersOverride: true
    });
}

// Edit Profile Api Call
export function ReportUserApiCall(params) {
    return apiAction({
        url: ReportUserAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: REPORT_USER_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            console.log('Error Response => ', response);
            return { type: SET_ERROR, payload: response };
        },
    });
}

const UserStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_API_SUCCESS:
            return Object.assign({}, state, {
                editProfileResponse: action.payload,
            });
        case UPDATE_PROFILE_PIC_API_SUCCESS:
            return Object.assign({}, state, {
                updateProfilePicResponse: action.payload,
            });
        case UPDATE_PROFILE_PIC_API_ERROR:
            return Object.assign({}, state, {
                updateProfilePicError: action.payload,
            });
        case DELETE_USER_API_SUCCESS:
            return Object.assign({}, state, {
                deleteUserResponse: action.payload,
            });
        case REPORT_USER_API_SUCCESS:
            return Object.assign({}, state, {
                reportUserResponse: action.payload,
            });
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}

export default UserStateReducer;