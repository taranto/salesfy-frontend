import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import App from "app/App";
import getTheme from "app/theme/components";
import variables from "app/theme/variables/platform";
import ConfigureStore, { getPersist } from "app-core/boot/ConfigureStore";
import { middlewareLogin } from "app/boot/navigation/Login"
import { middlewareApp } from "app/boot/navigation/App"
import Reducer from "app/reducers/Reducers";
import { PersistGate } from "redux-persist/integration/react";
import { TransitionScreen } from "app/stories/screen";
import { I18n, KeyEnum } from "salesfy-shared";

export interface IState {
	store: object;
	isLoading: boolean;
}

export default class Setup extends React.Component<{}, IState> {
	constructor(props) {
		super(props);
	}

	public render() {
		const store = ConfigureStore({}, [middlewareLogin, middlewareApp], Reducer);
		return (
			<StyleProvider style={getTheme(variables)}>
				<Provider store={store}>
					<PersistGate loading={<TransitionScreen infoText={I18n.t(KeyEnum.loading)}/>}persistor={getPersist()}>
						<App />
					</PersistGate>
				</Provider>
			</StyleProvider>
		);
	}
}
