import {
	GET_TAG_LIST_BEGIN, GET_TAG_LIST_FAILURE, GET_TAG_LIST_SUCCESS, SELECTED_TAG_LIST, SET_USER_TAG_SUCCESS, REMOVE_USER_TAG_SUCCESS, USER_TAG_BEGIN
} from './Actions'
import { begin, success, failure } from 'app-core/utils/redux/Reducers';
import { JsonUtil } from 'salesfy-shared';
import { USER_LOGOUT_SUCCESS } from 'app-core/redux_store/user/Actions';

interface IState {
	items: any[];
	[key:string]: any;
}

export const initialState:IState = {
	items: [],
	// selected: [],
	remaining: true,
	limit: 10,
	offset: 0,
	isLoading: false,
	error: null
};

export const testInitialState = {
	...initialState,
	remaining: false
}

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TAG_LIST_SUCCESS:
			state = success(state, {
				...action.payload,
				items: JsonUtil.mergeJoPerKey("idTag", action.payload.items, state.selected, true),
				remaining: false
			});
			break;
		case SET_USER_TAG_SUCCESS:
			const selected:any[] = state.selected;
			selected.push(action.payload.userTag);

			state = success(state, { userTagLoading: undefined, selected, items: JsonUtil.mergeJoPerKey("idTag", state.items, selected, true), });
			break;
		case REMOVE_USER_TAG_SUCCESS:
			const arrSelected:any[] = state.selected;
			const arrNewSelected: any[] = arrSelected.filter(item => item.idTag !== action.payload.idTag);
			const itemIndex = state.items.findIndex(item => item.idTag === action.payload.idTag);

			state.items[itemIndex] = {
				...state.items[itemIndex],
				isMerged: false
			}

			state = success(state, {
				userTagLoading: undefined, selected: arrNewSelected,
				items: state.items
			});
			break;
		case SELECTED_TAG_LIST:
			state = success(state, { ...action.payload });
			break;
		case GET_TAG_LIST_BEGIN:
			state = begin(state, action);
			break;
		case USER_TAG_BEGIN:
			state = success(state, { userTagLoading: action.idTag });
			break;
		case GET_TAG_LIST_FAILURE:
			state = failure(state, action.payload.error);
			break;
		case USER_LOGOUT_SUCCESS:
			state = initialState;
			break;
		default:
			break;
	}
	return state;
}
