import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform";

export const { width, height } = Dimensions.get('window');

const cardWidth = () => width/2 - 20;
const imageHeight = () => cardWidth() * 1.45;

const styles: any = StyleSheet.create({
	cardImage: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		borderRadius: 5
	},
	headerList: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 10,
		marginBottom: 10
	},
	headerMessage: {
		fontSize: 18,
		color: platform.headerInverseText,
		marginBottom: 5
	},
	description: {
		textAlign: "center"
	}
});
export default styles;
