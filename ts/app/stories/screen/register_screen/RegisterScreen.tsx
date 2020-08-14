import * as React from "react";
import { Form } from "native-base";
import { Field } from "redux-form";
import { FormInput, FormButtons, SignIn, AcceptTerms } from "components";
import { ISignInScreen } from "app-core/utils/interfaces";
import { KeyEnum, I18n } from "salesfy-shared";

// tslint:disable-next-line:variable-name
const Register = ({errorMessage, onLogin, onRegister, onRecovery, isLoading, isAcceptedTerms, changeAcceptTerms, goToTermsOfUse }: ISignInScreen) => {
	return (
		<SignIn isLoading={isLoading}>
			<RegisterForm />
			<AcceptTerms checked={isAcceptedTerms} goToTermsOfUse={goToTermsOfUse} changeAcceptTerms={changeAcceptTerms}/>
			<FormButtons
				submitText={I18n.t(KeyEnum.register)}
				submitPress={onRegister}
				linkText={I18n.t(KeyEnum.alreadyRegistered, {context: "ask"})}
				linkPress={onLogin}
				subLinkPress={onRecovery}
				errorMessage={errorMessage}
			/>
		</SignIn>
	);
}

// tslint:disable-next-line:variable-name
export const RegisterForm = () => {
	return (
		<Form>
			<Field
				name="emUser"
				label={I18n.t(KeyEnum.email)}
				component={FormInput}
				autoCapitalize={"none"}
			/>
			<Field
				name="unKeyPassword"
				label={I18n.t(KeyEnum.password)}
				secureTextEntry={true}
				component={FormInput}
				autoCapitalize={"none"}
			/>
		</Form>
	)
}

export default Register;
