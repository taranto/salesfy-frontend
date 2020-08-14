import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import app from "app-core/redux_store/app/Reducer";
import user from "app-core/redux_store/user/Reducer";
import group from "app-core/redux_store/group/Reducer";
import home from "app-core/redux_store/home/Reducer";
import contentList from "app-core/redux_store/content/Reducer"
import channelList from "app-core/redux_store/channel/Reducer"
import tagList from "app-core/redux_store/tag/Reducer"
import filter from "app-core/redux_store/filter/Reducer"
import { routerReducer } from 'react-router-redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const userConfig = {
	key: 'user',
	storage,
	// whitelist: ['accessToken', 'refreshToken', 'idUser', 'emUser', 'emUser', 'nmUser', 'piAvatar']
	blacklist: ['availableUsers', 'isLogged', 'isLoading', 'loggedOut', 'isNewUser']
};

export default combineReducers({
	form: formReducer,
	routing: routerReducer,
	user: persistReducer(userConfig, user),
	home,
	contentList,
	group,
	tagList,
	filter,
	channelList,
	app
});
