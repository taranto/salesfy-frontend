import { begin, success, failure} from 'app-core/utils/redux/Actions';

export const GET_CONTENT_BEGIN = "GET_CONTENT_BEGIN";
export const GET_CONTENT_SUCCESS = "GET_CONTENT_SUCCESS";
export const GET_CONTENT_FAILURE = "GET_CONTENT_FAILURE";

export const getContentBegin = () => begin(GET_CONTENT_BEGIN);
export const getContentSucess = response => success(GET_CONTENT_SUCCESS, response);
export const getContentError = error => failure(GET_CONTENT_FAILURE, error);

export const getContent = (item) => {
	return dispatch => {
		dispatch(getContentSucess({item}))
	}
}
