export const timeoutPromise = (ms, promise) => {
	return new Promise((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error('Timeout'));
		}, ms);
		promise.then(
			(res) => {
				clearTimeout(timeoutId);
				resolve(res);
			},
			(err) => {
				clearTimeout(timeoutId);
				reject(err);
			}
		);
	})
}

export const bulkIt = (arJoParam:any[]) : any => {
	const arJoBulked = {
		arJoBulk : [...arJoParam]
	}
	return arJoBulked
}
