import apiAction from "../../api/apiAction";
import { DeleteMessageAPI, GetGroupsAPI, GetMessagesAPI, ReportMessageAPI, SendMessageAPI } from "../../api/routes";
import { GET_GROUPS_API_SUCCESS, SET_ERROR, SEND_MESSAGES_API_SUCCESS, GET_MESSAGES_API_SUCCESS, DELETE_MESSAGES_API_SUCCESS, REPORT_MESSAGE_API_SUCCESS, SEND_MESSAGES_API_FAILURE } from "../actiontypes";

const initialState = {
    getGroupsResponse: {},
    getMessagesResponse: {},
    sendMessagesResponse: {},
    sendMessagesFailResponse: {},
    deleteMessagesResponse: {},
    reportMessageResponse: {},
    errorResponse: {},
}


// Get Groups Api Call
export function GetGroupsApiCall(params) {
    console.log('GetGroupsApiCall params => ', params)
    return apiAction({
        url: GetGroupsAPI + '?page=' + params?.pageno + '&limit=' + params?.limit,
        method: 'GET',
        // data: params,
        onSuccess: (response) => {
            return { type: GET_GROUPS_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Get Messages Api Call
export function GetMessagesApiCall(params) {
    console.log('GetMessagesApiCall params => ', params)
    return apiAction({
        url: GetMessagesAPI + '/' + params.group_id + '?page=' + params.pageno + '&limit=' + params.limit,
        method: 'GET',
        // data: params,
        onSuccess: (response) => {
            return { type: GET_MESSAGES_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            console.log('Error Response => ', response);
            return { type: SET_ERROR, payload: response };
        },
        headersOverride: true
    });
}

// Send Message Api Call
export function SendMessageApiCall(params) {
    return apiAction({
        url: SendMessageAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: SEND_MESSAGES_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SEND_MESSAGES_API_FAILURE, payload: response };
        },
    });
}

// Delete Message Api Call
export function DeleteMessageApiCall(params) {
    return apiAction({
        url: DeleteMessageAPI + '/' + params.msgid,
        method: 'DELETE',
        // data: params,
        onSuccess: (response) => {
            return { type: DELETE_MESSAGES_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

// Report Message Api Call
export function ReportMessageApiCall(params) {
    return apiAction({
        url: ReportMessageAPI,
        method: 'POST',
        data: params,
        onSuccess: (response) => {
            return { type: REPORT_MESSAGE_API_SUCCESS, payload: response };
        },
        onFailure: (response) => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

const ChatStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GROUPS_API_SUCCESS:
            return Object.assign({}, state, {
                getGroupsResponse: action.payload,
            });
        case GET_MESSAGES_API_SUCCESS:
            return Object.assign({}, state, {
                getMessagesResponse: action.payload,
            });
        case SEND_MESSAGES_API_SUCCESS:
            return Object.assign({}, state, {
                sendMessagesResponse: action.payload,
            });
        case SEND_MESSAGES_API_FAILURE:
            return Object.assign({}, state, {
                sendMessagesFailResponse: action.payload,
            });
        case DELETE_MESSAGES_API_SUCCESS:
            return Object.assign({}, state, {
                deleteMessagesResponse: action.payload,
            });
        case REPORT_MESSAGE_API_SUCCESS:
            return Object.assign({}, state, {
                reportMessageResponse: action.payload,
            });
        case SET_ERROR:
            return Object.assign({}, state, {
                errorResponse: action.payload,
            });
        default:
            return state;
    }
}

export default ChatStateReducer;