import * as React from "react";
import { Field } from "redux-form";
import { FormInput, FormButtons, SignIn } from "components"
import { ISignInScreen } from "app-core/utils/interfaces";
import { KeyEnum, I18n } from "salesfy-shared";
import styles from './styles';
import FacebookLoginContainer from "web/container/facebook_login_container/FacebookLoginContainer";
import GoogleLoginContainer from "web/container/google_login_container/GoogleLoginContainer";
import { Translation } from 'app-core/utils/translate/Translation';
import { NoAccount } from "web/stories/component/sign_in/SignIn";
import { useDispatch } from 'react-redux';
import { recovery } from "app-core/redux_store/user/Actions";
import Alert from "web/native/Alert";

const Login = ({ onLogin, isLoading, errorMessage }: ISignInScreen) => {
	const [isPasswordRecovery, setPasswordRecovery] = React.useState(false)
	const [emUser, setEmUser] = React.useState("")
	if (!isPasswordRecovery) {
		return (
			<>
				<SignIn isLoading={isLoading} isPasswordRecovery={isPasswordRecovery} >
					<LoginForm onSubmit={onLogin} />
					<FormButtons
						submitText={I18n.t(KeyEnum.signIn)}
						submitPress={onLogin}
						errorMessage={errorMessage}
					/>
					<span className="orLabel"><hr />{Translation.or}<hr /></span>
					<div style={styles.socialContainer}>
						<GoogleLoginContainer style={styles.socialButton} />
						<FacebookLoginContainer style={styles.socialButton} />
					</div>
					<span className="orLabel"><hr />{Translation.or}<hr /></span>
					<NoAccount
						isPasswordRecovery={isPasswordRecovery}
						setPasswordRecovery={setPasswordRecovery}
					/>
				</SignIn>
			</>
		);
	} else {
		const dispatch = useDispatch();
		const onRecovery = async () => {
			try {
				await dispatch(recovery(emUser));
				Alert.success(Translation.anEmailWasSentTo + " " + emUser);
			} catch (e) {
				Alert.error(Translation.anErrorOcurred)
			}
		}
		return (
			<>
				<SignIn isLoading={isLoading} isPasswordRecovery={isPasswordRecovery} >
					<RecoveryForm onSubmit={onRecovery} setEmUser={setEmUser}  />
					<FormButtons
						submitText={Translation.toRecover}
						submitPress={onRecovery}
						errorMessage={errorMessage}
					/>
					<span className="orLabel"><hr />{Translation.or}<hr /></span>
					<NoAccount
						isPasswordRecovery={isPasswordRecovery}
						setPasswordRecovery={setPasswordRecovery}
					/>
				</SignIn>
			</>
		);
	}
}

export const RecoveryForm = ({ onSubmit, setEmUser }) => {
	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			onSubmit();
		}
	}

	return (
		<div style={styles.column}>
			<Field
				name="emUserRecovery"
				label={Translation.email}
				component={FormInput}
				autoCapitalize={"none"}
				onKeyPress={onKeyPress}
				onChange={(e)=>setEmUser(e.target.value)}

			/>
		</div>
	)
}

export const LoginForm = ({ onSubmit }) => {
	const onKeyPress = (event) => {
		if (event.key === 'Enter') {
			onSubmit();
		}
	}

	return (
		<div style={styles.column}>
			<Field
				name="emUser"
				label={Translation.email}
				component={FormInput}
				autoCapitalize={"none"}
				onKeyPress={onKeyPress}
			/>
			<Field
				name="unKeyPassword"
				label={I18n.t(KeyEnum.password)}
				secureTextEntry={true}
				component={FormInput}
				autoCapitalize={"none"}
				onKeyPress={onKeyPress}
			/>
		</div>
	)
}

export default Login;
