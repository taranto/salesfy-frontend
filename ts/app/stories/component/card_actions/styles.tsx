import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform";

const styles: any = StyleSheet.create({
	shareIcon: {
		fontSize: 21,
		width: 25,
		textAlign: "center",
		marginLeft: platform.platform === "ios" ? 6 : 12,
		marginRight: 12,
		fontWeight: "bold"
	},
	buttons: {
		height: 35,
		width: 35
	},
	textButton: {
		paddingTop: platform.platform === "ios" ? 2 : 6,
		height: 24
	},
	svgIcon: {
		fontSize: 20
	},
	buttonContainer: {
		flex: 1,
		display: "flex",
		flexDirection: "row"
	},
	buttonContainerCenter: {
		flex: 1,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	textCount: {
		top: 10
	},
	hatchButton: {
		paddingTop: platform.platform === "ios" ? 12 : 16,
		height: 40
	},
	hatchFont: {
		fontSize: 9
	}
});
export default styles;
/*
alignItems: "center",
justifyContent: "center",
borderWidth: 1,
borderColor: "red"*/
