import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import {
	InitialLoaderContainer, RegisterEmailContainer,
	RecoveryContainer, InstructContainer, InitialLoaderProblemContainer
} from "containers";
import {
	LoginContainer
} from "app-core/container"
import {
	reduxifyNavigator,
	createNavigationReducer,
	createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

export const LoginNavigator = createStackNavigator(
	{
		Loader: { screen: InitialLoaderContainer },
		Login: { screen: LoginContainer },
		Register: { screen: RegisterEmailContainer }, // RegisterContainer
		Recovery: { screen: RecoveryContainer },
		Instruct: { screen: InstructContainer },
		LoaderError: { screen: InitialLoaderProblemContainer }
	},
	{
		initialRouteName: "Loader",
		headerMode: "none",
	}
);

export const navLoginReducer = createNavigationReducer(LoginNavigator);

const navState = state => state.nav;

export const middlewareLogin = createReactNavigationReduxMiddleware("Login",
	navState
);

const Login = reduxifyNavigator(LoginNavigator, "Login");

const mapStateToProps = state => ({
	state: state.navLoginReducer
});

export default connect(mapStateToProps)(Login);
