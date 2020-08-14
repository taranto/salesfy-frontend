class FilterManager {
	public static getKey(location, state, idUser, which?): string {
		if (which !== undefined) {
			return idUser + '_' + location.pathname + which + JSON.stringify(state);
		} else {
			return idUser + '_' + location.pathname;
		}
	}

	public static setDefaultFilter(location, idUser, value, which?) {
		localStorage.setItem(FilterManager.getKey(location, location.state, idUser, which), JSON.stringify(value));
	}

	public static async getDefaultFilter(location, idUser, which?) {
		const data = localStorage.getItem(FilterManager.getKey(location, location.state, idUser, which));
		return Promise.resolve(data ? JSON.parse(data) : {});
	}

	public static async getDefaultFilterValue(location, idUser, which?) {
		const filter: any = await FilterManager.getDefaultFilter(location, idUser, which);
		return Promise.resolve(filter && filter.filterValue ? filter.filterValue : {});
	}
}

export { FilterManager };
