import * as React from 'react';
import { CircularProgress } from '@material-ui/core';

interface ISpinner {
	inverse?: boolean;
	style?: any;
	className?
}

export const CircularLoader = ({inverse, style, className}: ISpinner) => {
	return <CircularProgress className={className} style={style} color={inverse ? "secondary" : "primary"}/>
}

export const PageCircularLoader = ({inverse, style, className}: ISpinner) => {
	return (
		<div>
			<CircularProgress className={className} style={style}  color={inverse ? "secondary" : "primary"}/>
		</div>
	)
}
