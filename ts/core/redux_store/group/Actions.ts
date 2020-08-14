import * as Ask from 'app-core/communication/ask/Ask';
import { actionsCreator } from 'app-core/utils/redux/Actions';
import Alert from 'native/Alert';
import { clearComboUserNetWork } from 'app-core/redux_store/user/Actions';
import { Translation } from 'app-core/utils/translate/Translation';

const { actions, functions } = actionsCreator('group', 'userGroup', 'invite', 'groupCombo');

export { actions as groupActions };

export const getGroupList = (limit, offset, options) => {
	return (dispatch) => {
		dispatch(functions.getGroupBegin({}));
		return Ask.getGroupList(limit, offset, options)
			.then((group) => {
				return Ask.getUserGroupList({ limit, offset }).then((userGroup) => {
					const items = group.items.map((item) => ({ ...item, isGroup: true })).concat(userGroup.items);
					dispatch(functions.getGroupSuccess({ items, options, refreshing: false }));
				});
			})
			.catch((err) => {
				dispatch(functions.getGroupError(err));
				Alert.error(err);
			});
	};
};

export const getGroupFavoriteList = (limit, offset) => {
	return (dispatch) => {
		dispatch(functions.getGroupBegin({}));
		return Ask.getGroupList(limit, offset, { isFavorite: true })
			.then((response) => {
				dispatch(functions.getGroupSuccess({ favoriteItems: response.items }));
			})
			.catch((err) => {
				dispatch(functions.getGroupError(err));
				Alert.error(err);
			});
	};
};

export const getGroupComboList = () => {
	return (dispatch) => {
		dispatch(functions.getGroupComboBegin({}));
		return Ask.getGroupCombo()
			.then((response) => {
				dispatch(functions.getGroupComboSuccess({ comboItems: response.items }));
			})
			.catch((err) => {
				dispatch(functions.getGroupComboError(err));
			});
	};
};

export const getUserGroupList = (limit, offset, options) => {
	return (dispatch) => {
		dispatch(functions.getGroupBegin({}));
		return Ask.getUserGroupList({ limit, offset })
			.then((response) => {
				dispatch(functions.getGroupSuccess({ ...response, options, refreshing: false }));
			})
			.catch((err) => {
				dispatch(functions.getGroupError(err));
				Alert.error(err);
			});
	};
};

export const removeUserGroup = ({ idUserGroup, idGroup, isMyAuth }) => {
	return (dispatch) => {
		dispatch(functions.deleteUserGroupBegin({}));
		return Ask.deleteUserGroup(idUserGroup)
			.then(() => {
				dispatch(functions.deleteUserGroupSuccess({ idUserGroup, idGroup, isMyAuth }));
				dispatch(getGroupFavoriteList(5, 0));
				Alert.success(Translation.userRemovedSuccessfully);
			})
			.catch((err) => {
				dispatch(functions.deleteUserGroupError(err));
				Alert.error(err);
			});
	};
};

export const addUserGroup = (itemData) => {
	const { idUser, idGroup } = itemData;
	return (dispatch) => {
		dispatch(functions.addUserGroupBegin({}));
		return Ask.addUserGroup(idUser, idGroup)
			.then((userGroup) => {
				dispatch(functions.addUserGroupSuccess({ data: { ...itemData, ...userGroup.data } }));
				Alert.success(Translation.userAddedToGroupSuccessfully);
			})
			.catch((err) => {
				dispatch(functions.addUserGroupError(err));
				Alert.error(err);
			});
	};
};

export const updateUserGroup = (itemData) => {
	return (dispatch) => {
		dispatch(functions.updateUserGroupBegin({}));
		return Ask.updateUserGroup(itemData)
			.then((group) => {
				const isItemFavorited = itemData.isFavorite;
				dispatch(functions.updateUserGroupSuccess({ data: group.data }));
				if (isItemFavorited === true) {
					Alert.success(Translation.onFavoriteGroup);
				}
				if (isItemFavorited === false) {
					Alert.success(Translation.onUnFavoriteGroup);
				}
				if (typeof itemData.idCtUserGroupAccess === 'number') {
					Alert.success(Translation.userTypeChangedSuccesfully);
				}
			})
			.catch((err) => {
				dispatch(functions.updateUserGroupError(err));
				Alert.error(err);
			});
	};
};

export const addGroup = (itemData) => {
	const { nmGroup } = itemData;
	return (dispatch) => {
		dispatch(functions.addGroupBegin({}));
		return Ask.addGroup(nmGroup)
			.then((group) => {
				Alert.success(Translation.groupAddedSuccessfully);
				return Ask.getUserGroupList({ idGroup: group.data.idGroup }).then((userGroup) => {
					const items = [ { ...itemData, ...group.data, isGroup: true } ].concat(userGroup.items);
					dispatch(functions.addGroupSuccess({ data: items }));
				});
			})
			.catch((err) => {
				dispatch(functions.addGroupError(err));
				Alert.error(err);
			});
	};
};

export const updateGroup = (itemData) => {
	return (dispatch) => {
		dispatch(functions.updateGroupBegin({}));
		return Ask.updateGroup(itemData)
			.then((group) => {
				dispatch(functions.updateGroupSuccess({ data: { ...group.data, isGroup: true } }));
				Alert.success(Translation.groupUpdatedSuccessfully);
			})
			.catch((err) => {
				dispatch(functions.updateGroupError(err));
				Alert.error(err);
			});
	};
};

export const removeGroup = (idGroup) => {
	return (dispatch) => {
		dispatch(functions.deleteGroupBegin({}));
		return Ask.deleteGroup(idGroup)
			.then(() => {
				dispatch(functions.deleteGroupSuccess({ idGroup }));
				dispatch(getGroupFavoriteList(5, 0));
				Alert.success(Translation.groupRemovedSuccessfully);
			})
			.catch((err) => {
				dispatch(functions.deleteGroupError(err));
				Alert.error(err);
			});
	};
};

export const addInviteGroup = (itemData) => {
	const { emUser, idGroup } = itemData;
	return (dispatch) => {
		dispatch(functions.addInviteBegin({}));
		return Ask.addInviteGroup(emUser, idGroup)
			.then((user) => {
				Alert.success(Translation.userInvitedSuccessfully);
				dispatch(functions.addInviteSuccess({ data: { ...user.data } }));
				dispatch(clearComboUserNetWork());
			})
			.catch((err) => {
				dispatch(functions.addInviteError(err));
				Alert.error(err);
			});
	};
};
