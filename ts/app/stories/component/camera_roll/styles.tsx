import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';

const styles: any = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'black'
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
	}
});
export default styles;
/*
alignItems: "center",
justifyContent: "center",
borderWidth: 1,
borderColor: "red"*/
