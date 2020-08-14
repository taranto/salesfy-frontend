import { signIn, userLogoutSuccess, userSessionTokens, facebookSignIn, googleSignIn, userFunctions } from 'app-core/redux_store/user/Actions'
import { CRYPTO_KEYCHAIN_SERVICE, CRYPTO_SHARED_PREFERENCES_NAME } from 'root/envVars';
import { getStore } from "app-core/boot/ConfigureStore";
import { timeoutPromise } from 'app-core/utils/communication/Communication';
import * as Ask from 'app-core/communication/ask/Ask'
import { appStatus, versionCompatibility } from 'app-core/redux_store/app/Actions';
import { offlineStatus, problemStatus } from 'app-core/utils/app_status/AppStatus';
// import { IAuthToken } from 'app-core/utils/interfaces';
import { LoginManager } from 'native/FacebookLogin';
import { NavigationActions } from 'native/Navigation';
import SInfo from 'native/SInfo';
import Send from 'app-core/communication/send/Send';
import { SConst } from 'salesfy-shared';

interface ICredential {
	service: string;
	emUser: string;
	unKeyPassword: string;
	dsFacebookToken?: string;
	dsGoogleToken?: string;
}

const options = {
	keychainService: CRYPTO_KEYCHAIN_SERVICE,
	sharedPreferencesName: CRYPTO_SHARED_PREFERENCES_NAME
}

const logoutState = {
	dsFacebookToken: undefined, dsGoogleToken: undefined,
	accessToken: undefined, refreshToken: undefined,
	isLogged: false, loggedOut: true
}

const getCredentials = (credential) => {
	if (credential && credential.dsGoogleToken) {
		const { dsGoogleToken } = credential as ICredential;
		return { dsGoogleToken };
	} else if (credential && credential.dsFacebookToken) {
		const { dsFacebookToken } = credential as ICredential;
		return { dsFacebookToken };
	} else if (credential && credential.emUser && credential.unKeyPassword) {
		const { emUser, unKeyPassword } = credential as ICredential;
		return { emUser, unKeyPassword };
	} else if (credential && credential.length > 0 && credential[0].length > 0) {// ios
		const emUserValue = credential[0].filter(item => item.key === "emUser")[0];
		const unKeyPasswordValue = credential[0].filter(item => item.key === "unKeyPassword")[0];

		if(emUserValue && unKeyPasswordValue){
			const emUser = emUserValue.value;
			const unKeyPassword = unKeyPasswordValue.value;

			return { emUser, unKeyPassword }
		}
		return;
	} else {
		return;
	}
}

async function authPromise() {
	return getStore().dispatch(versionCompatibility()).then(response => {
		const tokens = Send.getTokens();
		if (response) {
			if(response.hasTokens){
				getStore().dispatch(userFunctions.getLoginSuccess({}));
			} else if (tokens && tokens[SConst.X_ACCESS_TOKEN] && [SConst.X_REFRESH_TOKEN]) {
				getStore().dispatch(userSessionTokens(tokens))
				getStore().dispatch(userFunctions.getLoginSuccess({}))
			} else {
				return SInfo.getAllItems(options).then(credential => {
					const joCredential = getCredentials(credential);
					if (joCredential) {
						const { emUser, unKeyPassword, dsFacebookToken, dsGoogleToken } = joCredential as ICredential;

						if (dsFacebookToken) {
							getStore().dispatch(facebookSignIn(undefined));
						} else if(dsGoogleToken) {
							getStore().dispatch(googleSignIn(undefined));
						} else if(emUser && unKeyPassword) {
							authenticate(emUser, unKeyPassword);
						} else {
							resetAuthentication();
							getStore().dispatch(NavigationActions.navigate({ routeName: "Login" }))
						}
					} else {
						resetAuthentication();
						getStore().dispatch(NavigationActions.navigate({ routeName: "Login" }))
					}
				}).catch(() => {
					resetAuthentication();
					getStore().dispatch(NavigationActions.navigate({ routeName: "Login" }));
				});
			}
		}

		return response;
	})
}

const initAuthentication = () => {
	timeoutPromise(15000, authPromise()).catch(error => {
		resetAuthentication();
		if (error.message && error.message.toLowerCase() === 'timeout') {
			getStore().dispatch(appStatus(offlineStatus()));
			getStore().dispatch(NavigationActions.navigate({ routeName: "LoaderError" }));
		} else {
			getStore().dispatch(appStatus(problemStatus()));
			getStore().dispatch(NavigationActions.navigate({ routeName: "LoaderError" }));
		}
	})
}

async function reAuthentication() {
	return SInfo.getAllItems(options).then(credential => {
		const joCredential = getCredentials(credential);
		if (joCredential) {
			const { emUser, unKeyPassword, dsFacebookToken, dsGoogleToken } = joCredential as ICredential;

			if (dsGoogleToken) {
				return getStore().dispatch(googleSignIn(undefined));
			} else if (dsFacebookToken) {
				return getStore().dispatch(facebookSignIn(undefined));
			} else if(emUser && unKeyPassword){
				return Ask.signIn(emUser, unKeyPassword).then(() => {
					authenticate(emUser, unKeyPassword);
					return false
				}).catch(() => {
					resetAuthentication();
					return true;
				})
			} else {
				resetAuthentication();
				return true;
			}
		} else {
			resetAuthentication();
			return true;
		}
	});
}

const authenticate = (emUser, unKeyPassword) => {
	const { dispatch }: any = getStore();

	return dispatch(signIn(emUser, unKeyPassword));
}

// const genericAuthentication = async ({ emUser, unKeyPassword, dsFacebookToken, dsGoogleToken }: IAuthToken) => {
	const genericAuthentication = async () => {
	// SInfo.setItem("emUser", emUser, options);
	// SInfo.setItem("unKeyPassword", unKeyPassword, options);
	// SInfo.setItem("dsFacebookToken", dsFacebookToken, options);
	// SInfo.setItem("dsGoogleToken", dsGoogleToken, options);
}

const resetAuthentication = async () => {
	getStore().dispatch(userLogoutSuccess(logoutState))
	SInfo.deleteItem("emUser", options);
	SInfo.deleteItem("unKeyPassword", options);
	SInfo.deleteItem("dsFacebookToken", options);
	SInfo.deleteItem("dsGoogleToken", options);

	LoginManager.logOut();

	Send.setAccessToken(undefined);
	Send.setRefreshToken(undefined);

	return new Promise(resolve => {
		resolve(true);
	});
}

export default {
	initAuthentication, reAuthentication, authenticate, genericAuthentication, resetAuthentication
};
