import React from 'react';
import { connect } from "react-redux";
import GoogleLogin from 'react-google-login';
import { googleSignIn } from 'app-core/redux_store/user/Actions';
import { GOOGLE_LOGIN_WEB_CLIENT_ID, STR_GOOGLE_SCOPES } from 'root/envVars';
import { Button } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Alert from 'web/native/Alert';

interface IProps{
	dispatch: any;
	style: any;
}

class GoogleLoginContainer extends React.Component<IProps> {
	constructor(props) {
		super(props);

		this.signIn = this.signIn.bind(this);
	}

	public signIn(response) {
		try {
			this.props.dispatch(googleSignIn(response.tokenId));
		} catch (e) {
			// console.log(e)
			Alert.error("Não foi possível logar via google")
		}
	}

	public render() {
		return (
			<GoogleLogin
				clientId={GOOGLE_LOGIN_WEB_CLIENT_ID}
				scope={STR_GOOGLE_SCOPES}
				render={(props:any) => (
					<Button variant="outlined" className="google-button" disabled={props.disabled} onClick={props.onClick}>
						<img src={require('assets/search.svg')}/>
						<Typography>{"Google"}</Typography>
					</Button>
				)}
				style={this.props.style}
				onSuccess={this.signIn}
				onFailure={(e) => {
					console.log(e)
					// Alert.error("Não foi possível logar via google")
				}}
			/>
		)
	}
}

export default connect()(GoogleLoginContainer);
