import React from 'react';
import { connect } from 'react-redux';
import { GroupScreen } from 'screens';
import {
	getGroupList,
	removeGroup,
	removeUserGroup,
	addUserGroup,
	addGroup,
	updateGroup,
	updateUserGroup,
	addInviteGroup
} from 'app-core/redux_store/group/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { IProgressiveList } from 'app-core/utils/interfaces';
import { actionAwait } from 'app-core/utils/delay_control/DelayControl';
import { CtUserGroupAccess } from 'salesfy-shared';

interface IProps extends IProgressiveList {
	dispatch: any;
	options: any;
	idUser: any;
}

class GroupContainer extends React.Component<IProps> {
	constructor(props) {
		super(props);

		this.addItem = this.addItem.bind(this);
		this.removeGroupRow = this.removeGroupRow.bind(this);
		this.removeUserGroupRow = this.removeUserGroupRow.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.hasAuthInItem = this.hasAuthInItem.bind(this);
		this.updateUserAuth = this.updateUserAuth.bind(this);
		this.favoriteGroup = this.favoriteGroup.bind(this);
	}

	public componentWillMount() {
		const { dispatch, options } = this.props;
		dispatch(getGroupList(LIST_LIMIT_DEFAULT, 0, options));
	}

	public favoriteGroup({ idUserGroup, isFavorite }) {
		const { dispatch } = this.props;
		dispatch(updateUserGroup({ idUserGroup, isFavorite: !isFavorite }));
	}

	public async addItem(item) {
		const { dispatch } = this.props;
		if (item.isInvite) {
			await dispatch(addInviteGroup(item));
		}
		if (!item.isInvite && item.idUser) {
			await dispatch(addUserGroup(item));
		}
		if (!item.isInvite && !item.idUser) {
			await dispatch(addGroup(item));
		}
	}

	public updateItem(newItem, _oldItem) {
		return this.props.dispatch(updateGroup(newItem));
	}

	public async removeGroupRow(idGroup: number) {
		const { dispatch } = this.props;
		await dispatch(removeGroup(idGroup));
	}

	public async removeUserGroupRow(rowData) {
		const { dispatch, idUser } = this.props;
		await dispatch(removeUserGroup({ ...rowData, isMyAuth: idUser === rowData.idUser }));
	}

	public hasAuthInItem(item) {
		const { items, idUser } = this.props;
		const arAllRowItem = items;
		const theRowItem = item;

		if (arAllRowItem.length === 0) {
			return false;
		}

		if (
			theRowItem.isGroup ||
			(!theRowItem.isGroup && theRowItem.idUser !== undefined && theRowItem.idUser !== idUser)
		) {
			const userMe1 = arAllRowItem.filter(
				(userMeToFind) =>
					!userMeToFind.isGroup &&
					userMeToFind.idGroup === theRowItem.idGroup &&
					userMeToFind.idUser === idUser
			);
			const isArrEmpty = !(Array.isArray(userMe1) && userMe1.length);

			if (isArrEmpty) {
				return false;
			}
			const accessId = userMe1[0].idCtUserGroupAccess;
			const hasAccess = accessId === CtUserGroupAccess.admin.key;

			if (accessId) {
				return hasAccess;
			}

			return false;
		}
		if (!theRowItem.isGroup && theRowItem.idUser === idUser) {
			return true;
		}
		return false;
	}

	public updateUserAuth(item) {
		return this.props.dispatch(updateUserGroup(item));
	}

	public render() {
		const { items } = this.props;
		return (
			<GroupScreen
				items={items}
				hasAuthInItem={this.hasAuthInItem}
				onRowAdd={actionAwait(this.addItem)}
				onRowUpdate={actionAwait(this.updateItem)}
				removeGroupRow={actionAwait(this.removeGroupRow)}
				removeUserGroupRow={actionAwait(this.removeUserGroupRow)}
				updateUserAuth={actionAwait(this.updateUserAuth)}
				favoriteGroup={this.favoriteGroup}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	options: state.group.options,
	items: state.group.items,
	offset: state.group.offset,
	remaining: state.group.remaining,
	idUser: state.user.idUser
});

export default connect(mapStateToProps)(GroupContainer);
