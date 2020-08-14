import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform";

const styles: any = StyleSheet.create({
	content: {
		flex: 1,
		backgroundColor: "transparent",
	},
	autoWidth: {
		flex: 0
	},
	header: {
		backgroundColor: "transparent"
	},
	textButton: {
		color: "white"
	},
	buttonPrimary: {
		borderColor: platform.brandPrimary,
		alignSelf: "flex-end",
		marginTop: 10,
		marginBottom: 15,
		marginRight: 15,
		marginLeft: 15
	},
	textButtonPrimary: {
		color: platform.brandPrimary
	},
	textHeader: {
		color: "white"
	},
	button: {
		borderColor: "white"
	},
	activeDot: {
		backgroundColor: 'grey'
	},
	inactiveDot: {
		backgroundColor: '#ededed'
	},
	activeStep: {
		backgroundColor: 'grey'
	},
	inactiveStep: {
		backgroundColor: '#ededed'
	},
	activeStepTitle: {
		fontWeight: 'bold'
	},
	inactiveStepTitle: {
		fontWeight: 'normal'
	},
	activeStepNumber: {
		color: 'white'
	},
	inactiveStepNumber: {
		color: 'black'
	}
});
export default styles;
