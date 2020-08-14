export const begin = (state, obParams = {}) => {
	return {
		...state,
		isLoading: true,
		...obParams
	}
}

export const success = (state, obParams) => {
	return {
		...state,
		...obParams,
		isLoading: false
	}
}

export const failure = (state, error) => {
	return {
		...state,
		error,
		isLoading: false
	}
}
