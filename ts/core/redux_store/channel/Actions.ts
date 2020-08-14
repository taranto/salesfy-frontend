import * as Ask from 'app-core/communication/ask/Ask';
import { begin, success, failure, actionsCreator } from 'app-core/utils/redux/Actions';
import { showHeaderSearch } from 'app-core/redux_store/home/Actions';
import { getStore } from 'app-core/boot/ConfigureStore';

export const GET_CHANNEL_LIST_BEGIN = 'GET_CHANNEL_LIST_BEGIN';
export const GET_CHANNEL_LIST_SUCCESS = 'GET_CHANNEL_LIST_SUCCESS';
export const GET_CHANNEL_LIST_FAILURE = 'GET_CHANNEL_LIST_FAILURE';

export const GET_CHANNEL_STORIES_LIST_BEGIN = 'GET_CHANNEL_STORIES_LIST_BEGIN';
export const GET_CHANNEL_STORIES_LIST_SUCCESS = 'GET_CHANNEL_STORIES_LIST_SUCCESS';
export const GET_CHANNEL_STORIES_LIST_FAILURE = 'GET_CHANNEL_STORIES_LIST_FAILURE';

export const CHANNEL_LIST_TOP = 'CHANNEL_LIST_TOP';

export const getChannelListBegin = (response) => begin(GET_CHANNEL_LIST_BEGIN, response);
export const getChannelListSuccess = (response) => success(GET_CHANNEL_LIST_SUCCESS, response);
export const getChannelListError = (error) => failure(GET_CHANNEL_LIST_FAILURE, error);

export const getChannelStoriesListBegin = (response) => success(GET_CHANNEL_STORIES_LIST_BEGIN, response);
export const getChannelStoriesListSuccess = (response) => success(GET_CHANNEL_STORIES_LIST_SUCCESS, response);
export const getChannelStoriesListError = (error) => failure(GET_CHANNEL_STORIES_LIST_FAILURE, error);

export const channelListTop = (item) => success(CHANNEL_LIST_TOP, item);

const { actions, functions } = actionsCreator('channel', 'channelGroup');

export { actions as channelActions };

export const addChannelData = (data) => {
	return (dispatch) => {
		dispatch(functions.addChannelBegin({}));
		return Ask.addChannel(data)
			.then((response) => {
				dispatch(functions.addChannelSuccess({}));
				return response.data;
			})
			.catch((err) => {
				dispatch(functions.addChannelError(err));
				throw err;
			});
	};
};

export const getChannelById = async (idChannel) => {
	const { channelList } = getStore().getState();
	let data = channelList.items.filter((item) => item.idContent === idChannel)[0];

	if (!data) {
		data = await Ask.getChannel(idChannel);
	}

	return data;
};

export const copyChannelData = (data) => {
	return (dispatch) => {
		dispatch(functions.addChannelBegin({}));
		return Ask.copyChannel(data)
			.then((response) => {
				dispatch(functions.addChannelSuccess({}));
				return response.data;
			})
			.catch((err) => {
				dispatch(functions.addChannelError(err));
			});
	};
};

export const channelImportData = async (data) => {
	const response = await Ask.channelImport(data);
	return response;
};

export const updateChannelData = (data) => {
	return (dispatch) => {
		dispatch(functions.updateChannelBegin({}));
		return Ask.updateChannel(data)
			.then((response) => {
				dispatch(functions.updateChannelSuccess({ item: response.data }));
				return response.data;
			})
			.catch((err) => {
				dispatch(functions.updateChannelError(err));
				throw err;
			});
	};
};

export const deleteChannelData = ({ idChannel }) => {
	return (dispatch) => {
		dispatch(functions.deleteChannelBegin({}));
		return Ask.deleteChannel({ idChannel })
			.then(() => {
				dispatch(functions.deleteChannelSuccess({ idChannel }));
			})
			.catch((err) => {
				dispatch(functions.deleteChannelError(err));
			});
	};
};

export const getChannelData = (idChannel) => {
	return (dispatch) => {
		dispatch(functions.getChannelBegin({}));
		return Ask.getChannel(idChannel)
			.then((channel) => {
				dispatch(functions.getChannelSuccess({ channel }));
				return channel;
			})
			.catch((err) => {
				dispatch(functions.getChannelError(err));
			});
	};
};

export const getChannelGroupData = (idChannel) => {
	return (dispatch) => {
		dispatch(functions.getChannelGroupBegin({}));
		return Ask.getChannelGroup(idChannel)
			.then((groups) => {
				dispatch(functions.getChannelGroupSuccess({}));
				return groups;
			})
			.catch((err) => {
				dispatch(functions.getChannelGroupError(err));
			});
	};
};

export const addChannelGroupData = (data) => {
	return (dispatch) => {
		dispatch(functions.addChannelGroupBegin({}));
		return Ask.addChannelGroup(data)
			.then((data2) => {
				dispatch(functions.addChannelGroupSuccess({}));
				return data2;
			})
			.catch((err) => {
				dispatch(functions.addChannelGroupError(err));
			});
	};
};

export const deleteChannelGroupData = (data) => {
	return (dispatch) => {
		dispatch(functions.deleteChannelGroupBegin({}));
		return Ask.deleteChannelGroup(data)
			.then(() => {
				dispatch(functions.deleteChannelGroupSuccess({}));
			})
			.catch((err) => {
				dispatch(functions.deleteChannelGroupError(err));
			});
	};
};

export const updateChannelGroupData = (data) => {
	return (dispatch) => {
		dispatch(functions.updateChannelGroupBegin({}));
		return Ask.updateChannelGroup(data)
			.then(() => {
				dispatch(functions.updateChannelGroupSuccess({}));
			})
			.catch((err) => {
				dispatch(functions.updateChannelGroupError(err));
			});
	};
};

export const getChannelList = (limit, offset, options, isTagChange, isRefreshing = false) => {
	return (dispatch) => {
		if (isTagChange) {
			dispatch(showHeaderSearch(false));
			if (isRefreshing) {
				dispatch(getChannelListBegin({ isTagChange, refreshing: isRefreshing }));
			} else {
				dispatch(getChannelListBegin({ isTagChange, refreshing: isRefreshing, items: [] }));
			}
		} else {
			dispatch(getChannelListBegin({ isTagChange }));
		}
		return Ask.getChannelList(limit, offset, options)
			.then((response) => {
				dispatch(getChannelListSuccess({ ...response, options, refreshing: false, views: [], isTagChange }));
			})
			.catch((err) => {
				dispatch(getChannelListError(err));
			});
	};
};

export const getChannelStoriesList = (limit, offset, isTagChange) => {
	return (dispatch) => {
		if (isTagChange) {
			dispatch(getChannelStoriesListBegin({ isLoadingStories: true, itemsStories: [] }));
		} else {
			dispatch(getChannelStoriesListBegin({ isLoadingStories: true }));
		}
		return Ask.getChannelStoriesList(limit, offset)
			.then((response) => {
				dispatch(getChannelStoriesListSuccess({ ...response, isLoadingStories: false, isTagChange }));
			})
			.catch((err) => {
				dispatch(getChannelStoriesListError(err));
			});
	};
};

export const goToChannelListTop = (top) => {
	return (dispatch) => {
		dispatch(channelListTop({ scrollTop: top }));
	};
};
