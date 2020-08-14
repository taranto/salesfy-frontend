import { variables } from "web/ThemeVariables";
const cardWidth = () => 250;
const imageHeight = () => cardWidth() * 1.45;

const styles: any = {
	card: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		margin: 25
	},
	cardImage: {
		alignSelf: "center",
		width: cardWidth(),
		height: imageHeight(),
		borderRadius: 1
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
		fontSize: 28
	},
	viewLogo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	},
	hatchersText: {
		fontFamily: "'Work Sans', sans-serif",
		color: variables.primaryColor,
		fontSize: 50,
		marginTop: 10
	},
};
export default styles;
