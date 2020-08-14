import { StyleSheet, Dimensions } from "react-native";
import platform from "app/theme/variables/platform";

export const { width, height } = Dimensions.get('window');

const cardWidth = () => width - 20;
const imageHeight = () => cardWidth()*0.73;

const styleGenerator = (cardWidthPx, cardHeightPx) => {
	return ({
		linesDescription: Math.round((cardHeightPx - 120) / 16),
		styles: StyleSheet.create({
			card: {
				width: cardWidthPx,
				height: cardHeightPx,
				display: "flex",
				elevation: 0,
				borderWidth: 1,
				borderColor: platform.categoryText,
				overflow: "hidden"
			},
			cardImage: {
				alignSelf: "center",
				width: cardWidthPx/2,
				height: cardHeightPx
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
			content: {
				paddingVertical: 15,
				paddingLeft: 15,
				paddingRight: 10
			},
			paddingItem: {
				marginBottom: 10
			},
			headerItem: {
				color: platform.headerInverseText,
			},
			description: {
				color: platform.categoryText,
				paddingBottom: 10,
				fontSize: 16,
			},
		})
	})
}

export const smallStyles: any = styleGenerator(cardWidth()/1.5, imageHeight()/1.5);
const styles: any = styleGenerator(cardWidth(), imageHeight());
export default styles;
