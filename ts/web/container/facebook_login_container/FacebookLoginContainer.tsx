import React from 'react';
import { facebookSignIn } from 'app-core/redux_store/user/Actions';
import { connect } from "react-redux";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FACEBOOK_LOGIN_CLIENT_ID, STR_FACEBOOK_SCOPES } from 'root/envVars';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';

interface IProps {
	dispatch: any;
	style:any;
}
class FacebookLoginContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.onLoginFinished = this.onLoginFinished.bind(this);
	}

	public onLoginFinished(response) {
		this.props.dispatch(facebookSignIn(response.accessToken));
	}

	public render() {
		return (
			<FacebookLogin
				appId={FACEBOOK_LOGIN_CLIENT_ID} // APP ID NOT CREATED YET
				fields={STR_FACEBOOK_SCOPES}
				buttonStyle={this.props.style}
				callback={this.onLoginFinished}
				render={(renderProps:any) => (
					<Button variant="outlined" className="facebook-button" disabled={renderProps.disabled} onClick={renderProps.onClick}>
						<img src={require('assets/facebook.svg')}/>
						<Typography>{"Facebook"}</Typography>
					</Button>
				)}
			/>
		);
	}
};

export default connect()(FacebookLoginContainer);
