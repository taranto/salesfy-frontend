import {
	SHOW_SEARCH, SHOW_TAB_INDEX, GET_CHANNEL_LIST_BEGIN, GET_CHANNEL_LIST_SUCCESS, GET_CHANNEL_LIST_FAILURE
} from './Actions';
import { success, begin, failure } from 'app-core/utils/redux/Reducers';

export const initialState = {
	showSearch: false,
	showFeed: true,
	showNewHatch: false,
	showChannels: false,
	showChannelsAward: false,
	showFavorite: false,
	limit: 10,
	channelList: []
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SHOW_SEARCH:
			state = success(state, { ...action.payload });
			break;
		case SHOW_TAB_INDEX:
			state = success(state, { ...action.payload });
			break;
		case GET_CHANNEL_LIST_SUCCESS:
			if (state.channelList && state.channelList.length === 0) {
				state = success(state, {
					...action.payload,
					channelList: action.payload.items,
					remaining: action.payload.items && action.payload.items.length === state.limit,
					isTagChange: false
				});
			} else {
				state = success(state, {
					...action.payload,
					remaining: action.payload.items && action.payload.items.length === state.limit,
					channelList: state.channelList.concat(action.payload.items)
				});
			}
			break;
		case GET_CHANNEL_LIST_BEGIN:
			state = begin(state, action);
			break;
		case GET_CHANNEL_LIST_FAILURE:
			state = failure(state, action.payload.error);
			break;
		default:
			break;
	}

	return state;
}
