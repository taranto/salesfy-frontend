import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

interface IOptions {
	isAward?: boolean;
}

export async function getTagList(limit: number, offset: number, _options?: IOptions): Promise<any> {
	return Send.get(`${RoutesEnum.tag}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data'],
					offset: offset + limit,
					remaining: false
				});
			});
		});
}

export async function getUserTagList(): Promise<any> {
	return Send.get(`${RoutesEnum.userTag}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data']
				});
			});
		});
}

export async function setUserTagList({idTag}): Promise<any> {
	const data = {idTag};
	return Send.post(`${RoutesEnum.userTag}`, data)
		.then(response => {
			return response;
		});
}

export async function removeUserTagList({idTag}): Promise<any> {
	const data = {idTag};
	return Send.delete(`${RoutesEnum.userTag}`, data)
		.then(response => {
			return response;
		});
}
