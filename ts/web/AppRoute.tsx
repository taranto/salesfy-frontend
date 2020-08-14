import React from "react";
import App from "web/boot/navigation/App";
import Login from "web/boot/navigation/Login";
import { connect } from "react-redux";
import InitialLoaderContainer from "app-core/container/initial_loader/InitialLoaderContainer";
import {
	Route,
	Switch,
	withRouter
} from "react-router-dom";
import RoutesAppEnum from "web/utils/routes/RoutesAppEnum";
import { LoginRequiredRoute } from 'components';

interface IProps {
	isLogged: boolean;
	isLoading: boolean;
	location: any;
}

class AppRoute extends React.Component<IProps> {

	constructor(props) {
		super(props)
	}

	public render() {
		const { isLogged, isLoading } = this.props;

		if (!isLogged && isLoading) {
			return <InitialLoaderContainer />
		}

		return (
			<Switch>
				<Route path={RoutesAppEnum.login.route} render={props => <Login {...props} />} />
				<LoginRequiredRoute component={App} />
			</Switch>
		)
	}
}

const mapStateToProps = state => ({
	isLogged: state.user.isLogged,
	isLoading: state.user.isLoading
});

export default withRouter(connect(mapStateToProps)(AppRoute));
