import { actionsCreator } from './Actions';
import { success, begin, failure } from './Reducers';
import { capitalize } from '../string/StringUtils';

class ActionCreator {
	public name;
	public actions;
	public functions;

	constructor(name){
		this.name = name;

		const { actions, functions } = actionsCreator(name);

		this.actions = this.actions ? this.actions.concat(actions) : actions;
		this.functions = this.functions ? this.functions.concat(functions) : functions;

		this.get = this.get.bind(this);
		this.getSimple = this.getSimple.bind(this);
		this.add = this.add.bind(this);
		this.update = this.update.bind(this);
		this.remove = this.remove.bind(this);
		this.defaultReducer = this.defaultReducer.bind(this);
	}

	public get(asyncFunction) {
		return (fields) => {
			return dispatch => {
				dispatch(this.functions[`get${capitalize(this.name)}Begin`]({}))
				return asyncFunction(fields).then(items => {
					dispatch(this.functions[`get${capitalize(this.name)}Success`]({ items }));
					return items;
				}).catch(error => {
					dispatch(this.functions[`get${capitalize(this.name)}Error`](error.message))
					throw error;
				})
			}
		}
	}

	public getSimple(asyncFunction) {
		return (fields) => {
			return dispatch => {
				return asyncFunction(fields).then(response => {
					dispatch(this.functions[`get${capitalize(this.name)}Success`](response));
					return response;
				}).catch(error => {
					dispatch(this.functions[`get${capitalize(this.name)}Error`](error.message))
					throw error;
				})
			}
		}
	}

	public add(asyncFunction) {
		return (item) => {
			return dispatch => {
				dispatch(this.functions[`add${capitalize(this.name)}Begin`]({}))
				return asyncFunction(item).then(data => {
					dispatch(this.functions[`add${capitalize(this.name)}Success`]({ item: data }));
					return data;
				}).catch(error => {
					dispatch(this.functions[`add${capitalize(this.name)}Error`](error.message))
					throw error;
				})
			}
		}
	}

	public update(asyncFunction) {
		return (item) => {
			return dispatch => {
				dispatch(this.functions[`update${capitalize(this.name)}Begin`]({}))
				return asyncFunction(item).then(data => {
					dispatch(this.functions[`update${capitalize(this.name)}Success`]({ item: data }));
					return data;
				}).catch(error => {
					dispatch(this.functions[`update${capitalize(this.name)}Error`](error.message))
					throw error;
				})
			}
		}
	}

	public remove(asyncFunction) {
		return (item) => {
			return dispatch => {
				dispatch(this.functions[`delete${capitalize(this.name)}Begin`]({}))
				return asyncFunction(item).then(() => {
					dispatch(this.functions[`delete${capitalize(this.name)}Success`]({ ...item }));
					return item;
				}).catch(error => {
					dispatch(this.functions[`delete${capitalize(this.name)}Error`](error.message))
					throw error;
				})
			}
		}
	}

	public set(type) {
		return payload => {
			return dispatch => {
				dispatch({type, payload});
			};
		};
	}

	public defaultReducer(state, action){
		let newState = state;
		if(action.type){
			if(action.type.endsWith(`_${this.name.toUpperCase()}_SUCCESS`)){
				newState = success(state, { ...action.payload });
			} else if(action.type.endsWith(`_${this.name.toUpperCase()}_BEGIN`)){
				newState = begin(state, action.payload);
			} else if(action.type.endsWith(`_${this.name.toUpperCase()}_ERROR`)){
				newState = failure(state, action.payload.error);
			}
		}
		return newState;
	}
}

export default ActionCreator;
