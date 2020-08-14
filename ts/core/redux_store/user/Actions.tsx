import * as Ask from 'app-core/communication/ask/Ask';
import { success, actionsCreator } from 'app-core/utils/redux/Actions';
import Authentication from 'app-core/boot/Authentication';
import { NavigationActions } from 'native/Navigation';
import { GoogleSignin } from 'native/GoogleLogin';
import { AccessToken, LoginManager } from 'native/FacebookLogin';
import { showTags, hideTabAll } from 'app-core/redux_store/home/Actions';
import { SConst } from 'salesfy-shared';
import { versionCompatibility } from 'app-core/redux_store/app/Actions';

const { actions, functions } = actionsCreator('user', 'login', 'comboUsers');
export { actions as userActions, functions as userFunctions };

export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_RECOVERY_SUCCESS = 'USER_RECOVERY_SUCCESS';
export const USER_IS_ACCEPTED_TERMS = 'USER_IS_ACCEPTED_TERMS';
export const USER_SESSION_TOKENS = 'USER_SESSION_TOKENS';

export const userIsAcceptedTerms = (response) => success(USER_IS_ACCEPTED_TERMS, response);
export const userSessionTokens = (response) => success(USER_SESSION_TOKENS, response);
export const userLogoutSuccess = (response) => success(USER_LOGOUT_SUCCESS, response);
export const userRecoverySuccess = (response) => success(USER_RECOVERY_SUCCESS, response);

const newUserAction = (dispatch, response) => {
	if (response.data && response.data.isNewUser === true) {
		dispatch(hideTabAll());
		dispatch(showTags());
	}
};

export const signIn = (nmUserKey, unKeyPassword) => {
	return (dispatch) => {
		dispatch(functions.getLoginBegin());

		return Ask.signIn(nmUserKey, unKeyPassword)
			.then((response) => {
				signInResponse(dispatch, response, { emUser: nmUserKey, unKeyPassword });
			})
			.catch((error) => {
				Authentication.resetAuthentication();
				dispatch(functions.getLoginError(error));
			});
	};
};

export const facebookSignIn = (dsFacebookToken) => {
	return async (dispatch) => {
		dispatch(functions.getLoginBegin());

		try {
			if (!dsFacebookToken) {
				const user = await AccessToken.getCurrentAccessToken();
				dsFacebookToken = user.accessToken;

				if (!dsFacebookToken) {
					Authentication.resetAuthentication();
					return new Promise((_resolve, reject) => reject({}));
				}
			}

			return Ask.facebookSignIn(dsFacebookToken).then((response) => {
				signInResponse(dispatch, response, { dsFacebookToken });
			});
		} catch (error) {
			Authentication.resetAuthentication();
			dispatch(functions.getLoginError(error));
		}
	};
};

export const googleSignIn = (dsGoogleToken) => {
	return async (dispatch) => {
		dispatch(functions.getLoginBegin());

		try {
			if (!dsGoogleToken) {
				const user = await GoogleSignin.signInSilently();
				dsGoogleToken = user.idToken;

				if (!dsGoogleToken) {
					Authentication.resetAuthentication();
					return new Promise((_resolve, reject) => reject({}));
				}
			}

			return Ask.googleSignIn(dsGoogleToken).then((response) => {
				signInResponse(dispatch, response, { dsGoogleToken });
			});
		} catch (error) {
			Authentication.resetAuthentication();
			dispatch(functions.getLoginError(error));
		}
	};
};

const signInResponse = (dispatch, response, generic) => {
	const headers = response.headers.map ? response.headers.map : response.headers;

	newUserAction(dispatch, response);
	dispatch(functions.getLoginSuccess({ ...generic, ...response.data }));
	dispatch(versionCompatibility());
	dispatch(
		userSessionTokens({
			accessToken: headers[SConst.X_ACCESS_TOKEN],
			refreshToken: headers[SConst.X_REFRESH_TOKEN]
		})
	);

	// Authentication.genericAuthentication(generic);
};

export function register(emUser, unKeyPassword) {
	return (dispatch) => {
		dispatch(functions.getLoginBegin());

		return Ask.register(emUser, unKeyPassword)
			.then((response) => {
				newUserAction(dispatch, response);
				dispatch(functions.getLoginSuccess({}));
				// Authentication.genericAuthentication({ emUser, unKeyPassword });
			})
			.catch((error) => {
				dispatch(functions.getLoginError(error));
			});
	};
}

export function registerEmail(emContact) {
	return (dispatch) => {
		return Ask.registerForm(emContact)
			.then((response) => {
				dispatch(functions.getLoginSuccess({}));
				return response;
			})
			.catch((error) => {
				dispatch(functions.getLoginError(error));
			});
	};
}

export function logout() {
	return (dispatch) => {
		dispatch(functions.getLoginBegin());

		LoginManager.logOut();
		Authentication.resetAuthentication()
			.then(() => {
				dispatch(userLogoutSuccess({}));
				dispatch(NavigationActions.navigate({ routeName: 'Home' }));
			})
			.catch((error) => {
				dispatch(functions.getLoginError(error));
			});
	};
}

export function recovery(emUser) {
	return (dispatch) => {
		// dispatch(functions.getUserBegin())
		return Ask.recovery(emUser)
			.then((_response) => {
				dispatch(userRecoverySuccess({}));
			})
			.catch((err) => {
				throw err;
				// dispatch(functions.getUserError(err))
			});
	};
}

export function acceptTerms(isAcceptedTerms) {
	return (dispatch) => {
		dispatch(userIsAcceptedTerms({ isAcceptedTerms: !isAcceptedTerms }));
	};
}

export function getUserNetworkData() {
	return (dispatch) => {
		dispatch(functions.getComboUsersBegin());

		return Ask.getUserNetwork()
			.then((response) => {
				dispatch(functions.getComboUsersSuccess(response));
			})
			.catch((error) => {
				dispatch(functions.getComboUsersError(error));
			});
	};
}

export function clearComboUserNetWork() {
	return (dispatch) => {
		dispatch(functions.getComboUsersSuccess({ items: [] }));
	};
}

export function addComboUserNetwork(user) {
	return (dispatch) => {
		dispatch(functions.getComboUsersSuccess({ concat: true, user }));
	};
}

export function getUserMe() {
	return (dispatch) => {
		// dispatch(functions.getUserBegin())
		return Ask.getUserMe()
			.then((response) => {
				dispatch(functions.getUserSuccess(response));
			})
			.catch((error) => {
				dispatch(functions.getUserError(error));
			});
	};
}
