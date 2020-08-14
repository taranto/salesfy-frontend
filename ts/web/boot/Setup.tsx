import * as React from "react";
import { Provider } from "react-redux";
import App from "web/App";
import ConfigureStore, {getPersist} from "app-core/boot/ConfigureStore";
import reducer from "web/reducers/Reducers";
import { routerMiddleware } from 'react-router-redux';
import { history } from "web/boot/History";
import { PersistGate } from 'redux-persist/integration/react';

export default class Setup extends React.Component {
	public store;

	constructor(props) {
		super(props);

		// Apply the middleware to the store
		const middleware = routerMiddleware(history);
		this.store = ConfigureStore({}, [middleware], reducer);
	}

	public render() {
		return (
			<Provider store={this.store}>
				<PersistGate persistor={getPersist()}>
					<App />
				</PersistGate>
			</Provider>
		);
	}
}
