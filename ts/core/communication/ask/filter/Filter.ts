import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';
import { publishTypes } from '../../../redux_store/content/PublishTypes';
import { normalizeCombo } from 'app-core/utils/Utils';

export async function getFilterTag() {
	return Send.get(`${RoutesEnum.tag}`).then(response => {
		return {tags: normalizeCombo("idTag", "nmTag", response.data)}
	});
}

export async function getFilterGroup() {
	return Send.get(`${RoutesEnum.group}`).then(response => {
		return {groups: normalizeCombo("idGroup", "nmGroup", response.data)}
	});
}

export async function getFilterPublisher() {
	const hasMeQueryParam = '?hasMe=true'
	return Send.get(`${RoutesEnum.userNetwork}${hasMeQueryParam}`).then(response => {
		return {users: normalizeCombo("idUser", "nmUser", response.data.filter(item => item.nmUser))}
	});
}

export async function getFilterCtContent() {
	return Promise.resolve({ctContent: normalizeCombo("idCtContent", "nmCtContent", publishTypes)});
}

export async function getFilterChannel() {
	return Send.get(`${RoutesEnum.channel}`).then(response => {
		return {channels: normalizeCombo("idChannel", "nmChannel", response.data)}
	});
}
