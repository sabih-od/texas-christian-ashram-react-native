import apiAction from "../../api/apiAction";
import { EditProfileAPI, GetProfileAPI, GetUserByIdAPI, UpdateProfilePictureAPI } from "../../api/routes";
import { EDIT_PROFILE_API_SUCCESS, FORGET_PASSWORD_API_SUCCESS, GET_PROFILE_API_SUCCESS, GET_USER_PROFILE_API_SUCCESS, LOGIN_API_SUCCESS, LOGOUT_USER, REGISTER_API_SUCCESS, SET_ERROR, UPDATE_PROFILE_PIC_API_ERROR, UPDATE_PROFILE_PIC_API_SUCCESS } from "../actiontypes";

const initialState = {
    editProfileResponse: {},
    updateProfilePicResponse: {},
    updateProfilePicError: {},
    // getUserProfileResponse: {}
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

// Get User By ID Api Call
// export function GetUserByIdApiCall(params) {
//     return apiAction({
//         url: GetUserByIdAPI,
//         method: 'POST',
//         data: params,
//         onSuccess: (response) => {
//             return { type: GET_USER_PROFILE_API_SUCCESS, payload: response };
//         },
//         onFailure: (response) => {
//             return { type: SET_ERROR, payload: response };
//         },
//     });
// }

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
        // case GET_USER_PROFILE_API_SUCCESS:
        //     return Object.assign({}, state, {
        //         getUserProfileResponse: action.payload,
        //     });
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
}

export default UserStateReducer;