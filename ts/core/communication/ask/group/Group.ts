
import Send from 'app-core/communication/send/Send'
import { RoutesEnum, CtUserGroupAccess } from 'salesfy-shared';

interface IOptions {
	idGroup?: number,
	isFavorite?: boolean
}

export async function getGroupList(limit: number, offset: number, options?: IOptions): Promise<any> {
	let filter = '';
	if(options && options.isFavorite !== undefined){
		filter = `&isFavorite=${options.isFavorite}`
	}
	return Send.get(`${RoutesEnum.group}?qtOffset=0&qtLimit=${limit}${filter}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data'],
					offset: offset + limit,
					remaining: (offset + limit) < response['data'].size
				});
			});
		});
}

export async function getUserGroupList(options): Promise<any> {
	let filter = "";

	if (options.idGroup) {
		filter += `&idGroup=${options.idGroup}`;
	}

	if (options.idUser) {
		filter += `&idUser=${options.idUser}`;
	}

	return Send.get(`${RoutesEnum.userGroup}?${filter}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data'],
					remaining: false
				});
			});
		});
}

export async function getGroupCombo(): Promise<any> {
	const filter = `idCtUserGroupAccess=${CtUserGroupAccess.admin.key}`;

	return Send.get(`${RoutesEnum.group}?${filter}`)
		.then(response => {
			return new Promise((resolve) => {
				resolve({
					items: response['data'],
					remaining: false
				});
			});
		});
}

export async function deleteGroup(idGroup: number) {
	return Send.delete(RoutesEnum.group, { idGroup });
}

export async function deleteUserGroup(idUserGroup: number) {
	return Send.delete(RoutesEnum.userGroup, { idUserGroup });
}

export async function addUserGroup(idUser, idGroup) {
	return Send.post(RoutesEnum.userGroup, { idUser, idGroup, idCtUserGroupAccess: CtUserGroupAccess.reader.key });
}

export async function addInviteGroup(emUser, idGroup) {
	return Send.post(RoutesEnum.invite, { emUserInvite: emUser, idGroup });
}

export async function addGroup(nmGroup) {
	return Send.post(RoutesEnum.group, { nmGroup });
}

export async function updateGroup({nmGroup, idGroup}) {
	return Send.put(RoutesEnum.group, { idGroup, nmGroup });
}

export async function updateUserGroup(data) {
	return Send.put(RoutesEnum.userGroup, data);
}
