import * as React from "react";
import { Form } from "native-base";
import { Field } from "redux-form";
import { FormInput, FormButtons, SignIn } from "components"
import { ISignInScreen } from "app-core/utils/interfaces";
import { KeyEnum, I18n } from "salesfy-shared";

// tslint:disable-next-line:variable-name
const Login = ({errorMessage, onLogin, onRegister, onRecovery, isLoading}:ISignInScreen) => {
	return (
		<SignIn isLoading={isLoading}>
				<RecoveryForm/>
				<FormButtons
					submitText={I18n.t(KeyEnum.recoveryPassword)}
					submitPress={onRecovery}
					linkText={I18n.t(KeyEnum.alreadyRegistered, {context: "ask"})}
					linkPress={onLogin}
					subLinkText={I18n.t(KeyEnum.notRegistered)}
					subLinkPress={onRegister}
					errorMessage={errorMessage}
				/>
		</SignIn>
		);
}

// tslint:disable-next-line:variable-name
export const RecoveryForm = () => {
	return (
		<Form>
			<Field
				name="emUser"
				label={I18n.t(KeyEnum.email)}
				component={FormInput}
				autoCapitalize={"none"}
			/>
		</Form>
	)
}

export default Login;
