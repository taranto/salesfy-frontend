import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function recovery(emUser:string): Promise<any> {
	return Send.get(`${RoutesEnum.userPasswordRecovery}?emUser=${emUser}`, false)
		.then(response => {
			return response;
		})
}
