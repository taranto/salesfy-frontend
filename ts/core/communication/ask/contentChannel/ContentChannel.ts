import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function addContentChannel(data) {
	return Send.post(RoutesEnum.contentChannel, data, true).then(response => {
		return response.data
	});
}

export async function updateContentChannel(data) {
	return Send.put(RoutesEnum.contentChannel, data, true).then(response => {
		return response.data
	});
}

export async function removeContentChannel(data) {
	return Send.delete(RoutesEnum.contentChannel, data, true);
}

export async function getContentChannel(data) {
	let filter = "";
	if(data.idContent){
		filter += `&idContent=${data.idContent}`
	}
	return Send.get(`${RoutesEnum.contentChannel}?${filter}`, true).then(response => {
		return response.data
	});
}
