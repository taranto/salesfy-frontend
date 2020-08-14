import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm, touch, blur } from "redux-form";
import { RegisterScreen } from "screens";
import { register, acceptTerms } from "app-core/redux_store/user/Actions"
import SignInContainer from "app-core/container/sign_in_container/SignInContainer";
import validate from "./Validator"
import { fireErrorMessage } from "app/stories/component/toast/Toast";
import { I18n, KeyEnum } from "salesfy-shared";
import { Linking } from "react-native";
import { HATCHERS_TERM_LINK } from "root/envVars";

class RegisterForm extends SignInContainer {

	constructor(props) {
		super(props);

		this.changeAcceptTerms = this.changeAcceptTerms.bind(this);
	}

	public register() {
		const { emUser, unKeyPassword, isAcceptedTerms, valid } = this.props;

		this.props.dispatch(touch('register', 'emUser'))
		this.props.dispatch(blur('register', 'emUser'));
		this.props.dispatch(touch('register', 'unKeyPassword'))
		this.props.dispatch(blur('register', 'unKeyPassword'));

		if (valid) {
			if (isAcceptedTerms) {
				this.props.dispatch(register(emUser, unKeyPassword));
			} else {
				fireErrorMessage(I18n.t(KeyEnum.acceptTerms))
			}
		}
	}

	public changeAcceptTerms() {
		const { isAcceptedTerms } = this.props;
		this.props.dispatch(acceptTerms(isAcceptedTerms));
	}

	public goToTermsOfUse() {
		Linking.openURL(HATCHERS_TERM_LINK);
	}

	public render() {
		const { errorMessage, isAcceptedTerms } = this.props;

		return (
			<RegisterScreen
				goToTermsOfUse={this.goToTermsOfUse}
				changeAcceptTerms={this.changeAcceptTerms}
				isAcceptedTerms={isAcceptedTerms}
				onRegister={this.register}
				onLogin={this.login}
				onRecovery={this.recovery}
				errorMessage={errorMessage}
			/>
		);
	}
}

const registerContainer = reduxForm({
	form: "register",
	validate
})(RegisterForm);

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	errorMessage: state.user.error,
	isAcceptedTerms: state.user.isAcceptedTerms,
	...formValueSelector('register')(state, 'emUser', 'unKeyPassword')
});

export default connect(mapStateToProps)(registerContainer);
