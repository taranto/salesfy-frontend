import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import styles from './styles';
import PreloadedActions from './PreloadedActions';

import { withStyles, MenuItem } from '@material-ui/core';
import { UserAvatar } from 'web/stories/component/user/User';
import HomeMenu from './HomeMenu';
import { WEB_SYSTEM_VERSION, S3_PATH_CONTENT } from 'root/envVars';
import { useSelector, useDispatch } from 'react-redux';
import { appParam } from 'app-core/redux_store/app/Actions';
import MaterialMenu from '@material-ui/core/Menu';
import { RegExpConst } from 'salesfy-shared';

const AppToolbarComponent = ({ classes, menuClick, settingsMenu }) => {
	const logo = window.location.hostname.includes('hatchers-web')
		? require('assets/pasqualotto.jpg')
		: require('assets/app-logo.png');
	return (
		<AppBar position="absolute" className={`app-bar ${classNames(classes.appBar, open && classes.appBarShift)}`}>
			<Toolbar className={classes.appToolbar}>
				<div className="menu-button-container">
					<IconButton
						id="menu-button"
						className={classes.menuButton}
						color="inherit"
						aria-label="Menu"
						onClick={menuClick}
					>
						<MenuIcon />
					</IconButton>
					<img src={require('assets/app-logo-white.png')} />
				</div>
				<Typography variant="h1" color="inherit" className={classes.grow}>
					<img style={{ height: 40 }} src={logo} />
				</Typography>
				{settingsMenu()}
			</Toolbar>
		</AppBar>
	);
};

// <img style={{height: 50}} src={require('assets/geekhunterlogo1.svg')}/>

export const AppToolbar = withStyles(styles, { withTheme: true })(AppToolbarComponent);
// <Link key={`${item.id}-${index}`} to={`${item.route}`} className={classes.link}>
const MenuComponent = ({ menuRef, open, classes, user, items, onItemClick, menuClick, settingsMenu }) => {
	const dispatch = useDispatch();
	const idUser = useSelector((state) => state.user.idUser);

	useEffect(() => {
		async () => await PreloadedActions(dispatch, idUser);
	}, []);

	const presentation = useSelector((state) => state.app.presentation);
	const favoriteItems = useSelector((state) => state.group.favoriteItems);

	let image = require('assets/profile.png');
	if (user.piAvatar) {
		image = RegExpConst.HTTP_S.test(user.piAvatar) ? user.piAvatar : `${S3_PATH_CONTENT}/${user.piAvatar}`;
	}

	const closeAndGo = (e) => {
		onItemClick(e);
		if (open) {
			menuClick();
		}
	};

	return (
		<Drawer
			variant="persistent"
			classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }}
			open={open}
			innerRef={menuRef}
			className={`home-menu ${open ? 'open' : 'close'}`}
			id="home-menu"
		>
			<IconButton
				id="menu-button"
				className={`${classes.menuButton} ${open ? 'open' : 'close'}`}
				color="inherit"
				aria-label="Menu"
				onClick={menuClick}
			>
				<MenuIcon style={{ color: 'white' }} />
				{open && <img src={require('assets/app-logo-white.png')} />}
			</IconButton>
			<UserAvatar nmUser={user.nmUser} emUser={user.emUser} piAvatar={image} open={open} />
			<HomeMenu
				favoriteItems={favoriteItems}
				items={items}
				open={open}
				onItemClick={closeAndGo}
				presentation={presentation}
			/>
			{settingsMenu()}
		</Drawer>
	);
};

// tslint:disable-next-line:variable-name
export const Menu = withStyles(styles, { withTheme: true })(MenuComponent);

export const SettingsMenu = ({ doLogout }) => {
	const dispatch = useDispatch();
	const presentation = useSelector((state) => state.app.presentation);
	const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);

	const changePresentation = () => {
		dispatch(appParam({ presentation: !presentation }));
		handleClose();
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="settings-menu">
			<IconButton color={'inherit'} aria-controls="settings-menu" aria-haspopup="true" onClick={handleClick}>
				<Settings />
			</IconButton>
			<MaterialMenu
				id="settings-menu"
				className="menu-settings"
				anchorEl={anchorEl}
				// keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem disabled={true}>{`© Salesfy ${WEB_SYSTEM_VERSION}`}</MenuItem>
				<MenuItem onClick={changePresentation}>
					{presentation ? 'Desativar Apresentação' : 'Ativar Apresentação'}
				</MenuItem>
				<MenuItem onClick={doLogout}>Deslogar</MenuItem>
			</MaterialMenu>
		</div>
	);
};

export const BadgeGroup = ({ nmGroup }) => {
	return <div className="badge-group">{nmGroup.substring(0, 2)}</div>;
};

// tslint:disable-next-line:variable-name
// export const ProfileMenu = withStyles(styles, { withTheme: true })(ProfileMenuComponent);
