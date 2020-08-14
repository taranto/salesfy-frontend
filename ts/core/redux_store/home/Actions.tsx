import { success, begin, failure } from 'app-core/utils/redux/Actions';
import * as Ask from 'app-core/communication/ask/Ask';
import { getStore } from 'app-core/boot/ConfigureStore';

export const SHOW_SEARCH = 'SHOW_SEARCH';
export const SHOW_TAB_INDEX = 'SHOW_TAB_INDEX';
export const GET_CHANNEL_LIST_BEGIN = 'GET_CHANNEL_LIST_HOME_BEGIN';
export const GET_CHANNEL_LIST_SUCCESS = 'GET_CHANNEL_LIST_HOME_SUCCESS';
export const GET_CHANNEL_LIST_FAILURE = 'GET_CHANNEL_LIST_HOME_FAILURE';

export const getChannelListBegin = (response) => begin(GET_CHANNEL_LIST_BEGIN, response);
export const getChannelListSucess = (response) => success(GET_CHANNEL_LIST_SUCCESS, response);
export const getChannelListError = (error) => failure(GET_CHANNEL_LIST_FAILURE, error);

export const showSearch = (isShowSearch) => success(SHOW_SEARCH, { showSearch: isShowSearch });
export const showTabFeedAction = () =>
	success(SHOW_SEARCH, {
		showFeed: true,
		showChannelsAward: false,
		showFavorite: false,
		showNewHatch: false,
		showChannels: false,
		showTags: false
	});
export const showTabChannelsAwardAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: true,
		showFavorite: false,
		showNewHatch: false,
		showChannels: false,
		showTags: false
	});
export const showTabFavoriteAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: false,
		showFavorite: true,
		showNewHatch: false,
		showChannels: false,
		showTags: false
	});
export const showTabNewHatchAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: false,
		showFavorite: false,
		showNewHatch: true,
		showChannels: false,
		showTags: false
	});
export const showTabChannelsAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: false,
		showFavorite: false,
		showNewHatch: false,
		showChannels: true,
		showTags: false
	});
export const showTagsAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: false,
		showFavorite: false,
		showNewHatch: false,
		showChannels: false,
		showTags: true
	});

export const hideTabAllAction = () =>
	success(SHOW_SEARCH, {
		showFeed: false,
		showChannelsAward: false,
		showChannels: false,
		showFavorite: false,
		showTags: false
	});

export const showHeaderSearch = (isShowSearch) => {
	return (dispatch) => {
		const stateShowSearch = getStore().getState().home.showSearch;
		if (stateShowSearch !== isShowSearch) {
			dispatch(showSearch(isShowSearch));
		}
	};
};

export const getChannelList = (limit, offset, isTagChange) => {
	return (dispatch) => {
		if (isTagChange) {
			dispatch(getChannelListBegin({ channelList: [] }));
		} else {
			dispatch(getChannelListBegin({}));
		}
		return Ask.getChannelList(limit, offset)
			.then((response) => {
				dispatch(getChannelListSucess({ ...response }));
			})
			.catch((err) => {
				dispatch(getChannelListError(err));
			});
	};
};

export const hideTabAll = () => {
	return (dispatch) => {
		dispatch(hideTabAllAction());
	};
};

export const showTabFeed = () => {
	return (dispatch) => {
		dispatch(showTabFeedAction());
	};
};

export const showTabChannelsAward = () => {
	return (dispatch) => {
		dispatch(showTabChannelsAwardAction());
	};
};

export const showTabFavorite = () => {
	return (dispatch) => {
		dispatch(showTabFavoriteAction());
	};
};

export const showTabChannels = () => {
	return (dispatch) => {
		dispatch(showTabChannelsAction());
	};
};

export const showTabNewHatch = () => {
	return (dispatch) => {
		dispatch(showTabNewHatchAction());
	};
};

export const showTags = () => {
	return (dispatch) => {
		dispatch(showTagsAction());
	};
};
