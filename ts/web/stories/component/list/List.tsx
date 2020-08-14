import React from 'react';
import { Typography } from '@material-ui/core';

interface IHeaderTitle {
	title: string;
	description?: string;
}

export const ListHeaderTitle = ({ title, description }:IHeaderTitle) => {
	return (
		<>
			<Typography className="list-header" component="h2">{title}</Typography>
			{description && <Typography className="list-header-description" component="h3">{description}</Typography>}
		</>
	)
}
