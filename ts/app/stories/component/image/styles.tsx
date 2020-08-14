import { StyleSheet, Dimensions } from "react-native";

export const { width, height } = Dimensions.get('window');

const styles: any = StyleSheet.create({
	backgroundImage: {
		position: "absolute",
		top: 0,
		left: 0,
		width,
		height
	}
});
export default styles;
