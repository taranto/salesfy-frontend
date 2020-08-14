class SInfo {
	public static async getAllItems(_data): Promise<any> {
		let values = {};
		const keys = Object.keys(localStorage);
		keys.map(key => {
			values = {...values, [key]: localStorage.getItem(key)}
		})

		return new Promise(resolve => {
			resolve(values);
		})
	}

	public static async setItem(key, value, _data): Promise<any> {
		if(value && value !== "undefined"){
			localStorage.setItem(key, value);
		} else {
			localStorage.removeItem(key);
		}

		return new Promise(resolve => {
			resolve({[key]: value});
		})
	}

	public static async deleteItem(key, _data): Promise<any> {
		localStorage.removeItem(key);

		return new Promise(resolve => {
			resolve({});
		})
	}
}

export default SInfo;
