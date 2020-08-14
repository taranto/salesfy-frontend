import * as React from "react";
import { Form } from "native-base";
import { Field } from "redux-form";
import { FormInput, FormButtons, SignIn } from "components";
import { ISignInScreen } from "app-core/utils/interfaces";
import { KeyEnum, I18n } from "salesfy-shared";
import { FormTitle } from "app/stories/component/form/Form";

// tslint:disable-next-line:variable-name
const RegisterEmail = ({errorMessage, onLogin, onRegister, onRecovery, isLoading }: ISignInScreen) => {
	return (
		<SignIn isLoading={isLoading}>
			<FormTitle title={I18n.t(KeyEnum.notRegisteredTitle)}/>
			<RegisterEmailForm />
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
export const RegisterEmailForm = () => {
	return (
		<Form>
			<Field
				name="emContact"
				label={I18n.t(KeyEnum.email)}
				component={FormInput}
				autoCapitalize={"none"}
			/>
		</Form>
	)
}

export default RegisterEmail;
