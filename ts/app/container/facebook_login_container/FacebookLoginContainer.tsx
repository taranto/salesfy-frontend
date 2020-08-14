import React from 'react';
import { LoginManager } from 'react-native-fbsdk';
import { facebookSignIn } from 'app-core/redux_store/user/Actions';
import { connect } from "react-redux";
import bugsnag from 'boot/CrashReporting';
import { FACEBOOK_SCOPES } from 'root/envVars';
import { Translation } from 'app-core/utils/translate/Translation';
import { Alert } from 'app/native/Alert';
import { FacebookButton } from 'app/stories/component/social_button/SocialButton';

interface IProps {
	dispatch: any;
}
class FacebookLoginContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
	}

	public handleFacebookLogin() {
		LoginManager.logInWithReadPermissions(FACEBOOK_SCOPES).then(result => {
			if(!result.isCancelled){
				this.props.dispatch(facebookSignIn(undefined));
			}
		}, (error) => {
			bugsnag.notify(error);
			Alert.error(Translation.facebookProblem)
		});
	}

	public render() {
		return (
			<FacebookButton handleFacebookLogin={this.handleFacebookLogin}/>
		);
	}
};

export default connect()(FacebookLoginContainer);
