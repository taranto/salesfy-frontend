import React, { useState } from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
	FavoriteButton,
	NewUserButton,
	EditButton,
	DeleteButton,
	VoidButton
} from 'web/stories/component/button/Button';
import { RemoveLabel } from '../list/Customize';

export const GroupRow = ({ group, hasAuthInItem, favoriteGroup, onDeleteClick, data }) => {
	const { isFavorite, nmGroup, idGroup } = group;
	const hasAuth = hasAuthInItem(group);
	const [ isFavoriteGroup, setIsFavoriteGroup ] = useState(isFavorite);

	const onFavoriteClick = () => {
		setIsFavoriteGroup(!isFavoriteGroup);
		favoriteGroup(group);
	};

	if (hasAuth && data.idGroupDeleting === idGroup) {
		return <RemoveLabel {...group} />;
	}

	return (
		<Grid container={true} direction="row" justify="flex-start" alignItems="center" className="group-component">
			<div>{idGroup} </div>
			<GroupNameField nmGroup={nmGroup} />
			{hasAuth ? <NewUserButton onClick={null} /> : <VoidButton />}
			<FavoriteButton onClick={onFavoriteClick} checked={isFavoriteGroup} />
			{hasAuth ? <EditButton onClick={null} /> : <VoidButton />}
			{hasAuth ? <DeleteButton className="danger-button" onClick={onDeleteClick} /> : <VoidButton />}
		</Grid>
	);
};

export const GroupNameField = ({ nmGroup }) => {
	return (
		<Typography className={`text-color nm-group`}>
			<b>{nmGroup}</b>
		</Typography>
	);
};
