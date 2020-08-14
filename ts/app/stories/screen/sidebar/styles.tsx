import { StyleSheet, Dimensions, Platform } from "react-native";

export const { width, height } = Dimensions.get('window');

const styles: any = StyleSheet.create({
	leftMenu: {

	},
	sideBar: {
		backgroundColor: "#1a1a1a"
	},
	touchableOpacity: {
		backgroundColor: "#fff",
		minHeight: 56,
		padding: 15,
		elevation: 4,
		width: width*3/4,
		height
	},
	item: {
		borderColor: "transparent",
		marginLeft: 14,
		height: 50
	},
	itemSimple: {
		borderColor: "transparent",
		marginLeft: 14
	},
	body: {
		borderColor: "transparent",
		paddingLeft: 7
	},
	bodyText: {
		alignSelf: "flex-start",
		fontSize: 14,
		color: "white"
	},
	headerText: {
		marginTop: 10,
		color: "white",
		fontSize: 14,
	},
	imgUser: {
		width: 80,
		height: 80,
		backgroundColor: "white",
		borderRadius: Platform.OS === "android" ? 100 : 80
	},
	overlay: {
		backgroundColor: "rgba(0,0,0,0.4)",
		flex: 1,
		justifyContent: "flex-end",
		height,
	},
	flatList: {
		top: 60,
		height: "auto",
		marginHorizontal: -15
	},
	leftColumn: {
		marginLeft: 20
	},
	headerView: {
		marginTop: 60,
		height: 160,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	}
});
export default styles;
