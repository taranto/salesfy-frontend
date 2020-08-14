import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm, blur, touch } from "redux-form";
import { LoginScreen } from "screens";
import SignInContainer from "app-core/container/sign_in_container/SignInContainer";
import Authentication from 'app-core/boot/Authentication';
import validate from "./Validator"

export class LoginForm extends SignInContainer {

	constructor(props) {
		super(props);
	}

	public login() {
		const { emUser, unKeyPassword } = this.props;

		this.props.dispatch(touch('login', 'emUser'))
		this.props.dispatch(blur('login', 'emUser'));
		this.props.dispatch(touch('login', 'unKeyPassword'))
		this.props.dispatch(blur('login', 'unKeyPassword'));

		const { valid } = this.props;

		if (valid) {
			Authentication.authenticate(emUser, unKeyPassword);
		}
	}

	public render() {
		const { errorMessage } = this.props;
		return <LoginScreen errorMessage={errorMessage} onRegister={this.register} onLogin={this.login} onRecovery={this.recovery} />;
	}
}

const loginContainer = reduxForm({
	form: "login",
	validate
})(LoginForm);

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	errorMessage: state.user.error,
	...formValueSelector("login")(state, "emUser", "unKeyPassword")
});

export default connect(mapStateToProps)(loginContainer);
