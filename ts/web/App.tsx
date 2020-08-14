import React from "react";
import App from "web/boot/navigation/App";
import Login from "web/boot/navigation/Login";
import { connect } from "react-redux";
import { ThemeProvider } from '@material-ui/styles';
import Theme from 'web/ThemeVariables';
import InitialLoaderContainer from "app-core/container/initial_loader/InitialLoaderContainer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	BrowserRouter,
	Redirect
} from "react-router-dom";
import RoutesAppEnum from "web/utils/routes/RoutesAppEnum";
import AppRoute from './AppRoute';

interface IProps {
	isLogged: boolean;
	isLoading: boolean;
	location: any;
}

class WebContainer extends React.Component<IProps> {

	constructor(props) {
		super(props)

		this.login = this.login.bind(this);
		this.app = this.app.bind(this);
		this.redirect = this.redirect.bind(this);
	}

	public login(props) {
		const { isLogged, isLoading } = this.props;
		return isLoading ? <InitialLoaderContainer /> : isLogged ? <Redirect to={RoutesAppEnum.home.route} /> : <Login {...props} />;
	}

	public app(props) {
		const { isLogged } = this.props;
		return !isLogged ? <Redirect to={RoutesAppEnum.login.route} /> : <App {...props} />;
	}

	public redirect() {
		const { isLogged } = this.props;
		return isLogged ? <Redirect to={RoutesAppEnum.home.route} /> : <Redirect to={RoutesAppEnum.login.route} />;
	}

	/*
<MuiThemeProvider theme={Theme}>
				<BrowserRouter>
					<div>
						<Route exact={true} path={RoutesAppEnum.root.route} component={this.redirect} />
						<Route path={RoutesAppEnum.home.route} component={this.app} />
						<Route path={RoutesAppEnum.login.route} component={this.login} />
					</div>
				</BrowserRouter>
				<ToastContainer />
			</MuiThemeProvider>

			<Switch>
                <Route path="/auth" render={props => <AuthLayout {...props} />} />
                <LoginRequiredRoute component={AdminLayout} />
            </Switch>
	*/

	public render() {
		return (
			<ThemeProvider theme={Theme}>
				<BrowserRouter>
					<AppRoute />
				</BrowserRouter>
				<div id="toast-container">
					<ToastContainer />
				</div>
			</ThemeProvider>
		)
	}
}

const mapStateToProps = state => ({
	isLogged: state.user.isLogged,
	isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(WebContainer);
