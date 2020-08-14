import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';

const LoginRequiredRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			return (
				rest.isLogged ? (
					<Component {...props} />
				) : (
						<Redirect
							to={{
								pathname: RoutesAppEnum.login.route,
								state: { from: props.location }
							}}
						/>
					)
			)
		}}
	/>
)

export default connect(
	state => ({
		isLogged: state.user.isLogged,
	})
)(LoginRequiredRoute);
