import { begin, success, failure } from 'app-core/utils/redux/Reducers';
import { groupActions } from 'app-core/redux_store/group/Actions';

export const initialState = {
	items: [],
	comboItems: [],
	remaining: true,
	limit: 10,
	offset: 0,
	isLoading: false,
	error: null,
	views: [],
	refreshing: false,
	options: {},
	favoriteItems: []
};

export const testInitialState = {
	...initialState,
	remaining: false
};

export default function(state = initialState, action) {
	switch (action.type) {
		case groupActions.GET_GROUP_SUCCESS:
			state = success(state, {
				...action.payload,
				remaining: action.payload.items && action.payload.items.length === state.limit
			});
			break;
		case groupActions.GET_GROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.GET_GROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.GET_GROUPCOMBO_SUCCESS:
			state = success(state, {
				...action.payload
			});
			break;
		case groupActions.GET_GROUPCOMBO_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.GET_GROUPCOMBO_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.DELETE_GROUP_SUCCESS:
			const offset = state.offset - 1;
			const items: any[] = state.items;
			state = success(state, {
				items: items.filter(
					(item) =>
						(action.payload.idUserGroup && item.idUserGroup !== action.payload.idUserGroup) ||
						(action.payload.idGroup && item.idGroup !== action.payload.idGroup)
				),
				offset
			});
			break;
		case groupActions.DELETE_GROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.DELETE_GROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.ADD_GROUP_SUCCESS:
			state = success(state, {
				items: state.items.concat(action.payload.data)
			});
			break;
		case groupActions.UPDATE_GROUP_SUCCESS:
			const arrItems: any[] = state.items;
			const index = arrItems.findIndex((item) => item.isGroup && item.idGroup === action.payload.data.idGroup);
			arrItems[index] = action.payload.data;
			state = success(state, {
				items: arrItems
			});
			break;
		case groupActions.UPDATE_GROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.UPDATE_GROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.DELETE_USERGROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.DELETE_USERGROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.DELETE_USERGROUP_SUCCESS:
			const filteredItems = state.items.filter((item: any) => {
				return action.payload.isMyAuth
					? action.payload.idGroup && item.idGroup !== action.payload.idGroup
					: action.payload.idUserGroup && item.idUserGroup !== action.payload.idUserGroup;
			});
			state = success(state, {
				items: filteredItems,
				offset: state.offset - 1
			});
			break;
		case groupActions.ADD_USERGROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.ADD_USERGROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.ADD_USERGROUP_SUCCESS:
			state = success(state, {
				items: state.items.concat(action.payload.data)
			});
			break;
		case groupActions.UPDATE_USERGROUP_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.UPDATE_USERGROUP_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.UPDATE_USERGROUP_SUCCESS:
			const arrItemsUG: any[] = state.items;
			const indexParentUG = arrItemsUG.findIndex(
				(item) => item.isGroup && item.idGroup === action.payload.data.idGroup
			);
			const indexUG = arrItemsUG.findIndex(
				(item) => !item.isGroup && item.idUserGroup === action.payload.data.idUserGroup
			);

			const idUserAccessBefore = arrItemsUG[indexUG].idCtUserGroupAccess;
			const idUserAccessAfter = action.payload.data.idCtUserGroupAccess;

			arrItemsUG[indexParentUG] = {
				...arrItemsUG[indexParentUG],
				idCtUserGroupAccess: action.payload.data.idCtUserGroupAccess,
				isFavorite: action.payload.data.isFavorite
			};
			arrItemsUG[indexUG] = action.payload.data;

			let newFavoriteItems = state.favoriteItems;

			// quando eu desfavorito algo vem esse algoritmo
			if (state.favoriteItems.findIndex((item: any) => item.idGroup === action.payload.data.idGroup) !== -1) {
				if (!action.payload.data.isFavorite) {
					if (idUserAccessBefore !== idUserAccessAfter) {
						newFavoriteItems = state.favoriteItems;
					} else {
						newFavoriteItems = state.favoriteItems.filter(
							(item: any) => item.idGroup !== action.payload.data.idGroup
						);
					}
				}
			} else if (action.payload.data.isFavorite) {
				// quando eu favorito algo vem esse
				newFavoriteItems = state.favoriteItems.concat(action.payload.data);
			}

			state = success(state, {
				items: arrItemsUG,
				favoriteItems: newFavoriteItems
			});
			break;
		case groupActions.ADD_INVITE_BEGIN:
			state = begin(state, action);
			break;
		case groupActions.ADD_INVITE_ERROR:
			state = failure(state, action.payload.error);
			break;
		case groupActions.ADD_INVITE_SUCCESS:
			state = success(state, {
				items: state.items.concat(action.payload.data)
			});
			break;
		default:
			break;
	}
	return state;
}
