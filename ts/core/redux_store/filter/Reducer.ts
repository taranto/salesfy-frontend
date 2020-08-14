import {
	defaultReducer
} from './Actions';
import { USER_LOGOUT_SUCCESS } from 'app-core/redux_store/user/Actions';

export const initialState = {
	items: [],
	isLoading: false,
	error: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case USER_LOGOUT_SUCCESS:
			state = initialState;
			break;
		default:
			state = defaultReducer(state, action);
			break;
	}
	return state;
}
