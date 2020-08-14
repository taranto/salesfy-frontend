import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function register(emUser:string, unKeyPassword: string): Promise<any> {
	const data = { emUser, unKeyPassword };
	return Send.post(RoutesEnum.userRegister, data, false)
}

export async function registerForm(emContact:string): Promise<any> {
	const data = { emContact, nmContact: emContact, snTelephone: '999999999' };
	return Send.post(RoutesEnum.contact, data, false)
}
