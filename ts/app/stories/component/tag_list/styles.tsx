import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform";

const styles: any = StyleSheet.create({
	cardImage: {
		alignSelf: "center",
		width: 40,
		height: 40,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 5
	},
	flexZero: {
		flex: 0
	},
	text: {
		alignSelf: "flex-start"
	},
	button: {
		marginRight: 20,
		marginLeft: 20,
		borderColor: platform.purpleBg,
		borderRadius: 5
	},
	buttonSelected: {
		marginRight: 20,
		marginLeft: 20,
		backgroundColor: platform.purpleBg,
		borderRadius: 5
	},
	buttonText: {
		color: platform.purpleBg
	},
	buttonSelectedText: {
		color: "white"
	},
	row: {
		height: 60
	},
	headerList: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 20,
		marginBottom: 20
	},
	headerMessage: {
		fontSize: 28,
		color: platform.headerInverseText
	}
});
export default styles;
