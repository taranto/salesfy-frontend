import * as React from "react";
import { Form, View } from "native-base";
import { Field } from "redux-form";
import { FormInput, FormButtons, SignIn } from "components"
import { ISignInScreen } from "app-core/utils/interfaces";
import { KeyEnum, I18n } from "salesfy-shared";
import FacebookLoginContainer from "app/container/facebook_login_container/FacebookLoginContainer";
import GoogleLoginContainer from "app/container/google_login_container/GoogleLoginContainer";

// tslint:disable-next-line:variable-name
const Login = ({ errorMessage, onLogin, onRecovery, onRegister, isLoading }: ISignInScreen) => {
	return (
		<SignIn isLoading={isLoading}>
			<LoginForm />
			<FormButtons
				submitText={I18n.t(KeyEnum.signIn)}
				submitPress={onLogin}
				subLinkText={I18n.t(KeyEnum.notRegistered)}
				subLinkPress={onRegister}
				linkText={I18n.t(KeyEnum.forgotPassword_ask)}
				linkPress={onRecovery}
				errorMessage={errorMessage}
			/>
			<View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
				<FacebookLoginContainer />
				<GoogleLoginContainer />
			</View>
		</SignIn>);
}

// tslint:disable-next-line:variable-name
export const LoginForm = () => {
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

export default Login;
