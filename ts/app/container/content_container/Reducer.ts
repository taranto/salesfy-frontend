import {
	GET_CONTENT_BEGIN, GET_CONTENT_SUCCESS, GET_CONTENT_FAILURE
} from './Actions'
import {
	FAVORITE_CONTENT, LIKE_CONTENT
} from 'app-core/redux_store/content/Actions'
import { begin, success, failure} from 'app-core/utils/redux/Reducers';

export const initialState = {
	item: undefined,
	isLoading: true,
	error: null
};

export default function(state = initialState, action) {
	switch(action.type){
		case GET_CONTENT_SUCCESS:
			state = success(state, {
				...action.payload
			});
			break;
		case GET_CONTENT_BEGIN:
			state = begin(state);
			break;
		case GET_CONTENT_FAILURE:
			state = failure(state, action.payload.error);
			break;
		case FAVORITE_CONTENT:
			state = success(state, {
				...action.payload.response
			});
			break;
		case LIKE_CONTENT:
			state = success(state, {
				...action.payload.response
			});
			break;
		default:
			break;
	}

	return state;
}
