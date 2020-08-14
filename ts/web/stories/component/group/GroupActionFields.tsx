import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { FavoriteButton, NewUserButton } from 'web/stories/component/button/Button';

export const GroupNameField = (item) => {
	const { nmGroup, isFavorite, onNewItem, onFavorite } = item;

	const onFavoriteClick = () => {
		onFavorite();
	};
	return (
		<Grid container={true} direction="row" justify="flex-end" alignItems="center" className="group-component">
			<Typography className={`text-color nm-group`}>
				<b>{nmGroup}</b>
				<div className={'group-row-buttons'}>
					{onNewItem && <NewUserButton onClick={onNewItem} />}
					{onFavorite && <FavoriteButton onClick={onFavoriteClick} checked={isFavorite} />}
				</div>
			</Typography>
		</Grid>
	);
};
