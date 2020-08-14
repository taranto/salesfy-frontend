import { createStyles } from "@material-ui/core";

const drawerWidth = 280;
const styles = (theme) => createStyles({
	root: {
		flexGrow: 1,
		height: 440,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	grow: {
		flexGrow: 1,
		fontFamily: "'Work Sans', sans-serif",
		textAlign: "center",
		fontWeight: 100,
		fontSize: 35,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		overflow: "hidden",
		height: 70
	},
	appBar: {
		// background: "linear-gradient(to right bottom, #4775e6, #6765e7, #8d53e9)",
		// background: "linear-gradient(to right bottom, rgb(228,20,26), rgb(186,27,36))", pasqualotto
		// background: "linear-gradient(to right bottom, rgb(110,43,119), rgb(77,29,83))", geek
		// backgroundColor: "#6E2B77",
		// height: 80,
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	appToolbar: {
		paddingLeft: 14,
		paddingRight: 14,
		height: 70
	},
	menuButton: {
		marginRight: 36,
	},
	menuItem: {
		height: 64
	},
	hide: {
		display: 'none',
	},
	drawerPaper: {
		top: 0,
		backgroundColor: "#1a1a1a",
		height: '100vh',
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		// boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		position: 'absolute',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing.unit * 7,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 9,
		},
	},
	toolbar: {
		display: 'flex',
		textAlign: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
	},
	profileMenu: {
		position: "absolute",
		right: 20,
		top: 70
	},
	buttonMenu: {
		width: "100%",
		borderColor: "white",
		color: "white",
		borderRadius: 10
	},
	listItemText: {
		// color: theme.palette.secondary.main,
		marginLeft: 10,
		textAlign: "left"
	},
	listItemIcon: {
		// color: theme.palette.secondary.main
		color: "white"
	},
	subItem: {
		paddingLeft: 30,
		// opacity: 0.8
	},
	link: {
		textDecoration: "none",
	}
});
export default styles;
