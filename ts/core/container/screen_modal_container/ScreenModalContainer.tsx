import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { CloseButton } from 'web/stories/component/button/Button';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

export interface IScreenModalContainer {
	id?:string,
	children: JSX.Element,
	title: string,
	setOpen: (open) => void,
	open: boolean,
	data: any,
	className?: string
}

export const ScreenModalContainer = ({ id, children, title, open, setOpen, data, className }: IScreenModalContainer) => {
	const [modalStyle] = React.useState(getModalStyle);

	return useMemo(() => (
		<Modal
			open={open}
			onClose={() => setOpen(false)}
		>
			<div id={id} style={modalStyle} className={`modal ${className}`}>
				<div className="header">
					<Typography variant="h5">{title}</Typography>
					<CloseButton className="close-button" onClick={() => setOpen(false)} />
				</div>
				<div className="body">
					{children}
				</div>
			</div>
		</Modal>
	), [open, data])
}
