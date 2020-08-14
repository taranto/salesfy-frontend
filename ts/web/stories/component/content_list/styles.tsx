const width = 280;
const cardWidth = () => 300;
const imageHeight = () => cardWidth() / 2;
const fullShortHeight = () => imageHeight() + 65;
export const fullHeight = Math.round(cardWidth()*4/3)// status bar / margin
const maxDescriptionHeight = () => (fullHeight - imageHeight() - 180);
export const linesDescription = Math.round(maxDescriptionHeight() / 16);
import { variables } from "web/ThemeVariables";

const platform = {
	categoryText: "#7f7f7f",
	filterColor: "#f0ad4e",
	headerInverseText: "#323232",
}

const styles: any = {
	cardImage: {
		width: cardWidth(),
		height: imageHeight()
	},
	cardImageFullHeight: {
		width: cardWidth(),
		height: fullHeight
	},
	cardImageShort: {
		width: cardWidth(),
		height: fullShortHeight()
	},
	cardItemFull: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	cardItemContentPi: {
		backgroundColor: "transparent",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 10,
		marginVertical: 10,
		flex: 3
	},
	cardItemVerticalAlign: {
		backgroundColor: "transparent",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		margin: 5
	},
	cardFull: {
		width: cardWidth(),
		height: fullHeight,
		padding: 0,
		margin:0,
		borderRadius: 1,
		overflow: "hidden",
		shadowRadius: 5,
		elevation: 3,
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column"
	},
	cardFullDummy: {
		width: cardWidth(),
		height: fullHeight,
		padding: 0,
		margin:0,
		overflow: "hidden",
		backgroundColor: "transparent",
		alignItems: "center", justifyContent:"center"
	},
	card: {
		width: cardWidth(),
		height: fullHeight,
		paddingBottom: 40,
		padding: 0,
		margin:0,
		borderRadius: 1,
		overflow: "hidden",
		shadowRadius: 5,
		elevation: 3,
		backgroundColor: "white"
	},
	shortCard: {
		width: cardWidth(),
		height: fullShortHeight(),
		padding: 0,
		margin:0,
		borderRadius: 1,
		overflow: "hidden",
		shadowRadius: 5,
		elevation: 3,
		backgroundColor: "white",
		display: "flex",
		flexDirection: "column"
	},
	pageLoader: {
		width
	},
	cardItemContent: {
		marginHorizontal: 10,
		marginVertical: 10,
		flex: 3,
		flexDirection: "column"
	},
	paddingItem: {
		marginBottom: 10
	},
	headerItem: {
		color: platform.headerInverseText
	},
	description: {
		color: platform.categoryText,
		paddingBottom: 10,
		fontSize: 16
	},
	button: {
		height: 20,
	},
	text: {
		width: 50
	},
	headerColor: {
		color: platform.headerInverseText
	},
	textBadge: {
		color: "white",
		fontSize: 13,
		padding: 0,
		margin: 0
	},
	footer: {
		marginLeft: 10,
		marginRight: 10,
		position: "absolute",
		bottom: 0,
		backgroundColor: "transparent"
	},
	footerShade: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: 65
	},
	topShade: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 30
	},
	postButton: {
		height: 35,
		borderRadius: 50,
		flex: 2
	},
	postButtonText: {
		lineHeight: 35,
		textAlign: "center",
		color: "#670000"
	},
	postButtonTextWhite: {
		lineHeight: 35,
		textAlign: "center",
		color: "white"
	},
	badge: {
		backgroundColor: "transparent",
	},
	badgeGradient: {
		position: "absolute",
		top: 10,
		left: 10,
		borderRadius: 50
	},
	transparent: {
		backgroundColor: "transparent"
	},
	authorText: {
		fontSize: 12,
		paddingBottom: 10
	},
	viewLogo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 40
	},
	compact: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 5
	},
	imgHeader: {
		flex: 1,
		heighy: 20,
		margin: 5
	},
	hatchersText: {
		fontFamily: "'Work Sans', sans-serif",
		color: variables.primaryColor,
		fontSize: 50,
		marginTop: 10
	},
};
export default styles;
