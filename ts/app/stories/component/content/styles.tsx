import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform"

const styles: any = StyleSheet.create({
	header: {
		backgroundColor: "transparent"
	},
	color: {
		color: platform.headerInverseText
	},
	textHeader: {
		color: platform.toolbarTextColor
	},
	icon: {
		fontSize: 28
	},
	card: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		borderRadius: 5,
		paddingBottom: 0
	},
	cardImage: {
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
		height: 220,
		width: "auto",
		flex: 1,
		resizeMode: 'cover'
	},
	objective: {
		height: 50,
		backgroundColor: platform.headerInverseText,
		borderRadius: 0
	},
	objectiveText: {
		color: "white",
		textAlign: "center",
		alignSelf: "center",
		flex: 1
	},
	linearGradient: {
		flex: 1
	},
	list: {
		flex: 3,
	},
	ListItemLeft: {
		flex: 3,
	},
	textRight: {
		position: "absolute",
		right: 0
	},
	listItem: {
		height: 40,
		marginLeft: 10,
		paddingLeft: 0
	},
	textLeft: {
		marginLeft: 0
	},
	description: {
		paddingLeft: 10,
		paddingRight: 10,
		flex: 3,
		textAlign: "justify"
	},
	authorText: {
		paddingLeft: 10,
		fontWeight: "bold"
	},
	autoWidth: {
		flex: 0
	},
	postButton: {
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 8,
	},
	bar: {
		borderBottomWidth: 3,
		borderBottomColor: platform.btnPrimaryBg
	}
});
export default styles;
