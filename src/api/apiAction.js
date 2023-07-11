import { API_REQUEST } from "./apimiddleware";

function apiAction({
    url = '',
    method = 'GET',
    data = null,
    accessToken = null,
    onSuccess = () => { },
    onFailure = () => { },
    label = '',
    headersOverride = null,
}) {
    return {
        type: API_REQUEST,
        payload: {
            url,
            method,
            data,
            accessToken,
            onSuccess,
            onFailure,
            label,
            headersOverride,
        },
    };
}

export default apiAction;