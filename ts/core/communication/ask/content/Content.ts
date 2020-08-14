import Send from 'app-core/communication/send/Send';
import { RoutesEnum, StringUtil } from 'salesfy-shared';
import { getStore } from 'app-core/boot/ConfigureStore';
import { getUserTagList } from 'app-core/redux_store/tag/Actions';
import { FEED_CHANNEL } from 'root/envVars';
import { queryOrFilter, queryAndFilter } from 'app-core/utils/string/StringUtils';
import { addContentChannel } from 'app-core/communication/ask/contentChannel/ContentChannel';

interface IOptions {
	idTag?: number;
	idChannel?: number;
	isFavorite?: boolean;
	filter: {
		nmContent?: string;
		nmTag?: string;
		nmGroup?: string;
		nmPublisher?: string;
		nmCtContent?: string;
		nmChannel?: string;
		dsContent?: string;
		dsChannel?: string;
	};
	nmSort?: string;
	isPlaybook?: string;
	idPublisher?: string;
	isActiveChannel?: boolean | undefined;
}

export async function getContentList(
	limit: number,
	offset: number,
	options?: IOptions,
	_isTagChange?: boolean
): Promise<any> {
	return fetchTagsContentList(limit, offset, options);
}

export async function fetchTagsContentList(limit: number, offset: number, options?: IOptions) {
	const state = getStore().getState();
	const { selected } = state.tagList;
	const { items } = state.contentList;

	return !selected
		? getStore().dispatch(getUserTagList()).then((response) => {
				return fetchContentList(limit, offset, items, options, response);
			})
		: fetchContentList(limit, offset, items, options, selected);
}

export async function fetchContentList(
	limit: number,
	offset: number,
	_items: any[],
	options?: IOptions,
	selects?: any[]
): Promise<any> {
	const tags: any[] = [];

	// console.log({ options });

	if (selects) {
		selects.map((item) => {
			tags.push(item.idTag as number);
		});
	}

	const filterTags =
		options && options.idChannel === FEED_CHANNEL && tags.length > 0
			? `${StringUtil.jsonToQueryString({ arIdTag: tags })}&isPlaybook=false`
			: '?';
	// const filterNotIn = items && items.length > 0 ? `&${StringUtil.jsonToQueryString({ arIdContentNotIn: items.map(item => item.idContent) }).replace("?", "")}` : '';
	const filterChannel =
		options && (options.idChannel !== FEED_CHANNEL || tags.length === 0) && options.idChannel
			? `&idChannel=${options.idChannel}`
			: ``;
	const filterFavorite = options && options.isFavorite ? `&isFavorite=${options.isFavorite}` : ``;
	const filterIdPublisher = options && options.idPublisher ? `&idPublisher=${options.idPublisher}` : ``;
	const filterNmSort = options && options.nmSort ? `&nmSort=${options.nmSort}` : ``;
	const filterIsPlaybook = options && options.isPlaybook !== undefined ? `&isPlaybook=${options.isPlaybook}` : ``;
	const isActiveChannel =
		options && options.isActiveChannel !== undefined ? `&isActiveChannel=${options.isActiveChannel}` : '';

	const useSimpleFilter = queryOrFilter(options && options.filter, [
		'dsSearch',
		'nmContent',
		'dsContent',
		'nmTag',
		'nmGroup',
		'nmPublisher',
		'nmCtContent',
		'nmChannel',
		'dsChannel'
	]);

	const useAdvancedFilter = queryAndFilter(options && options.filter, [
		'arIdGroup',
		'arIdTag',
		'arIdPublisher',
		'arCtContent',
		'arIdChannel'
	]);

	// tslint:disable-next-line:max-line-length
	// console.log(`${RoutesEnum.content}${filterTags}&qtOffset=${offset}&qtLimit=${limit}${filterFavorite}${filterChannel}${filterIdPublisher}${filterNmSort}${filterIsPlaybook}${useSimpleFilter}${useAdvancedFilter}`);

	// tslint:disable-next-line:max-line-length
	return Send.get(
		`${RoutesEnum.content}${filterTags}&qtOffset=${offset}&qtLimit=${limit}${isActiveChannel}${filterFavorite}${filterChannel}${filterIdPublisher}${filterNmSort}${filterIsPlaybook}${useSimpleFilter}${useAdvancedFilter}`
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

export async function getContent(idContent: number): Promise<any> {
	return Send.get(`${RoutesEnum.content}?idContent=${idContent}`).then((response) => {
		return new Promise((resolve) => {
			resolve({
				item: response['data']
			});
		});
	});
}

export async function insert(item): Promise<any> {
	const {
		nmContent,
		piContent,
		dsContent,
		idCtContent,
		lkContent,
		shShowDescription,
		shShowTitle,
		shShowShortCard,
		shShowPublisher,
		shShowFullscreenImage,
		shShowActionButtons
	} = item;

	const request = {
		nmContent,
		dsContent,
		lkContent,
		piContent,
		idCtContent,
		shShowDescription,
		shShowTitle,
		shShowShortCard,
		shShowPublisher,
		shShowFullscreenImage,
		shShowActionButtons
	};

	return Send.post(RoutesEnum.contentPublishPackage, request, true);
}

export async function insertImport({ lkPlatformProfile }) {
	const request = { lkPlatformProfile };
	return Send.post(RoutesEnum.contentPublishPackage, request, true);
}

export async function addContent(item) {
	return Send.post(RoutesEnum.content, item, true).then(({ data }) => {
		const idChannel = item.idChannel;
		if (idChannel) {
			return addContentChannel({ idChannel, idContent: data.idContent }).then(() => {
				return data;
			});
		}
		return data;
	});
}

export async function updateContent(data) {
	return Send.put(RoutesEnum.content, data, true).then((response) => {
		return response.data;
	});
}

export async function deleteContent(data) {
	return Send.delete(RoutesEnum.content, data, true);
}

export async function getChannelContentCombo(data) {
	let filter = 'isChannelAdmin=true';
	if (data.isPlaybook) {
		filter += `&isPlaybook=${data.isPlaybook}`;
	}
	return Send.get(`${RoutesEnum.channel}?${filter}`, true).then((response) => {
		return { channelCombo: response.data };
	});
}

export async function setContentConversion(idContent) {
	return Send.get(`${RoutesEnum.contentConversion}?idContent=${idContent}`, true);
}
