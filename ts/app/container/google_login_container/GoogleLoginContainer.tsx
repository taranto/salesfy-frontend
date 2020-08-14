import React from 'react';
import { connect } from "react-redux";
import { googleSignIn } from 'app-core/redux_store/user/Actions';
import { Platform } from 'react-native';
import { GOOGLE_LOGIN_WEB_CLIENT_ID, GOOGLE_LOGIN_IOS_CLIENT_ID, GOOGLE_SCOPES } from 'root/envVars';
import { View } from 'native-base';
import { GoogleButton } from 'app/stories/component/social_button/SocialButton';

interface IProps {
	dispatch: any;
}

class GoogleLoginContainer extends React.Component<IProps> {
	constructor(props) {
		super(props);

		this.signIn = this.signIn.bind(this);

		if (Platform.OS === "android") {
			const { GoogleSignin } = require("react-native-google-signin");
			GoogleSignin.configure({
				scopes: GOOGLE_SCOPES,
				webClientId: GOOGLE_LOGIN_WEB_CLIENT_ID,
				iosClientId: GOOGLE_LOGIN_IOS_CLIENT_ID,
			});
		}
	}

	public signIn() {
		if (Platform.OS === "android") {
			const { GoogleSignin } = require("react-native-google-signin");
			GoogleSignin.hasPlayServices().then(() => {
				GoogleSignin.signIn().then(() => {
					this.props.dispatch(googleSignIn(undefined));
				}).catch(error => {
					// console.log(error);
				})
			});
		};
	}

	public render() {
		if (Platform.OS === "ios") {
			return <View/>
		}
		return (
			<GoogleButton signIn={this.signIn}/>
		)
	}
}

export default connect()(GoogleLoginContainer);
