import {
	USER_LOGOUT_SUCCESS, USER_RECOVERY_SUCCESS, USER_IS_ACCEPTED_TERMS, USER_SESSION_TOKENS, userActions
} from './Actions'
import { begin, success, failure } from 'app-core/utils/redux/Reducers';
import { REHYDRATE } from 'redux-persist';
import { SConst } from 'salesfy-shared';
import Send from 'app-core/communication/send/Send';

export const initialState = {
	isLoading: true,
	error: null,
	isLogged: false,
	loggedOut: false,
	availableUsers: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case userActions.GET_LOGIN_BEGIN:
			state = begin(state);
			break;
		case userActions.GET_LOGIN_SUCCESS:
			state = success(state, { ...action.payload, isLogged: true });
			break;
		case userActions.GET_LOGIN_ERROR:
			state = failure(state, action.payload.error);
			break;
		case userActions.GET_COMBOUSERS_BEGIN:
			state = begin(state);
			break;
		case userActions.GET_COMBOUSERS_SUCCESS:
			if (action.payload.concat) {
				const availableUsers: any[] = state.availableUsers;
				state = success(state, { availableUsers: availableUsers.concat([action.payload.user]) });
			} else {
				state = success(state, { availableUsers: action.payload.items });
			}
			break;
		case userActions.GET_COMBOUSERS_ERROR:
			state = failure(state, action.payload.error);
			break;
		case userActions.GET_USER_BEGIN:
			state = begin(state);
			break;
		case userActions.GET_USER_SUCCESS:
			state = success(state, { ...action.payload });
			break;
		case userActions.GET_USER_ERROR:
			state = failure(state, action.payload.error);
			break;
		case USER_LOGOUT_SUCCESS:
			// restore all user state
			state = success({}, { ...action.payload, ...initialState, isLogged: false, loggedOut: true });
			break;
		case USER_RECOVERY_SUCCESS:
			state = success(state, { ...action.payload });
			break;
		case USER_IS_ACCEPTED_TERMS:
			state = success(state, { ...action.payload });
			break;
		case USER_SESSION_TOKENS:
			state = success(state, { ...action.payload });
			break;
		case REHYDRATE:
			if (action.payload && action.key === "user") {
				if (action.payload[SConst.X_ACCESS_TOKEN]) {
					Send.setAccessToken(action.payload[SConst.X_ACCESS_TOKEN]);
				}
				if (action.payload[SConst.X_REFRESH_TOKEN]) {
					Send.setRefreshToken(action.payload[SConst.X_REFRESH_TOKEN]);
				}
				// state = success(state, { ...action.payload });
			}
			break;
		default:
			break;
	}
	return state;
}
