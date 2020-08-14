import { capitalize } from "app-core/utils/string/StringUtils";

export const begin = (dsType: any, obParams?: any) => {
	return {
		type: dsType,
		...obParams
	}
}

export const success = (dsType: any, obParams?: any) => {
	return {
		type: dsType,
		payload: { ...obParams, error: undefined }
	}
}

export const failure = (dsType: any, error: string) => {
	return {
		type: dsType,
		payload: { error }
	}
}

interface IActionsCreator {
	actions: any,
	functions: any
}

export const actionsCreator = (...items): IActionsCreator => {
	const types = ["get", "update", "add", "delete"];
	const states = ["begin", "success", "error"];

	const actions = {};
	const functions = {};
	const object: IActionsCreator = {
		actions, functions
	};
	items.map(name => {
		types.map(type => {
			states.map(state => {
				const keyAction = `${type}_${name}_${state}`.toUpperCase();
				const keyFunction = `${type}${capitalize(name)}${capitalize(state)}`;
				actions[keyAction] = keyAction;
				if (state === "begin") {
					functions[keyFunction] = response => begin(keyAction, response);
				} else if (state === "error") {
					functions[keyFunction] = error => failure(keyAction, error);
				} else {
					functions[keyFunction] = response => success(keyAction, response);
				}
			})
		})
	})
	object['actions'] = actions;
	object['functions'] = functions;

	return object;
}
