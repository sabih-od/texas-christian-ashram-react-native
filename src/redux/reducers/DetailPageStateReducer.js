import apiAction from '../../api/apiAction';
import { AboutAPI, ContactAPI, GetAnnouncementAPI, GetBooksAPI, GetEventsAPI, GetHomeBannerAPI, GetNotificationsAPI, GetOurSpeakerAPI, GetOurStaffAPI, GetPostsAPI, GetRequestedPrayerAPI, GetSermonsAPI, GetUpcomingEventsAPI, RequestPrayerAPI, } from '../../api/routes';
import { ABOUT_API_SUCCESS, CONTACT_API_SUCCESS, GET_ANNOUNCEMENT_DETAIL_API_SUCCESS, GET_BOOKS_DETAIL_API_SUCCESS, GET_EVENT_DETAIL_API_SUCCESS, GET_NOTIFICATIONS_API_SUCCESS, GET_OUR_SPEAKER_DETAIL_API_SUCCESS, GET_OUR_STAFF_DETAIL_API_SUCCESS, GET_POST_DETAIL_API_SUCCESS, GET_REQUESTED_PRAYER_API_SUCCESS, GET_SERMONS_DETAIL_API_SUCCESS, GET_UPCOMING_EVENT_DETAIL_API_SUCCESS, HOME_BANNER_API_SUCCESS, LOGOUT_USER, REQUEST_PRAYER_API_SUCCESS, SET_ERROR, } from '../actiontypes';

const initialState = {
    getSermonDetailResponse: {},
    getPostDetailResponse: {},
    getEventDetailResponse: {},
    getUpcomingEventDetailResponse: {},
    getOurStaffDetailResponse: {},
    getOurSpeakerDetailResponse: {},
    getAnnouncementDetailResponse: {},
};

export function GetSermonsDetailApiCall(id) {
    return apiAction({
        url: GetSermonsAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_SERMONS_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetPostDetailApiCall(id) {
    return apiAction({
        url: GetPostsAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_POST_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetAnnouncementDetailApiCall(id) {
    return apiAction({
        url: GetAnnouncementAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_ANNOUNCEMENT_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetEventsDetailApiCall(id) {
    return apiAction({
        url: GetEventsAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_EVENT_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetUpcomingEventsDetailApiCall(id) {
    return apiAction({
        url: GetUpcomingEventsAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_UPCOMING_EVENT_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetOurStaffDetailApiCall(id) {
    return apiAction({
        url: GetOurStaffAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_OUR_STAFF_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

export function GetOurSpeakerDetailApiCall(id) {
    return apiAction({
        url: GetOurSpeakerAPI + '/' + id,
        method: 'GET',
        // data: params,
        onSuccess: response => {
            return { type: GET_OUR_SPEAKER_DETAIL_API_SUCCESS, payload: response };
        },
        onFailure: response => {
            return { type: SET_ERROR, payload: response };
        },
    });
}

const DetailPageStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SERMONS_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getSermonDetailResponse: action.payload,
            });
        case GET_POST_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getPostDetailResponse: action.payload,
            });
        case GET_EVENT_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getEventDetailResponse: action.payload,
            });
        case GET_UPCOMING_EVENT_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getUpcomingEventDetailResponse: action.payload,
            });
        case GET_OUR_STAFF_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getOurStaffDetailResponse: action.payload,
            });
        case GET_OUR_SPEAKER_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getOurSpeakerDetailResponse: action.payload,
            });
        case GET_ANNOUNCEMENT_DETAIL_API_SUCCESS:
            return Object.assign({}, state, {
                getAnnouncementDetailResponse: action.payload,
            });
        case LOGOUT_USER:
            return initialState
        default:
            return state;
    }
};

export default DetailPageStateReducer;