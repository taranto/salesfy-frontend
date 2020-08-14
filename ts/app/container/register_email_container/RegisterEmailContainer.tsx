import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm, touch, blur } from "redux-form";
import { RegisterEmailScreen } from "screens";
import { registerEmail } from "app-core/redux_store/user/Actions"
import SignInContainer from "app-core/container/sign_in_container/SignInContainer";
import validate from "app/container/register_email_container/Validator"
import { Alert } from 'native/Alert';
import { Translation } from 'app-core/utils/translate/Translation';
import { I18n, KeyEnum } from 'salesfy-shared';

class RegisterEmailForm extends SignInContainer {

	constructor(props) {
		super(props);
	}

	public register() {
		const { emContact, valid, dispatch, navigation } = this.props;

		dispatch(touch('register-email', 'emContact'))
		dispatch(blur('register-email', 'emContact'));

		if (valid) {
			dispatch(registerEmail(emContact)).then(() => {
				if(navigation){
					Alert.success(I18n.t(KeyEnum.registerEmailSuccess))
					navigation.navigate('Login');
				}
			});
		}
	}

	public render() {
		const { errorMessage } = this.props;

		return (
			<RegisterEmailScreen
				onRegister={this.register}
				onLogin={this.login}
				onRecovery={this.recovery}
				errorMessage={errorMessage}
			/>
		);
	}
}

const registerEmailContainer = reduxForm({
	form: "register-email",
	validate
})(RegisterEmailForm);

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	errorMessage: state.user.error,
	...formValueSelector('register-email')(state, 'emContact', 'emUser')
});

export default connect(mapStateToProps)(registerEmailContainer);
