import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform";

export const { width, height } = Dimensions.get('window');

const cardWidth = () => 60;
const imageHeight = () => cardWidth();

const styles: any = StyleSheet.create({
	flatList: {
		marginTop: 10,
		height: imageHeight() + 35
	},
	card: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderWidth: 2,
		borderColor: "transparent",
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardSelected: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderWidth: 2,
		borderColor: platform.filterColor,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardPublish: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		padding: 0,
		margin: 0,
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	cardImagePublish: {
		width: 30,
		height: 30
	},
	cardImage: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center",
		width: cardWidth() - 8,
		height: imageHeight() - 8,
		borderRadius: 100,
		overflow: "hidden",
		backgroundColor: "white"
	},
	cardImageView: {
		width: cardWidth(),
		height: imageHeight() + 35,
		marginLeft: 10
	},
	tagStorie: {
		marginTop: 4,
		color: platform.purpleBg,
		fontSize: 11,
		textAlign: "center"
	},
	touchableHighlight: {
		borderRadius: 100,
		backgroundColor: "transparent"
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
	},
	iconAddView: {
		color: "white",
		position: "absolute",
		right: 0,
		bottom: 5,
		padding: 0,
		margin: 0,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 100,
		width: 25,
		height: 25,
		backgroundColor: platform.purpleBg,
	},
	iconAdd: {
		color: "white",
		width: 25,
		height: 25,
		fontSize: 20,
		paddingLeft: 6,
		paddingTop: 2
	}
});
export default styles;
