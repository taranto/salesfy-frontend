import Send from 'app-core/communication/send/Send';
import { RoutesEnum } from 'salesfy-shared';
import { queryOrFilter, queryAndFilter } from 'app-core/utils/string/StringUtils';

interface IOptions {
	isAward?: boolean;
	isPlaybook?: boolean;
	nmSort?: any;
	filter?: {
		nmTag?: string;
		nmGroup?: string;
		nmPublisher?: string;
		nmCtContent?: string;
		nmChannel?: string;
		dsChannel?: string;
	};
}

export async function getChannelList(limit: number, offset: number, options?: IOptions): Promise<any> {
	let filter = '&sbContentState=true';
	if (options) {
		filter += options.isAward !== undefined ? `&isAward=${options.isAward}` : '';
		filter += options.isPlaybook !== undefined ? `&isPlaybook=${options.isPlaybook}` : '';
	}
	const useSimpleFilter = queryOrFilter(options && options.filter, [
		'dsSearch',
		'nmChannel',
		'dsChannel',
		'nmTag',
		'nmGroup',
		'nmPublisher'
	]);

	const useAdvancedFilter = queryAndFilter(options && options.filter, [ 'arIdGroup', 'arIdPublisher', 'arIdTag' ]);

	let filterNmSort = options && options.nmSort ? `&nmSort=${options.nmSort}` : ``;

	if (!filterNmSort) {
		if (options && options.isPlaybook === true) {
			filterNmSort = '&nmSort=nmChannel';
		} else {
			filterNmSort = '&nmSort=dhLastConversion';
		}
	}

	return Send.get(
		`${RoutesEnum.channel}?qtOffset=${offset}&qtLimit=${limit}${filter}${useSimpleFilter}${useAdvancedFilter}${filterNmSort}`
	).then((response) => {
		return new Promise((resolve) => {
			resolve({
				items: response['data'],
				offset: offset + limit,
				remaining: limit <= response['data'].length
			});
		});
	});
}

export async function getChannelStoriesList(limit, offset): Promise<any> {
	return Send.get(`${RoutesEnum.channelStories}?qtOffset=${offset}&qtLimit=${limit}`).then((response) => {
		return new Promise((resolve) => {
			resolve({
				items: response['data'],
				offsetStories: offset + limit,
				remainingStories: limit <= response['data'].length
			});
		});
	});
}

export async function addChannel(data): Promise<any> {
	return Send.post(RoutesEnum.channel, data).then((response) => {
		return new Promise((resolve) => {
			resolve({
				data: response['data']
			});
		});
	});
}

export async function copyChannel(data): Promise<any> {
	return Send.post(RoutesEnum.channelCopy, data).then((response) => {
		return new Promise((resolve) => {
			resolve({
				data: response['data']
			});
		});
	});
}

export async function channelImport(data): Promise<any> {
	return Send.post('/channel/import', data);
}

export async function updateChannel(data): Promise<any> {
	return Send.put(RoutesEnum.channel, data).then((response) => {
		return new Promise((resolve) => {
			resolve({
				data: response['data']
			});
		});
	});
}

export async function addChannelGroup(data): Promise<any> {
	return Send.post(RoutesEnum.channelGroup, data).then((response) => {
		return new Promise((resolve) => {
			resolve({
				data: response['data']
			});
		});
	});
}

export async function updateChannelGroup(data): Promise<any> {
	return Send.put(RoutesEnum.channelGroup, data).then((response) => {
		return new Promise((resolve) => {
			resolve({
				data: response['data']
			});
		});
	});
}

export async function deleteChannelGroup(data): Promise<any> {
	return Send.delete(RoutesEnum.channelGroup, data);
}

export async function deleteChannel(data): Promise<any> {
	return Send.delete(RoutesEnum.channel, data);
}

export async function getChannelGroup(idChannel): Promise<any> {
	return Send.get(`${RoutesEnum.channelGroup}?idChannel=${idChannel}`).then((response) => {
		return new Promise((resolve) => {
			resolve(response['data']);
		});
	});
}

export async function getChannel(idChannel): Promise<any> {
	return Send.get(`${RoutesEnum.channel}?idChannel=${idChannel}`).then((response) => {
		return new Promise((resolve) => {
			resolve(response['data'][0]);
		});
	});
}
