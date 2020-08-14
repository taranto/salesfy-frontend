import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';


export async function getUserNetwork(): Promise<any> {
	return Send.get(`${RoutesEnum.userNetwork}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data']
				});
			});
		});
}

export async function getUserMe(): Promise<any> {
	return Send.get(RoutesEnum.userMe).then(response => {
		return new Promise((resolve) => {
			resolve(response['data']);
		});
	});
}

export async function getUser({emUser}): Promise<any> {
	let filter = '';
	if(emUser){
		filter = `emUser=${emUser}`;
	}
	return Send.get(`${RoutesEnum.user}?${filter}`).then(response => {
		return new Promise((resolve) => {
			resolve(response['data']);
		});
	});
}
