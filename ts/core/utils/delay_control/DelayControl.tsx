import { BUTTON_CLICK_DELAY, FILTER_DELAY } from 'root/envVars';

let timeout;
export const actionAwait = (onClick) => {
	return (props) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		const promise = new Promise((resolve) => {
			timeout = setTimeout(() => {
				resolve(onClick(props));
			}, BUTTON_CLICK_DELAY);
		});
		return promise;
	};
}

let filterTime;
export const filterTimeSubmit = (callback) => {
	if(filterTime){
		clearTimeout(filterTime);
	}
	filterTime = setTimeout(() => {
		if(callback && callback instanceof Function){
			callback();
		}
	}, FILTER_DELAY)
}

let executeTime;
export const executeAwait = (callback) => {
	if(executeTime){
		clearTimeout(executeTime);
	}
	executeTime = setTimeout(() => {
		if(callback && callback instanceof Function){
			callback();
		}
	}, BUTTON_CLICK_DELAY)
}
