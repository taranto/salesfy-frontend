import { StyleSheet } from "react-native";

const styles: any = StyleSheet.create({
	viewButtons: {
		alignItems: "center",
		marginTop: 40
	},
	submitButton: {
		alignSelf:'center',
		marginBottom: 15,
		paddingLeft: 30,
		paddingRight: 30,
		borderColor: "white"
	},
	formTitle: {
		color: "white",
		textAlign: "center",
		margin: 20,
		fontSize: 16,
		lineHeight: 30
	},
	submitText: {
		color: "white",
	},
	linkButton: {
		alignSelf:'center',
	},
	linkButtonColor: {
		color: "white"
	},
	errorMessage: {
		marginLeft: 30,
		marginRight: 30,
		marginTop: 5,
		color: "white",
		textAlign: "center",
		alignSelf:'center',
		fontSize: 14
	},
	submitErrorMessage: {
		marginLeft: 30,
		marginRight: 30,
		marginBottom: 10,
		color: "white",
		textAlign: "center",
		alignSelf:'center',
		fontSize: 14
	},
	errorView: {
		marginTop: 20,
	},
	input: {
		color: "white"
	},
	item: {
		marginRight: 30,
		marginLeft: 30
	},
	underlineText: {
		textDecorationLine: "underline",
		textDecorationStyle: "solid",
		textDecorationColor: "white"
	},
	acceptText: {
		marginLeft: 10,
		fontSize: 14,
		color: "white"
	},
	containerCheckbox: {
		paddingTop: 15,
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	checkbox: {
		height: 18,
		width: 18,
		marginRight: 10
	},
	radioButton: {
		display: "flex",
		borderWidth: 0,
		borderBottomWidth: 0,
		marginBottom: 10
	},
	radioButtonLabel: {
		marginLeft: 20
	},
	errorField: {
		borderColor: "red"
	},
	errorText: {
		color: "red"
	}
});
export default styles;
