import * as React from "react";
import { Menu } from "web/stories/component";
import { withStyles } from "@material-ui/core";
import styles from './styles';
import { IStyleSheet } from "app-core/utils/interfaces";

interface IProps extends IStyleSheet {
	open: boolean;
	user: any;
	menuItems: any[];
	menuClick: () => void;
	settingsMenu: () => JSX.Element;
	handleToggle: () => void;
	children: any;
	onItemClick: any;
	menuClose
	menuRef
}

class HomeScreen extends React.Component<IProps> {

	constructor(props) {
		super(props);
	}

	public render() {
		const { open, menuClick, menuItems, settingsMenu, classes, user, children, onItemClick, menuRef } = this.props;

		return (
			<div>
				<div className={classes.mainContainer}>
					<Menu menuClick={menuClick} settingsMenu={settingsMenu} user={user} open={open} items={menuItems} onItemClick={onItemClick} menuRef={menuRef}/>
					<main className={classes.main}>
						{children}
					</main>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(HomeScreen);
