import apiAction from '../../api/apiAction';
import { AboutAPI, ContactAPI, GetAnnouncementAPI, GetBooksAPI, GetEventsAPI, GetHomeBannerAPI, GetNotificationsAPI, GetOurSpeakerAPI, GetOurStaffAPI, GetPostsAPI, GetRequestedPrayerAPI, GetSermonsAPI, GetUpcomingEventsAPI, RequestPrayerAPI, } from '../../api/routes';
import { ABOUT_API_SUCCESS, CONTACT_API_ERROR, CONTACT_API_SUCCESS, GET_ANNOUNCEMENT_API_SUCCESS, GET_BOOKS_API_SUCCESS, GET_EVENTS_API_SUCCESS, GET_NOTIFICATIONS_API_SUCCESS, GET_OUR_SPEAKER_API_SUCCESS, GET_OUR_STAFF_API_SUCCESS, GET_POSTS_API_SUCCESS, GET_REQUESTED_PRAYER_API_SUCCESS, GET_SERMONS_API_SUCCESS, GET_UPCOMING_EVENTS_API_SUCCESS, HOME_BANNER_API_SUCCESS, LOGOUT_USER, REQUEST_PRAYER_API_SUCCESS, SET_ERROR, } from '../actiontypes';

const initialState = {
  getSermonsListResponse: {},
  getPostsListResponse: {},
  getEventsListResponse: {},
  getUpcomingEventsListResponse: {},
  getOurStaffListResponse: {},
  getOurSpeakersListResponse: {},
  getRequestedPrayersListResponse: {},
  getNotificationsListResponse: {},
  getAnnouncementResponse: {},
  getBooksListResponse: {},
  getHomeBannerResponse: {},
  requestPrayerResponse: {},
  contactResponse: {},
  contactErrorResponse: {},
  aboutResponse: {},
  errorResponse: {}
};

export function GetSermonsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetSermonsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_SERMONS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetPostsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetPostsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_POSTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetAnnouncementList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetAnnouncementAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_ANNOUNCEMENT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetEventsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetEventsAPI + '?page=' + params.pageno + '&limit=' + params.limit + '&is_upcoming_event=false',
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_EVENTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetUpcomingEventsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetUpcomingEventsAPI + '?page=' + params.pageno + '&limit=' + params.limit + '&is_upcoming_event=true',
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_UPCOMING_EVENTS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetOurStaffList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetOurStaffAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_OUR_STAFF_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetOurSpeakerList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetOurSpeakerAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_OUR_SPEAKER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetBooksList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetBooksAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_BOOKS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetRequestedPrayersList(params) {
  // console.log('params => ', params);
  return apiAction({
    url: GetRequestedPrayerAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_REQUESTED_PRAYER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetNotificationsList(params) {
  // console.log('params => ', params);
  return apiAction({
    url:
      GetNotificationsAPI + '?page=' + params.pageno + '&limit=' + params.limit,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: GET_NOTIFICATIONS_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function RequestPrayerApiCall(params) {
  // console.log('params => ', params);
  return apiAction({
    url: RequestPrayerAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: REQUEST_PRAYER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function ContactApiCall(params) {
  // console.log('params => ', params);
  return apiAction({
    url: ContactAPI,
    method: 'POST',
    data: params,
    onSuccess: response => {
      return { type: CONTACT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: CONTACT_API_ERROR, payload: response };
    },
  });
}

export function AboutApiCall() {
  // console.log('params => ', params);
  return apiAction({
    url: AboutAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: ABOUT_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

export function GetHomeBanner() {
  // console.log('params => ', params);
  return apiAction({
    url: GetHomeBannerAPI,
    method: 'GET',
    // data: params,
    onSuccess: response => {
      return { type: HOME_BANNER_API_SUCCESS, payload: response };
    },
    onFailure: response => {
      return { type: SET_ERROR, payload: response };
    },
  });
}

const ListingApiStateReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SERMONS_API_SUCCESS:
      return Object.assign({}, state, {
        getSermonsListResponse: action.payload,
      });
    case GET_POSTS_API_SUCCESS:
      return Object.assign({}, state, {
        getPostsListResponse: action.payload,
      });
    case GET_EVENTS_API_SUCCESS:
      return Object.assign({}, state, {
        getEventsListResponse: action.payload,
      });
    case GET_UPCOMING_EVENTS_API_SUCCESS:
      return Object.assign({}, state, {
        getUpcomingEventsListResponse: action.payload,
      });
    case GET_OUR_STAFF_API_SUCCESS:
      return Object.assign({}, state, {
        getOurStaffListResponse: action.payload,
      });
    case GET_OUR_SPEAKER_API_SUCCESS:
      return Object.assign({}, state, {
        getOurSpeakersListResponse: action.payload,
      });
    case GET_REQUESTED_PRAYER_API_SUCCESS:
      return Object.assign({}, state, {
        getRequestedPrayersListResponse: action.payload,
      });
    case GET_NOTIFICATIONS_API_SUCCESS:
      return Object.assign({}, state, {
        getNotificationsListResponse: action.payload,
      });
    case GET_ANNOUNCEMENT_API_SUCCESS:
      return Object.assign({}, state, {
        getAnnouncementResponse: action.payload,
      });
    case GET_BOOKS_API_SUCCESS:
      return Object.assign({}, state, {
        getBooksListResponse: action.payload,
      });
    case REQUEST_PRAYER_API_SUCCESS:
      return Object.assign({}, state, {
        requestPrayerResponse: action.payload,
      });
    case CONTACT_API_SUCCESS:
      return Object.assign({}, state, {
        contactResponse: action.payload,
      });
    case CONTACT_API_ERROR:
      return Object.assign({}, state, {
        contactErrorResponse: action.payload,
      });
    case ABOUT_API_SUCCESS:
      return Object.assign({}, state, {
        aboutResponse: action.payload,
      });
    case HOME_BANNER_API_SUCCESS:
      return Object.assign({}, state, {
        getHomeBannerResponse: action.payload,
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        errorResponse: action.payload,
      });
    case LOGOUT_USER:
      return initialState
    default:
      return state;
  }
};

export default ListingApiStateReducer;