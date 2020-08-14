import * as Ask from 'app-core/communication/ask/Ask';
import { begin, success, failure } from 'app-core/utils/redux/Actions';
import { showHeaderSearch } from 'app-core/redux_store/home/Actions';
import { NavigationActions } from 'native/Navigation';
import ActionCreator from 'app-core/utils/redux/ActionCreator';
import { getStore } from 'app-core/boot/ConfigureStore';

const { actions, defaultReducer, add, update, getSimple, remove } = new ActionCreator('content');
export { actions, defaultReducer };

export const addContentData = add(Ask.addContent);
export const updateContentData = update(Ask.updateContent);
export const getChannelContentComboData = getSimple(Ask.getChannelContentCombo);
export const deleteContentData = remove(Ask.deleteContent);

export const GET_CONTENT_LIST_BEGIN = 'GET_CONTENT_LIST_BEGIN';
export const GET_CONTENT_LIST_SUCCESS = 'GET_CONTENT_LIST_SUCCESS';
export const GET_CONTENT_LIST_FAILURE = 'GET_CONTENT_LIST_FAILURE';
export const FAVORITE_CONTENT = 'FAVORITE_CONTENT';
export const LIKE_CONTENT = 'LIKE_CONTENT';
export const FAVORITE_CONTENT_FAILURE = 'FAVORITE_CONTENT_FAILURE';
export const LIKE_CONTENT_FAILURE = 'LIKE_CONTENT_FAILURE';
export const CONTENT_LIST_TOP = 'CONTENT_LIST_TOP';
export const PUBLISH_SUCCESS = 'PUBLISH_SUCCESS';
export const PUBLISH_BEGIN = 'PUBLISH_BEGIN';
export const PUSH_VIEW = 'PUSH_VIEW';
export const PUBLISH_ERROR = 'PUBLISH_ERROR';
export const CONTENT_SUCCESS = 'CONTENT_SUCCESS';

export const getContentListBegin = (response) => begin(GET_CONTENT_LIST_BEGIN, response);
export const getContentListSuccess = (response) => success(GET_CONTENT_LIST_SUCCESS, response);
export const getContentListError = (error) => failure(GET_CONTENT_LIST_FAILURE, error);
export const publishBegin = (item) => success(PUBLISH_BEGIN, item);

export const isLikeSuccess = (item) => success(LIKE_CONTENT, item);
export const isFavoriteSuccess = (item) => success(FAVORITE_CONTENT, item);
export const pushViewSuccess = (item) => success(PUSH_VIEW, item);
export const contentListTop = (item) => success(CONTENT_LIST_TOP, item);
export const publishSuccess = (item) => success(PUBLISH_SUCCESS, item);
export const contentSuccess = (item) => success(CONTENT_SUCCESS, item);

export const isLikeError = (error) => failure(LIKE_CONTENT_FAILURE, error);
export const isFavoriteError = (error) => failure(FAVORITE_CONTENT_FAILURE, error);
export const publishError = (error) => success(PUBLISH_ERROR, error);

export const getContentById = async (idContent) => {
	const { contentList } = getStore().getState();
	let data = contentList.items.filter((item) => item.idContent === idContent)[0];

	if (!data) {
		data = await Ask.getContent(idContent).then((content) => content && content.item[0]);
	}

	return data;
};

export const getContentList = (limit, offset, options, isTagChange, isRefreshing = false) => {
	return (dispatch) => {
		if (isTagChange) {
			dispatch(showHeaderSearch(false));
			dispatch(getContentListBegin({ isTagChange, refreshing: isRefreshing, items: [] }));
		} else {
			dispatch(getContentListBegin({ isTagChange }));
		}
		return Ask.getContentList(limit, offset, options, isTagChange)
			.then((response) => {
				dispatch(
					getContentListSuccess({
						...response,
						options,
						refreshing: false,
						views: [],
						isTagChange
					})
				);
			})
			.catch((err) => {
				dispatch(getContentListError(err));
			});
	};
};

export const pushView = (idContent) => {
	return (dispatch) => {
		dispatch(pushViewSuccess({ idContent }));
	};
};

export const goToContentListTop = (top) => {
	return (dispatch) => {
		dispatch(contentListTop({ scrollTop: top }));
	};
};

export const favorite = (idContent, isFavorite) => {
	const dataUpdate = update(Ask.updateUserContent);
	return dataUpdate({ idContent, isFavorite });
};

export const notify = (idContent) => {
	const dataUpdate = update(Ask.updateContent);
	return dataUpdate({ idContent, shNotifyUpdate: true });
};

export const insertContent = (item) => {
	return (dispatch) => {
		dispatch(publishBegin({}));
		return Ask.insert(item)
			.then((response) => {
				dispatch(publishSuccess({ response }));
				dispatch(NavigationActions.navigate({ routeName: 'Home' }));

				return true;
			})
			.catch((err) => {
				dispatch(publishError(err));

				return false;
			});
	};
};

export const insertImportContent = ({ lkPlatformProfile }) => {
	return (dispatch) => {
		return Ask.insertImport({ lkPlatformProfile })
			.then((response) => {
				dispatch(publishSuccess({ response }));
				dispatch(NavigationActions.navigate({ routeName: 'Home' }));

				return true;
			})
			.catch((err) => {
				dispatch(publishError(err));

				return false;
			});
	};
};

export const setContentConversion = (item) => {
	return (dispatch) => {
		return Ask.setContentConversion(item.idContent).then((response) => {
			return dispatch(contentSuccess({ item: response.data }));
		});
	};
};
