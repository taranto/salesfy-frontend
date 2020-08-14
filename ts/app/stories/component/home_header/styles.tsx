import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform";

const styles: any = StyleSheet.create({
	profileButton: {
		color: platform.toolbarBtnColor,
		fontSize: 28
	},
	logo: {
		marginTop: 10,
		height: 30,
		width: 120
	},
	hatchersTypography: {
		width: "100%",
		fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 28,
		top: 5,
		color: platform.toolbarTextColor
	},
	hatchersTypographySub: {
		width: "100%",
		fontFamily: "Roboto",
		textAlign: "center",
		fontSize: 12,
		top: platform.platform === 'ios' ? 2 : -3,
		color: platform.toolbarTextColor
	},
	header: {
		backgroundColor: 'transparent'
	},
	searchItem: {
		backgroundColor: "transparent",
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: platform.toolbarDefaultBg,
		borderRadius: 5
	},
	card: {
		height: 160,
		width: 110,
		padding: 0,
		margin: 0,
		backgroundColor: "white",
		marginLeft: 2,
		marginRight: 10,
		borderRadius: 4
	},
	cardImage: {
		height: 160,
		width: 110,
		padding: 0,
		margin: 0,
		borderRadius: 4
	},
	cardImageFocus: {
		height: 160,
		width: 110,
		padding: 0,
		margin: 0,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: platform.filterColor
	},
	tagList: {
		marginHorizontal: 10,
		height: 170
	},
	icon: {
		color: platform.categoryText,
		fontSize: 35
	},
	channelText: {
		color: platform.toolbarBtnColor,
		marginTop: 5,
		marginBottom: 15,
		textAlign: "center"
	},
	autoWidth: {
		flex: 0
	},
	leftIcon: {
		fontSize: 50
	},
	onSearchIcon: {
		color: platform.filterColor,
		fontSize: 28
	},
	badge: {
		height: 10,
		width: 10,
		backgroundColor: "red",
		borderRadius: 50,
		position: "absolute",
		top: 10,
		right: 10
	},
	bar: {
		borderBottomWidth: 3,
		borderBottomColor: platform.btnPrimaryBg
	}
});
export default styles;
