import { StyleSheet } from "react-native";
// import platform from "app/theme/variables/platform";
// import { ifIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper'

const styles: any = StyleSheet.create({
	container: {
		backgroundColor: "#FBFAFA",
		position: "relative",
		flex: 1
	},
	content: {
		position: 'relative'
		/*...ifIphoneX({
			paddingTop: 65 + getStatusBarHeight()
		}, {
			paddingTop: platform.platform === 'ios' ? 71 : 56
		}),
		*/
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
	}
});
export default styles;
