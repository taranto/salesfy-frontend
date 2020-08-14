import React from "react";
import { ILoading } from "app-core/utils/interfaces";
import ScreenToolbar from 'web/container/screen_toolbar/ScreenToolbar';
import { ListHeaderTitle } from 'web/stories/component';
import { I18n, KeyEnum } from 'salesfy-shared';
import GroupList from "web/stories/screen/group_screen/GroupList";

interface IProps extends ILoading {
	items: IgroupRow[] | IgroupRow
	hasAuthInItem: any
	onRowAdd: any,
	onRowUpdate: any;
	removeGroupRow: any;
	removeUserGroupRow: any;
	updateUserAuth: any;
	favoriteGroup: any;
}

export interface IgroupRow extends IgroupRowChild {
	action?: string
	idCtUserGroupAccess: number
	idGroup: number
	idUser: number
	idUserGroup: number
	idWorkspace: number
	isActive: boolean
	isFavorite: boolean
	isGroup: boolean
	nmGroup: string
	tableData: IgroupRowChild
	idGroupDeleting?:number
}

export interface IgroupRowChild extends IuserRow {
	childRows: IuserRow[]
	id: number
	isTreeExpanded: boolean
}

export interface IuserRow {
	emUser: string
	idCtUserGroupAccess: number
	idGroup: number
	idUser: number
	idUserGroup: number
	isFavorite: boolean
	nmGroup: string
	nmUser: string
	piAvatar: any
	tableData: any
}

const GroupScreen = (props:IProps) => {
	const {
		items, hasAuthInItem, onRowAdd,
		onRowUpdate, removeGroupRow, removeUserGroupRow, updateUserAuth, favoriteGroup
	} = props;
	return (
		<div>
			<div className="group-screen">
				<ScreenToolbar useBackHistory={true}>
					<ListHeaderTitle title={I18n.t(KeyEnum.group, { context: "plural" })} />
				</ScreenToolbar>
				<div className="screen-content">
					<GroupList
						groupListRows={items}
						hasAuthInItem={hasAuthInItem}
						onRowAdd={onRowAdd}
						onRowUpdate={onRowUpdate}
						removeGroupRow={removeGroupRow}
						removeUserGroupRow={removeUserGroupRow}
						updateUserAuth={updateUserAuth}
						favoriteGroup={favoriteGroup}
					/>
				</div>
			</div>
		</div>
		);
}


export default GroupScreen;
