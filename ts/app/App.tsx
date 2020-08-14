import React from "react";
import { connect } from "react-redux";
import { Root } from "native-base";
import App from "app/boot/navigation/App";
import Login from "app/boot/navigation/Login";
import { BackHandler, AppState } from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { getPersist } from "app-core/boot/ConfigureStore";

interface ILogged {
	isLogged: boolean;
	loggedOut: boolean;
	dispatch: any;
}

interface IState {
	appState?: any
}

class AppContainer extends React.Component<ILogged, IState> {

	constructor(props) {
		super(props);

		this.state = {}

		this.handleAppStateChange = this.handleAppStateChange.bind(this);
	}

	public handleAppStateChange = (nextAppState) => {
		if (this.state.appState) {
			// && this.state.appState.match(/inactive|background/) && nextAppState === 'active'
			// getPersist().flush();
		}
		this.setState({ appState: nextAppState });
	}

	public componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBack);
		AppState.addEventListener('change', this.handleAppStateChange);
	}

	public componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBack);
		AppState.removeEventListener('change', this.handleAppStateChange);
	}

	public onBack = () => {
		const { dispatch } = this.props;

		dispatch(NavigationActions.back())

		return true;
	}

	public render() {
		const { isLogged } = this.props;

		return (
			<Root>
				{isLogged ? <App /> : <Login />}
			</Root>
		)
	}
}

const mapStateToProps = state => ({
	isLogged: state.user.isLogged
});

export default connect(mapStateToProps)(AppContainer);
