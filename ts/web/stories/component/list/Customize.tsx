import React from 'react';
import { MTableCell } from 'material-table';
import { Typography } from '@material-ui/core';
import { SaveButton, CancelButton } from 'web/stories/component/button/Button';
import NameCombo from 'web/stories/component/group/NewGroupTextField';
import { Translation } from 'app-core/utils/translate/Translation';
import { CtUserGroupAccessFront } from 'app-core/utils/category/CtUserGroupAccessFront';

export const ChangeRoleLabel = (item) => {
	const { mode, data, onEditingApproved, onEditingCanceled } = item;
	return (
		<tr>
			<MTableCell {...item}>
				<div className="remove-layout">
					<Typography variant="h6">{Translation.confirmChangeMyRole}</Typography>
					<div>
						<SaveButton onClick={() => onEditingApproved(mode, data, data)} />
						<CancelButton onClick={() => onEditingCanceled(mode, data)} />
					</div>
				</div>
			</MTableCell>
		</tr>
	);
};

export const RemoveLabel = ({ onBlur, rowData, removeGroupRow, removeUserGroupRow, setLoadingState }) => {
	const { isGroup, idGroup } = rowData;
	const handleDeleteConfirmation = () => {
		setLoadingState(true);
		isGroup ? removeGroupRow(idGroup) : removeUserGroupRow(rowData);
		handleCloseConfirmation();
	};
	const handleCloseConfirmation = () => {
		onBlur();
	};
	return (
		<div className="delete-row-confirmation">
			<Typography variant="h6">{Translation.confirmRemoveItem}</Typography>
			<div className="confirmation-buttons">
				<SaveButton onClick={handleDeleteConfirmation} />
				<CancelButton onClick={handleCloseConfirmation} />
			</div>
		</div>
	);
};

export const ChangeUserTypeLabel = ({ onBlur, onPress, idUserGroup, idCtUserGroupAccess }) => {
	const handleDeleteConfirmation = () => {
		onPress && onPress({ idUserGroup, idCtUserGroupAccess: CtUserGroupAccessFront.next(idCtUserGroupAccess) });
		handleCloseConfirmation();
	};
	const handleCloseConfirmation = () => {
		onBlur();
	};
	return (
		<div className="change-role-confirmation">
			<Typography variant="h6">{Translation.confirmChangeMyRole}</Typography>
			<div className="confirmation-buttons">
				<SaveButton onClick={handleDeleteConfirmation} />
				<CancelButton onClick={handleCloseConfirmation} />
			</div>
		</div>
	);
};

export const EditLabel = ({ row, placeholder, onBlur, onRowUpdate, setLoadingState }) => {
	const { idGroup } = row;
	const handleSubmitCombo = (newData) => {
		if (newData) {
			setLoadingState(true);
			setTimeout(() => onRowUpdate({ idGroup: idGroup, nmGroup: newData }), 500);
		}
	};

	return (
		<NameCombo
			onBlur={onBlur}
			focusOnMount={true}
			placeholder={placeholder}
			defaultValue={row && row.nmGroup}
			submit={(newData) => handleSubmitCombo(newData)}
		/>
	);
};
