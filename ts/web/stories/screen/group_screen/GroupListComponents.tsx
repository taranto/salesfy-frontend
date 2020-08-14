import React from 'react';
import { Translation } from 'app-core/utils/translate/Translation';
import { I18n, KeyEnum, RegExpConst } from 'salesfy-shared/js/EntryPoint';
import { S3_PATH_CONTENT } from 'root/envVars';
import { RemoveLabel, EditLabel, ChangeUserTypeLabel } from 'web/stories/component/list/Customize';
import { UserNameField, UserTypeField, NewUserField } from 'web/stories/component/user/User';
import UserSuggestion from 'web/stories/component/group/UserSuggestion';
import NewGroupCombo from 'web/stories/component/group/NewGroupTextField';
import { GroupNameField } from 'web/stories/component/group/GroupActionFields';
import { DeleteButton, EditButton, VoidButton } from 'web/stories/component/button/Button';
import { MTableToolbar } from 'material-table';
import { CtUserGroupAccess } from 'salesfy-shared';

export const getOptions = () => {
	return {
		selection: false,
		columnsButton: false,
		paging: false,
		actionsColumnIndex: -1
	};
};

const customFilterAndSearch = (items: any[]) => {
	return (dsSearchTerm, rowData) => {
		const dsSearchTermLC = dsSearchTerm.toLowerCase();
		let childrens: any = [];
		let parents: any = [];
		if (rowData.isGroup) {
			childrens = items.filter((item) => {
				return (
					item.idGroup === rowData.idGroup &&
					((item.nmUser && item.nmUser.toLowerCase().includes(dsSearchTermLC)) ||
						(item.emUser && item.emUser.toLowerCase().includes(dsSearchTermLC)))
				);
			});
		} else {
			parents = items.filter(
				(item) =>
					item.idGroup === rowData.idGroup &&
					item.nmGroup &&
					item.nmGroup.toLowerCase().includes(dsSearchTermLC)
			);
		}
		return rowData.isGroup
			? rowData.nmGroup && (rowData.nmGroup.toLowerCase().includes(dsSearchTermLC) || childrens.length > 0)
			: (rowData.nmUser &&
					(rowData.nmUser.toLowerCase().includes(dsSearchTermLC) ||
						(rowData.emUser && rowData.emUser.toLowerCase().includes(dsSearchTermLC)))) ||
				parents.length > 0;
	};
};

export const handleNewRowUtil = (newItems, blurTime, setNewRow) => (row?) => {
	const isGroup = row.isGroup;
	setNewRow({});
	if (!isGroup) setNewRow({ config: { isNew: true, nmUser: Translation.newUser, idUser: -1, isGroup: true } });
	else {
		const idRow = row.tableData.id;
		newItems[idRow].tableData.isTreeExpanded = true;

		if (blurTime) {
			clearTimeout(blurTime);
		}
		setNewRow({
			config: { isNew: true, nmUser: Translation.newUser, idUser: -1, isGroup: false, idGroup: row.idGroup }
		});

		if (!row) setNewRow({ config: { isNew: true, nmUser: Translation.newUser, idUser: -1, isGroup: true } });
	}
};

export const handleRowModeUtil = (setRowMode) => (row, action) => {
	const idRow = row.tableData.id;
	setRowMode({ idRow, action });
};

export const getExcludeIdsUtil = (groupListRows) => (idGroup) => {
	let parent;
	let result = [];
	groupListRows
		? (parent = groupListRows.filter((parentItem) => parentItem.isGroup && parentItem.idGroup === idGroup)[0])
		: null;
	parent.tableData ? (result = parent.tableData.childRows.map((user) => user.idUser)) : null;
	return result;
};

export const getNewGroupButton = () => {
	// botão de nova equipe, dispara uma função que adicionar uma nova linha
	// na ultima posição da lista para inserir o nome do novo grupo
	// a ser inserido, esta função que dispara é aquela ali do onClick
	return [
		{
			icon: () => <div />,
			isFreeAction: true,
			onClick: () => null
		}
	];
};

const RemoveLabelRow = ({ onBlurRowLabel, row, removeGroupRow, removeUserGroupRow, setLoadingState }) => {
	return (
		<div>
			<div className="remove-label-container">
				<RemoveLabel
					setLoadingState={setLoadingState}
					onBlur={onBlurRowLabel}
					rowData={row}
					removeGroupRow={removeGroupRow}
					removeUserGroupRow={removeUserGroupRow}
				/>
			</div>
			<div className="window-blur" />
		</div>
	);
};

const EditRowLabel = ({ onRowUpdate, onBlurRowLabel, row, setLoadingState }) => {
	return (
		<div>
			<div className="edit-group-combo">
				<EditLabel
					placeholder={Translation.groupName}
					row={row}
					onBlur={onBlurRowLabel}
					onRowUpdate={onRowUpdate}
					setLoadingState={setLoadingState}
				/>
			</div>
			<div className="window-blur" />
		</div>
	);
};

const ChangeUserTypeConfirmation = ({
	onBlurRowLabel,
	hasAuthInItem,
	updateUserAuth,
	idUserGroup,
	idCtUserGroupAccess,
	row
}) => {
	const hasAuthToAction = hasAuthInItem(row);
	return (
		<div>
			<div className="change-role-container">
				<ChangeUserTypeLabel
					onBlur={onBlurRowLabel}
					onPress={hasAuthToAction && updateUserAuth}
					idUserGroup={idUserGroup}
					idCtUserGroupAccess={idCtUserGroupAccess}
				/>
			</div>
			<div className="window-blur" />
		</div>
	);
};

const getRowStateAndFields = (
	groupListRows,
	handleRowMode,
	removeGroupRow,
	removeUserGroupRow,
	onRowUpdate,
	hasAuthInItem,
	updateUserAuth,
	getExcludeIds,
	onBlurNewItem,
	onRowAdd,
	handleNewRow,
	favoriteGroup,
	setLoadingState,
	idUserLogged
) => ({
	// essa função getRowStateAndFields retorna um objeto que tem o
	// comportamento de criar o corpo das rows (tanto do grupo quanto do usuário)

	title: I18n.t(KeyEnum.name),
	field: 'nmGroup',
	removable: false,
	customFilterAndSearch: customFilterAndSearch(groupListRows),
	render: (row) => {
		const hasAuthToAction = hasAuthInItem(row);

		const {
			isGroup,
			idUserGroup,
			nmUser,
			piAvatar,
			emUser,
			mode,
			nmGroup,
			isNew,
			idGroup,
			editing,
			idCtUserGroupAccess
		} = row;

		let childRows = [];

		if (row.isGroup) childRows = row.tableData.childRows;

		const isFavoriteFromMe = isFavoriteFromUser(childRows, idUserLogged);
		const myIdUserGroup = getIdUserGroup(childRows, idUserLogged);

		const onFavoriteGroup = () => {
			favoriteGroup({ idUserGroup: myIdUserGroup, isFavorite: isFavoriteFromMe });
		};

		let image = require('assets/profile.png');
		if (piAvatar) {
			image = RegExpConst.HTTP_S.test(piAvatar) ? piAvatar : `${S3_PATH_CONTENT}/${piAvatar}`;
		}
		const onBlurRowLabel = () => {
			const action = undefined;
			handleRowMode(row, action);
		};
		const ctDelete = 'delete';
		const ctEdit = 'edit';

		// aqui fica o estado de cada row,
		// ela possui 3 estados, o estado de remover linha
		// o estado de editar linha
		// e o estado de confirmação de troca de role do usuário no grupo
		// esses estados são alterados por uma função que seta novas propriedades
		// para a linha com determinado id
		// essas propriedades que segue são: mode: string = 'delete' | 'edit' | 'change-role'
		// como que segue abaixo, para cada modo é exibido a atualização do estado dessa row.
		if (mode) {
			if (mode && mode === ctDelete) {
				return (
					<RemoveLabelRow
						setLoadingState={setLoadingState}
						onBlurRowLabel={onBlurRowLabel}
						row={row}
						removeGroupRow={removeGroupRow}
						removeUserGroupRow={removeUserGroupRow}
					/>
				);
			}

			if (mode && mode === ctEdit) {
				return (
					<EditRowLabel
						setLoadingState={setLoadingState}
						onRowUpdate={onRowUpdate}
						onBlurRowLabel={onBlurRowLabel}
						row={row}
					/>
				);
			}

			return (
				<ChangeUserTypeConfirmation
					onBlurRowLabel={onBlurRowLabel}
					hasAuthInItem={hasAuthInItem}
					updateUserAuth={updateUserAuth}
					idUserGroup={idUserGroup}
					idCtUserGroupAccess={idCtUserGroupAccess}
					row={row}
				/>
			);
		}

		if (isNew || editing) {
			// essa parte do código quer adicionar um novo membro ou editar o nome de uma equipe,
			// então existem dois modos de nova row:
			// a primeira é isNew (adicionar novo membro)
			// e a segunda é editing para ver se a row está em estado de edição de nome do group
			// esses estados aparecem porque handleNewRowUtil coloca essas propriedades
			// dentro de uma row caso o usuário clique em uma das 2 ações:
			// (novo membro, ou editar equipe)
			return (
				<div>
					<NewUserField>
						{idGroup ? (
							// adicionar usuário
							<UserSuggestion
								excludeIds={getExcludeIds(idGroup)}
								placeholder={I18n.t(KeyEnum.addOrInviteUser)}
								onBlur={onBlurNewItem}
								submit={(value) => onRowAdd({ ...value, idGroup })}
							/>
						) : (
							// adicionar nova equipe
							<NewGroupCombo
								placeholder={Translation.groupName}
								onBlur={onBlurNewItem}
								submit={(value) => onRowAdd({ nmGroup: value })}
							/>
						)}
					</NewUserField>
				</div>
			);
		}
		// UserNameField é o nome do usuário e email na row
		// e GroupNameField é o nome do Grupo
		// GroupNameField vem com ele 2 componentes para serem clicados pelos usuários:
		// o componente para adicionar usuario (onNewItem)
		// e o componente para favoritar grupo (onFavorite)
		return !isGroup ? (
			<UserNameField nmUser={nmUser} piAvatar={image} emUser={emUser} />
		) : (
			<GroupNameField
				isFavorite={isFavoriteFromMe}
				nmGroup={nmGroup}
				onNewItem={hasAuthToAction && (() => handleNewRow(row))}
				onFavorite={onFavoriteGroup}
			/>
		);
	}
});

const getUserTypeColumn = (handleRowMode, idUserLogged, hasAuthInItem, updateUserAuth, groupListRows) => ({
	// aqui nessa coluna temos 2 componentes sendo renderizados na row
	// o EditButton(bara editar o nome da equipe) e o UserTypeField (para alterar a role do user no group)
	render: (rowData) => {
		const hasAuthToAction = hasAuthInItem(rowData);
		const { idCtUserGroupAccess, idUserGroup, isGroup, isNew } = rowData;
		const editAction = 'edit';
		const changeRoleAction = 'change-role';

		const handleOnClickEdit = () => {
			handleRowMode(rowData, editAction);
		};
		const handleOnClickChangeRole = () => {
			handleRowMode(rowData, changeRoleAction);
		};

		let hasAdminExceptMe;
		hasAdminExceptMe = hasAdminExceptMeUtil(rowData, groupListRows, idUserLogged, hasAdminExceptMe);
		const isAdmin =
			idUserLogged == rowData.idUser && (hasAdminExceptMe || (idCtUserGroupAccess > 1 && hasAdminExceptMe));
		if (rowData.isGroup && !rowData.mode && hasAuthToAction) return <EditButton onClick={handleOnClickEdit} />;

		if (!isGroup && !isNew && !rowData.mode) {
			return (
				<UserTypeField
					idUserGroup={idUserGroup}
					idCtUserGroupAccess={idCtUserGroupAccess}
					disabled={!hasAuthToAction}
					onPress={isAdmin ? handleOnClickChangeRole : hasAuthInItem(rowData) && updateUserAuth}
				/>
			);
		}
		return rowData.mode ? <div /> : <VoidButton />;
	}
});

const getDeleteButton = (handleRowMode, hasAuthInItem) => ({
	render: (rowData) => {
		const hasAuthToAction = hasAuthInItem(rowData);
		const action = 'delete';
		const handleOnClick = () => {
			handleRowMode(rowData, action);
		};
		// esse botão é a action de excluir a row
		if (!rowData.mode && hasAuthToAction) return <DeleteButton className="danger-button" onClick={handleOnClick} />;
		return rowData.mode ? <div /> : <VoidButton />;
	}
});

export const getColumns = (
	groupListRows,
	handleRowMode,
	removeGroupRow,
	removeUserGroupRow,
	onRowUpdate,
	hasAuthInItem,
	updateUserAuth,
	getExcludeIds,
	onBlurNewItem,
	onRowAdd,
	handleNewRow,
	favoriteGroup,
	idUserLogged,
	setLoadingState
) => [
	getRowStateAndFields(
		groupListRows,
		handleRowMode,
		removeGroupRow,
		removeUserGroupRow,
		onRowUpdate,
		hasAuthInItem,
		updateUserAuth,
		getExcludeIds,
		onBlurNewItem,
		onRowAdd,
		handleNewRow,
		favoriteGroup,
		setLoadingState,
		idUserLogged
	),

	getUserTypeColumn(handleRowMode, idUserLogged, hasAuthInItem, updateUserAuth, groupListRows),

	getDeleteButton(handleRowMode, hasAuthInItem)
];

export const getComponentToolbar = (props): any => {
	return (
		<div className="group-list-toolbar">
			<MTableToolbar {...props} />
		</div>
	);
};

function hasAdminExceptMeUtil(rowData: any, groupListRows: any, idUserLogged: any, hasAdminExceptMe: any) {
	const idUserGroupType = CtUserGroupAccess.admin.key;
	if (rowData && rowData.tableData) {
		let countAdmins = 0;
		let parentChildRows = [];
		const thisGroupIndex = rowData.tableData.path[0];
		const thisGroupRow = groupListRows[thisGroupIndex];
		if (thisGroupRow && thisGroupRow.tableData && typeof thisGroupRow.tableData['childRows'] !== undefined)
			parentChildRows = thisGroupRow.tableData.childRows;
		if (parentChildRows && parentChildRows.length > 0)
			parentChildRows.map((childRow: any) => {
				if (childRow.idUser != idUserLogged && childRow.idCtUserGroupAccess == idUserGroupType) countAdmins++;
			});
		if (countAdmins > 0) hasAdminExceptMe = true;
	}
	return hasAdminExceptMe;
}

const isFavoriteFromUser = (childRows, idUserLogged) => {
	let isFavorite = false;
	if (!childRows) {
		return isFavorite;
	}
	childRows.map((userGroupRow) => {
		if (userGroupRow.idUser === idUserLogged) {
			isFavorite = userGroupRow.isFavorite;
		}
	});

	return isFavorite;
};
const getIdUserGroup = (childRows, idUserLogged) => {
	let idUserGroup = -1;
	if (!childRows) {
		return idUserGroup;
	}
	childRows.map((userGroupRow) => {
		if (userGroupRow.idUser === idUserLogged) {
			idUserGroup = userGroupRow.idUserGroup;
		}
	});
	return idUserGroup;
};
