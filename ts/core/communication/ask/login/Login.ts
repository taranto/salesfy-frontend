import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function signIn(emUser: string, unKeyPassword: string): Promise<any> {
	const request = { emUser, unKeyPassword };

	return Send.post(RoutesEnum.userLogin, request, false, false);
}

export async function facebookSignIn(dsToken: string): Promise<any> {
	const request = { dsToken };

	return Send.post(RoutesEnum.userLoginFacebook, request, false, false);
}

export async function googleSignIn(dsToken: string): Promise<any> {
	const request = { dsToken };

	return Send.post(RoutesEnum.userLoginGmail, request, false, false);
}
