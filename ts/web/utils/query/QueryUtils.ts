import queryString from 'query-string';

export const getSearchQuery = (location) => {
	return (location && location.search) && queryString.parse(location.search);
}
