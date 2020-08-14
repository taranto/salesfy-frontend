import { StyleSheet } from "react-native";
import platform from "app/theme/variables/platform"

const styles: any = StyleSheet.create({
	viewLoader: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}, inverseBgColor: {
		backgroundColor: platform.brandPrimary
	}
});
export default styles;
