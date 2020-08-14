import { createStore, applyMiddleware, compose, Middleware } from "redux";
import thunk from "redux-thunk";
import { PersistorOptions, persistStore } from "redux-persist";
import logger from 'redux-logger'
import { IS_DEVELOPMENT } from "root/envVars";

let store;
let persist

function configureStore(_onCompletion: PersistorOptions, middleware: Middleware[] = [], reducer: any = {}, preloadedState?: any) {
	const enhancer = IS_DEVELOPMENT ? compose(
		applyMiddleware(thunk,
			logger,
			...middleware)
	) : compose(
		applyMiddleware(thunk, ...middleware)
	);

	store = createStore(reducer, preloadedState, enhancer);

	persist = persistStore(store);

	return store;
}

export const setStore = (newStore) => {
	store = newStore
}

export const getStore = () => store;
export const getPersist = () => persist;

export default configureStore;
