import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm, touch, blur } from "redux-form";
import { RecoveryScreen } from "screens";
import SignInContainer from "app-core/container/sign_in_container/SignInContainer";
import { recovery } from "app-core/redux_store/user/Actions"
import validate from "./Validator"
import { fireSuccessMessage } from "app/stories/component/toast/Toast";
import { I18n, KeyEnum } from "salesfy-shared";

class RecoveryForm extends SignInContainer {

	constructor(props) {
		super(props);
	}

	public recovery() {
		const { emUser, dispatch, valid } = this.props;

		this.props.dispatch(touch('recovery', 'emUser'))
		this.props.dispatch(blur('recovery', 'emUser'));

		if (valid) {
			dispatch(recovery(emUser)).then(_response => {
				fireSuccessMessage(I18n.t(KeyEnum.passwordRecoverySuccessful))
			});
		}
	}

	public render() {
		const { errorMessage } = this.props;
		return <RecoveryScreen errorMessage={errorMessage} onRegister={this.register} onLogin={this.login} onRecovery={this.recovery}/>;
	}
}

const recoveryContainer = reduxForm({
	form: "recovery",
	validate
})(RecoveryForm);

const mapStateToProps = state => ({
	isLoading: state.user.isLoading,
	errorMessage: state.user.error,
	emUser: formValueSelector('recovery')(state, 'emUser')
});

export default connect(mapStateToProps)(recoveryContainer);
