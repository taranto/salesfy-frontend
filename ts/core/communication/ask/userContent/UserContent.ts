import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function updateUserContent(data) {
	return Send.put(RoutesEnum.userContent, data, true).then(response => {
		return response.data
	});
}
