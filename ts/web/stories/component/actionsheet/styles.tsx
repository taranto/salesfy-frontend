import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get('window');

const styles: any = StyleSheet.create({
	leftMenu: {

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
		alignSelf: "flex-start"
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
});
export default styles;
