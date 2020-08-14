import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export const ConfirmDialog = ({handleClose, open, title, description, confirmAction}) => (
	<Dialog
		open={open}
		keepMounted={true}
		onClose={handleClose}
	>
		{title && <DialogTitle>
			{title}
		</DialogTitle>}
		{description && <DialogContent>
			<DialogContentText>
				{description}
			</DialogContentText>
		</DialogContent>}
		<DialogActions>
			<Button onClick={handleClose} color="primary">
				Cancelar
			</Button>
			<Button onClick={confirmAction} color="primary">
				Aceitar
			</Button>
		</DialogActions>
	</Dialog>
)
