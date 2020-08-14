import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform";

const { width, height } = Dimensions.get("window");

const widthButtonType = width / 3 - 40
const heightFlatList = height - platform.footerHeight - platform.toolbarHeight - 200;
const heightFlatListWithoutFooter = height - platform.toolbarHeight - 210;

const styles: any = StyleSheet.create({
	stepIndicador: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		display: "flex",
		flex: 2,
		alignItems: "center",
		justifyContent: "center"
	},
	form: {
		margin: 10,
	},
	title: {
		marginTop: 20,
		marginBottom: 20,
		fontWeight: "bold",
		fontSize: 20
	},
	titlePreview: {
		marginTop: 20,
		marginBottom: 20,
		fontWeight: "bold",
		fontSize: 20
	},
	descripton: {
		marginBottom: 40
	},
	descriptonSimple: {
		marginBottom: 40
	},
	areaBorder: {
		marginTop: 20,
		borderBottomWidth: 1,
		borderColor: "#D9D5DC"
	},
	marginLeftZero: {
		marginLeft: 0
	},
	titleLabel: {
		marginTop: 20,
		marginBottom: 20
	},
	footer: {
		position: "absolute",
		bottom: 5,
		left: 0,
		right: 0,
		display: "flex",
		flex: 2,
		alignItems: "center",
		justifyContent: "center",
		height: 60
	},
	column: {
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	button: {
		alignSelf: "center"
	},
	textPublish: {
		fontWeight: "bold",
		color: "#f0658f"
	},
	text: {
		fontWeight: "bold"
	},
	cardType: {
		flex: 1,
		height: widthButtonType * 2,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardTypeSelected: {
		flex: 1,
		height: widthButtonType * 2,
		borderRadius: 5,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: platform.purpleBg
	},
	cardBodyType: {
		height: 60,
		alignSelf: "center"
	},
	alignSelfCenter: {
		alignSelf: "center"
	},
	iconType: {
		marginBottom: 20,
		fontSize: 40,
		alignSelf: "center"
	},
	imagePreview: {
		width: 300,
		height: 150
	},
	cardImagePreview: {
		width: 300,
		height: 150,
		alignSelf: "center"
	},
	viewPreviewFooter: {
		display: "flex",
		width: 150,
		flexDirection: "row",
		alignSelf: "flex-end",
		marginBottom: 10
	},
	errorMessage: {
		marginTop: 30,
		color: platform.brandDanger,
		alignSelf: "center"
	},
	flatList: {
		margin: 5,
		height: heightFlatList
	},
	imageImport: {
		width: 40,
		height: 40,
		marginBottom: 20,
		alignSelf: "center"
	},
	cardImage: {
		marginRight: 20,
		marginBottom:0,
		marginTop:20
	},
	selected: {
		borderRadius: 5,
		marginRight: 20,
		marginTop: 5,
		backgroundColor: "#808080"
	},
	selectedDummy: {
		height: 35
	},
	selectedText: {
		textAlign: "center",
		color: "white",
		fontSize: 11
	},
	inputField: {
		backgroundColor: "white",
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderRadius: 5
	},
	waitMessage: {
		fontSize: 18,
		color: platform.headerInverseText,
		marginBottom: 5,
		textAlign: "center"
	},
	contentChannelList: {
		height: heightFlatListWithoutFooter
	}
});
export default styles;
