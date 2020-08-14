import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform"

const windowDimension = Dimensions.get("window");

const styles: any = StyleSheet.create({
	container: {
		width: windowDimension.width,
		height: windowDimension.height,
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		backgroundColor: 'transparent'
	},
	imgHeader: {
		marginTop: 40,
		marginBottom: 30,
		height: 65,
		// width: 65,
		alignItems: "center",
	},
	viewMessage: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	waitingMessage: {
		color: platform.inverseText,
		fontSize: 20,
		paddingTop:50,
		paddingBottom: 50,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: "center"
	},
	waitingMessageTitle: {
		color: platform.inverseText,
		fontSize: 30,
		paddingLeft: 20,
		paddingRight: 20,
		textAlign: "center"
	},
	hatchersText: {
		fontFamily: "Roboto",
		color: "white",
		fontSize: 50,
		marginTop: 10
	},
	hatchersTextInverse: {
		fontFamily: "Roboto",
		color: platform.brandPrimary,
		fontSize: 30,
		marginTop: 10
	},
	linkButtonColor: {
		color: "white"
	},
	linkButton: {
		alignSelf:'center',
	},
	viewLogo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	},
	submitButton: {
		alignSelf:'center',
		marginBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		borderColor: "white"
	},
	submitText: {
		color: "white",
	},
});
export default styles;
