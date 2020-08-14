import { FilterManager } from 'web/native/FilterManager';
import { getGroupFavoriteList } from 'app-core/redux_store/group/Actions';

export default function PreloadedActions(dispatch, idUser) {
	dispatch(getGroupFavoriteList(5, 0));

	FilterManager.setDefaultFilter({ pathname: '/content' }, idUser, {
		filterValue: { nmSort: 'keyCtContentState' }
	});

	FilterManager.setDefaultFilter({ pathname: '/home/channels' }, idUser, {
		filterValue: { nmSort: 'keyCtContentState' }
	});
}
