import {
	APP_STATUS_ERROR, APP_PARAM
} from './Actions';
import { success } from 'app-core/utils/redux/Reducers';

export const initialState = {
	presentation: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case APP_STATUS_ERROR:
			state = success(state, action.payload);
			break;
		case APP_PARAM:
			state = success(state, action.payload);
			break;
	}

	return state;
}
