import {
	GET_CONTENT_LIST_BEGIN,
	GET_CONTENT_LIST_SUCCESS,
	GET_CONTENT_LIST_FAILURE,
	FAVORITE_CONTENT,
	LIKE_CONTENT,
	PUSH_VIEW,
	CONTENT_LIST_TOP,
	PUBLISH_BEGIN,
	PUBLISH_ERROR,
	PUBLISH_SUCCESS,
	defaultReducer,
	CONTENT_SUCCESS
} from './Actions'
import { begin, success, failure } from 'app-core/utils/redux/Reducers';
import { REHYDRATE } from 'redux-persist';
import { FEED_CHANNEL, LIST_LIMIT_DEFAULT } from 'root/envVars';
import { publishTypes } from './PublishTypes';
import { USER_LOGOUT_SUCCESS } from '../user/Actions';
/*
const publishTypes = [
	{ idCtContent: 33, nmCtContent: "Dúvida", iconName: "help", lkRequired: false },
	{ idCtContent: 35, nmCtContent: "Informação", iconName: "information", lkRequired: false },
	{ idCtContent: 34, nmCtContent: "Atualização", iconName: "sync", lkRequired: false },

	{ idCtContent: 26, nmCtContent: "Webinar", iconName: "easel", lkRequired: true },
	{ idCtContent: 24, nmCtContent: "Vídeo", iconName: "play", lkRequired: true },
	{ idCtContent: 10, nmCtContent: "Guia", iconName: "compass", lkRequired: true },

	{ idCtContent: -2, nmCtContent: "Importação", iconName: "infinite", lkRequired: true },
	{ idCtContent: 16, nmCtContent: "Oferta", iconName: "flame", lkRequired: false },
	{ idCtContent: -3, nmCtContent: "Outro", iconName: "more", lkRequired: true }, // aqui
]*/

export const initialState = {
	items: [],
	views: [],
	channelCombo: [],
	remaining: true,
	limit: LIST_LIMIT_DEFAULT,
	offset: 0,
	isLoading: false,
	error: null,
	refreshing: false,
	publishTypes,
	options: {
		idChannel: FEED_CHANNEL
	}
};

export const testInitialState = {
	...initialState,
	remaining: false
}

export default function (state = initialState, action) {
	let items;

	switch (action.type) {
		case GET_CONTENT_LIST_SUCCESS:
			if (action.payload && action.payload.isTagChange) {
				state = success(state, {
					...action.payload,
					isTagChange: false
				});
			} else {
				state = success(state, {
					...action.payload,
					items: state.items.concat(action.payload.items)
				});
			}
			break;
		case GET_CONTENT_LIST_BEGIN:
			state = begin(state, action);
			break;
		case CONTENT_LIST_TOP:
			state = begin(state, action.payload);
			break;
		case GET_CONTENT_LIST_FAILURE:
			state = failure(state, action.payload.error);
			break;
		case FAVORITE_CONTENT:
			items = state.items.slice();
			items[action.payload.response.index] = action.payload.response.item;

			state = success(state, {
				items
			});
			break;
		case LIKE_CONTENT:
			items = state.items.slice();
			items[action.payload.response.index] = action.payload.response.item;

			state = success(state, {
				items
			});
			break;
		case PUSH_VIEW:
			const views: any[] = state.views;
			views.push(action.payload.idContent);

			state = success(state, { views, viewsJson: JSON.stringify(views) });
			break;
		case PUBLISH_BEGIN:
			state = success(state, {
				isLoadingPublish: true
			});
			break;
		case PUBLISH_SUCCESS:
			state = success(state, {
				isLoadingPublish: false
			});
			break;
		case PUBLISH_ERROR:
			state = failure({
				...state,
				isLoadingPublish: false
			}, action.payload.error);
			break;
		case REHYDRATE:
			if (action.payload) {
				state = success(state, { views: action.payload.viewsJson ? JSON.parse(action.payload.viewsJson) : [] })
			}
			break;
		case USER_LOGOUT_SUCCESS:
			state = initialState;
			break;
		case CONTENT_SUCCESS:
			if (action.payload.item) {
				items = state.items.slice();
				items[state.items.findIndex((data: any) => data.idContent === action.payload.item.idContent)] = action.payload.item;

				state = success(state, {
					items
				});
			}
			break;
		case "DELETE_CONTENT_SUCCESS":
			if (action.payload.idContent) {
				items = state.items.filter((item:any) => item.idContent !== action.payload.idContent);

				state = success(state, {
					items
				});
			}
			break;
		default:
			state = defaultReducer(state, action);
			break;
	}
	return state;
}
