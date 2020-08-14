import { StyleSheet, Dimensions } from "react-native";

const dimensions = Dimensions.get("screen")

const styles: any = StyleSheet.create({
	cardImage: {
		width: dimensions.width,
		height: dimensions.height
	},
	absoluteBottomButton: {
		position: "absolute",
		bottom: 20,
	},
	left: {
		left: 40
	},
	right: {
		right: 40
	},
	buttonText: {
		color: "white"
	}
});
export default styles;
