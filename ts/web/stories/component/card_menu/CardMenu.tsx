import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { FileCopy, Edit, Add, DeleteOutline, MoreVert } from '@material-ui/icons';
import { SaveButton, CancelButton } from 'web/stories/component/button/Button';
import IconButton from '@material-ui/core/IconButton';

interface IProps {
	onEditClick?
	onRemoveClick?
	onNewClick?
	onCopyClick?
	hasPower?
}
interface IState {
	open: boolean
	openConfirm: boolean
}

class CardMenu extends React.Component<IProps, IState> {
	public anchorEl;

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			openConfirm: false
		};

		this.editEvent = this.editEvent.bind(this);
		this.removeEvent = this.removeEvent.bind(this);
		this.openConfirm = this.openConfirm.bind(this);
		this.copyEvent = this.copyEvent.bind(this);
	}

	public handleToggle = (event) => {
		event.stopPropagation();
		this.setState(state => ({ open: !state.open }));
	};

	public handleClose = event => {
		event.stopPropagation();
		if (this.anchorEl.contains(event.target)) {
			return;
		}

		this.setState({ open: false });
	};

	public editEvent = (event) => {
		this.handleClose(event);
		this.props.onEditClick()
	}

	public newEvent = (event) => {
		this.handleClose(event);
		this.props.onNewClick()
	}

	public removeEvent = (event) => {
		this.handleClose(event);
		this.props.onRemoveClick()
	}

	public copyEvent = (event) => {
		this.handleClose(event);
		this.props.onCopyClick()
	}

	public openConfirm(event, openConfirm) {
		this.handleClose(event)
		this.setState({ openConfirm })
	}

	public render() {
		const { open, openConfirm } = this.state;
		const { onNewClick, onRemoveClick, onEditClick, onCopyClick, hasPower, children } = this.props;

		return (
			<>
				<div className="card-menu">
					<IconButton
						buttonRef={node => {
							this.anchorEl = node;
						}}
						aria-owns={open ? 'menu-list-grow' : undefined}
						aria-haspopup="true"
						onClick={this.handleToggle}
					>
						<MoreVert />
					</IconButton>
					<Popper open={open} className="popper" anchorEl={this.anchorEl} transition={true} disablePortal={true}>
						{({ TransitionProps, placement }) => (
							<Grow
								{...TransitionProps}
								key="menu-list-grow"
								style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
							>
								<Paper className="paper">
									<ClickAwayListener onClickAway={this.handleClose}>
										<MenuList>
											{(hasPower && onEditClick) && <MenuItem onClick={this.editEvent}><Edit />Editar/Autorizar</MenuItem>}
											{onCopyClick && <MenuItem onClick={this.copyEvent}><FileCopy />Copiar</MenuItem>}
											{(hasPower && onNewClick) && <MenuItem onClick={this.newEvent}><Add />Conteúdo</MenuItem>}
											{(hasPower && onRemoveClick) && <MenuItem onClick={(event) => this.openConfirm(event, true)}><DeleteOutline />Remover</MenuItem>}
											{children}
										</MenuList>
									</ClickAwayListener>
								</Paper>
							</Grow>
						)}
					</Popper>

				</div>
				{openConfirm && <div className="confirm-delete">
					<h4>Deseja mesmo remover esse item?</h4>
					<div>
						<SaveButton placeholder={"Confirmar"} onClick={this.removeEvent} />
						<CancelButton onClick={(event) => this.openConfirm(event, false)} />
					</div>
				</div>}
			</>
		);
	}
}

export default CardMenu;
