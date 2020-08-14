import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform";

export const { width, height } = Dimensions.get('window');

const cardWidth = () => width - 20;
const imageHeight = () => cardWidth() / 2;
const fullShortHeight = () => imageHeight() + 65;
export const fullHeight = Math.round(cardWidth()*4/3)// status bar / margin
const maxDescriptionHeight = () => (fullHeight - imageHeight() - 180);
export const linesDescription = Math.round(maxDescriptionHeight() / 16);

const styles: any = StyleSheet.create({
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
		height: height - 130,
		padding: 0,
		margin:0,
		overflow: "hidden",
		backgroundColor: "transparent",
		alignItems: "center", justifyContent:"center"
	},
	card: {
		height: "auto",
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
	cardStyle: {
		width: cardWidth(),
		elevation: 0,
		borderWidth: 1,
		borderColor: platform.categoryText
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
		color: platform.purpleBg
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
	}
});
export default styles;
