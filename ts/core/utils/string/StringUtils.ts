import { StringUtil } from 'salesfy-shared';

export const capitalize = (str) => {
	if (str) {
		const splitStr = str.split(' ');
		for (let i = 0; i < splitStr.length; i++) {
			// You do not need to check if i is larger than splitStr length, as your for does that for you
			// Assign it back to the array
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}
		// Directly return the joined string
		return splitStr.join(' ');
	}

	return;
}

export const imageNameUtils = (idUser, name) => {
	return `${idUser ? idUser : '-1'}-${new Date().toLocaleString('pt-BR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	}).replace(/\//g, '-').replace(" ", "")}.${(name ? name : '').split('.').pop()}`
}

export const queryOrFilter = (filter, keys) => {
	let filterResult = '';
	if (filter) {
		keys.map(key => {
			if(filter[key]){
				const isArray = Array.isArray(filter[key]);
				if (isArray && filter[key].length > 0) {
					filterResult = `&${StringUtil.jsonToQueryString({ [key]: filter[key] }).replace("?", "")}`;
				} else {
					filterResult = `&${key}=${filter[key]}`;
				}
			}
		})
	}
	return filterResult;
}

export const queryAndFilter = (filter, keys) => {
	let filterResult = '';
	if (filter) {
		keys.map(key => {
			if(filter[key]){
				if (filter[key] && filter[key] !== '') {
					const isArray = Array.isArray(filter[key]);
					if (isArray && filter[key].length > 0) {
						filterResult += `&${StringUtil.jsonToQueryString({ [key]: filter[key] }).replace("?", "")}`;
					} else {
						filterResult += `&${key}=${filter[key]}`;
					}
				}
			}
		})
	}
	return filterResult;
}
