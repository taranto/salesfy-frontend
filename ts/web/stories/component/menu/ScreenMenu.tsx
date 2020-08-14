import React, { useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { FileCopy, Edit, Add, DeleteOutline } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Translation } from 'app-core/utils/translate/Translation';
import ConfirmModal from 'web/stories/component/modal/ConfirmModal';

export interface IScreenMenu {
	hasPower,
	onEditClick?,
	onCopyClick?,
	onNewClick?,
	onRemoveConfirm?
}
export const ScreenMenu = ({hasPower, onEditClick, onCopyClick, onNewClick, onRemoveConfirm}:IScreenMenu) => {
	const [anchorEl, setAnchorEl] = useState();
	const [open, setOpen] = useState(false);
	const [openConfirm, setOpenConfirm] = useState(false);

	const editEvent = () => {
		onEditClick();
		setOpen(false);
	}

	const copyEvent = () => {
		onCopyClick();
		setOpen(false);
	}

	const newEvent = () => {
		onNewClick();
		setOpen(false);
	}

	const removeEvent = () => {
		onRemoveConfirm();
		setOpen(false);
	}

	return (
		<>
			<div className="screen-menu">
				<IconButton
					buttonRef={node => setAnchorEl(node)}
					aria-owns={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={() => setOpen(!open)}
				>
					<MoreVert />
				</IconButton>
				<Popper
					open={open}
					className="popper"
					anchorEl={anchorEl}
					transition={true}
					disablePortal={true}
				>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							key="menu-list-grow"
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper className="paper">
								<ClickAwayListener onClickAway={() => setOpen(false)}>
									<MenuList>
										{(hasPower && onEditClick) &&
											<MenuItem onClick={editEvent}>
												<Edit />
												{Translation.toEditAuth}
											</MenuItem>
										}
										{onCopyClick &&
											<MenuItem onClick={copyEvent}>
												<FileCopy />
												{Translation.toCopy}
											</MenuItem>
										}
										{(hasPower && onNewClick) &&
											<MenuItem onClick={newEvent}>
												<Add />
												{Translation.content}
											</MenuItem>
										}
										{(hasPower && onRemoveConfirm) &&
											<MenuItem onClick={() => setOpenConfirm(true)}>
												<DeleteOutline />
												{Translation.toRemove}
											</MenuItem>
										}
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>

			</div>
			<ConfirmModal
				open={openConfirm}
				setOpen={setOpenConfirm}
				title={Translation.remove}
				description={Translation.confirmRemoveItem}
				onClickSuccess={removeEvent}
			/>
		</>
	)
};
