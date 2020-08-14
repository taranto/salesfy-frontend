import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { CircularLoader } from 'web/stories/component';

export const FileField = ({ nm, lkImage }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-start"
		alignItems="center"
		className="user-component"
	>
		<img alt={nm} src={lkImage} className={`small-avatar list-avatar`} />
		<div>
			{nm && <Typography className={`text-color nm-avatar small-text`}><b>{nm}</b></Typography>}
		</div>
	</Grid>
)

export const FolderField = ({ nm, lkImage, isLoading, onFetchData, open }) => (
	<Grid
		container={true}
		direction="row"
		justify="flex-start"
		alignItems="center"
		className="user-component"
		onClick={!open && onFetchData}
	>
		<img alt={nm} src={lkImage} className={`small-avatar list-avatar`} />
		<div>
			{nm &&
				<Typography className={`text-color nm-avatar small-text`}>
					<b>{nm}</b>
					{isLoading && <CircularLoader />}
				</Typography>
			}
		</div>
	</Grid>
)
