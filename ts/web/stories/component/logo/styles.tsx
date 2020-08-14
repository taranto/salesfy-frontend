import { variables } from "web/ThemeVariables";

const styles: any = {
	imgHeader: {
		height: 65,
		// width: 65,
		alignItems: "center",
	},
	viewMessage: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	hatchersText: {
		fontFamily: "'Work Sans', sans-serif",
		color: variables.primaryColor,
		fontSize: 50,
		marginTop: 10
	},
	viewLogo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	}
};
export default styles;
