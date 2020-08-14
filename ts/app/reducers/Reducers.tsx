import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import user from "app-core/redux_store/user/Reducer";
import home from "app-core/redux_store/home/Reducer";
import contentList from "app-core/redux_store/content/Reducer"
import channelList from "app-core/redux_store/channel/Reducer"
import tagList from "app-core/redux_store/tag/Reducer"
import app from "app-core/redux_store/app/Reducer"
import contentReducer from "app/container/content_container/Reducer"
import { navLoginReducer } from "app/boot/navigation/Login"
import { navAppReducer } from "app/boot/navigation/App"
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const contentConfig = {
	key: 'contentList',
	storage,
	whitelist: ['viewsJson']
};

const userConfig = {
	key: 'user',
	storage,
	// whitelist: ['accessToken', 'refreshToken', 'emUser', 'idUser', 'piAvatar']
	blacklist: ['availableUsers', 'isLogged', 'isLoading', 'loggedOut', 'isNewUser']
};

export default combineReducers({
	form: formReducer,
	user: persistReducer(userConfig, user),
	home,
	app,
	contentList: persistReducer(contentConfig, contentList),
	channelList,
	tagList,
	contentReducer,
	navAppReducer,
	navLoginReducer
});
