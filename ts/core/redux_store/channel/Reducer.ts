import {
	GET_CHANNEL_LIST_BEGIN, GET_CHANNEL_LIST_FAILURE, GET_CHANNEL_LIST_SUCCESS,
	CHANNEL_LIST_TOP, GET_CHANNEL_STORIES_LIST_FAILURE, GET_CHANNEL_STORIES_LIST_BEGIN, GET_CHANNEL_STORIES_LIST_SUCCESS
} from './Actions'
import { begin, success, failure } from 'app-core/utils/redux/Reducers';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { USER_LOGOUT_SUCCESS } from '../user/Actions';
import { channelActions } from './Actions';

export const initialState = {
	items: [],
	remaining: true,
	limit: LIST_LIMIT_DEFAULT,
	offset: 0,
	isLoading: false,
	error: null,
	views: [],
	refreshing: false,
	itemsStories: [],
	remainingStories: true,
	limitStories: LIST_LIMIT_DEFAULT,
	offsetStories: 0,
	isLoadingStories: false,
	redraw: false
};

export const testInitialState = {
	...initialState,
	remaining: false
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_CHANNEL_LIST_SUCCESS:
			if (action.payload && action.payload.isTagChange) {
				state = success(state, {
					...action.payload,
					remaining: action.payload.items && action.payload.items.length === state.limit,
					isTagChange: false
				});
			} else {
				state = success(state, {
					...action.payload,
					remaining: action.payload.items && action.payload.items.length === state.limit,
					items: state.items.concat(action.payload.items)
				});
			}
			break;
		case GET_CHANNEL_LIST_BEGIN:
			state = begin(state, action);
			break;
		case GET_CHANNEL_LIST_FAILURE:
			state = failure(state, action.payload.error);
			break;
		case GET_CHANNEL_STORIES_LIST_SUCCESS:
			if (action.payload && action.payload.isTagChange) {
				state = success(state, {
					remainingStories: action.payload.items && action.payload.items.length === state.limitStories,
					itemsStories: action.payload.items
				});
			} else {
				state = success(state, {
					remainingStories: action.payload.items && action.payload.items.length === state.limitStories,
					itemsStories: state.itemsStories.concat(action.payload.items)
				});
			}
			break;
		case GET_CHANNEL_STORIES_LIST_BEGIN:
			state = success(state, action.payload);
			break;
		case GET_CHANNEL_STORIES_LIST_FAILURE:
			state = failure(state, action.payload.error);
			break;
		case CHANNEL_LIST_TOP:
			state = begin(state, action.payload);
			break;
		case USER_LOGOUT_SUCCESS:
			state = initialState;
			break;
		case channelActions.UPDATE_CHANNEL_SUCCESS:
			const arrItems:any = state.items;
			const index = arrItems.findIndex((item:any) => item.idChannel === action.payload.item.idChannel)
			arrItems[index] = action.payload.item;
			state = success(state, {
				items: arrItems,
				redraw: !state.redraw
			});
			break;
		case "DELETE_CHANNEL_SUCCESS":
			if (action.payload.idChannel) {
				state = success(state, {
					items: state.items.filter((item:any) => item.idChannel !== action.payload.idChannel)
				});
			}
			break;
		default:
			break;
	}
	return state;
}
