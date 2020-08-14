import * as Ask from 'app-core/communication/ask/Ask'
import { begin, success, failure } from 'app-core/utils/redux/Actions';

export const GET_TAG_LIST_BEGIN = "GET_TAG_LIST_BEGIN";
export const GET_TAG_LIST_SUCCESS = "GET_TAG_LIST_SUCCESS";
export const GET_TAG_LIST_FAILURE = "GET_TAG_LIST_FAILURE";
export const SELECTED_TAG_LIST = "SELECTED_TAG_LIST";
export const SET_USER_TAG_SUCCESS = "SET_USER_TAG_SUCCESS";
export const REMOVE_USER_TAG_SUCCESS = "REMOVE_USER_TAG_SUCCESS";
export const USER_TAG_BEGIN = "USER_TAG_BEGIN";

export const getTagListBegin = response => begin(GET_TAG_LIST_BEGIN, response);
export const getTagListSuccess = response => success(GET_TAG_LIST_SUCCESS, response);
export const getTagListError = error => failure(GET_TAG_LIST_FAILURE, error);
export const selectedTagList = response => success(SELECTED_TAG_LIST, response);
export const setUserTagSuccess = response => success(SET_USER_TAG_SUCCESS, response);
export const removeUserTagSuccess = response => success(REMOVE_USER_TAG_SUCCESS, response);
export const userTagBegin = response => begin(USER_TAG_BEGIN, response);

export const getTagList = (limit, offset, options) => {
	return dispatch => {
		dispatch(getTagListBegin({}))
		return Ask.getUserTagList().then(userTag => {
			dispatch(selectedTagList({ selected: userTag.items }))
			return Ask.getTagList(limit, offset, options).then(response => {
				dispatch(getTagListSuccess({ ...response, options }))
			}).catch(err => {
				dispatch(getTagListError(err))
			})
		})
	}
}

export const setUserTagList = (idTag) => {
	return dispatch => {
		dispatch(userTagBegin({ idTag }));
		return Ask.setUserTagList({ idTag }).then(response => {
			dispatch(setUserTagSuccess({ userTag: response.data }));
		}).catch(_err => {

		})
	}
}

export const getUserTagList = () => {
	return dispatch => {
		return Ask.getUserTagList().then(userTag => {
			dispatch(selectedTagList({ selected: userTag.items }))
			return userTag.items;
		})
	}
}

export const removeUserTagList = (idTag) => {
	return dispatch => {
		dispatch(userTagBegin({ idTag }));
		return Ask.removeUserTagList({ idTag }).then(() => {
			dispatch(removeUserTagSuccess({ idTag }))
		}).catch(_err => {

		})
	}
}
