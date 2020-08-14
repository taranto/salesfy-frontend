import React from "react";
import { LoginContainer } from "app-core/container";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';

interface IProps {
	isLogged?: boolean;
	location: any;
}
class Login extends React.Component<IProps> {
	constructor(props) {
		super(props)
	}

	public render() {
		if (this.props.isLogged) {
			const { from } = this.props.location.state || { from: { pathname: RoutesAppEnum.home.route } }
			const to = from && from.pathname !== "/" ? from : { pathname: RoutesAppEnum.home.route };
			return <Redirect to={to} />
		}

		return <LoginContainer />;
	}
}

const mapStateToProps = state => ({
	isLogged: state.user.isLogged,
	isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(Login);
