import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const styles: any = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: 'center',
		alignItems: "center"
	},
	preview: {
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('window').width,
		width: Dimensions.get('window').width
	},
	cameraContainer: {
		height: Dimensions.get('window').width,
		width: Dimensions.get('window').width,
		backgroundColor: 'salmon'
	},
	buttonCircle: {
		width: 50,
		height: 50,
		borderRadius: 50,
		backgroundColor: "transparent",
		margin: 0,
		padding: 0
	},
	icon: {
		width: 30,
		top: 12,
		left: -2,
		color: "white"
	},
	button: {
		height: 60,
		alignSelf: "center"
	},
	errorField: {
		color: "red"
	}
});
export default styles;
/*
alignItems: "center",
justifyContent: "center",
borderWidth: 1,
borderColor: "red"*/
