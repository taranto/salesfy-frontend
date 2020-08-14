import * as React from "react";
import { Container } from "native-base";
import styles from "./styles";
import platform from "app/theme/variables/platform";
import { PanResponder, TouchableOpacity } from "react-native";

interface IProps {
	header: JSX.Element,
	footer: JSX.Element,
	onTouch: any,
	showChannelsAward: boolean,
	showFeed: boolean,
	showFavorite: boolean,
	showSearch: boolean,
	hasBackground?:boolean
}

class HomePage extends React.Component<IProps> {

	public panResponder;

	constructor(props) {
		super(props);

		const { onTouch } = this.props;

		if (platform.platform === "ios") {
			this.panResponder = {
				panHandlers: {}
			}
		} else {
			this.panResponder = PanResponder.create({
				// Ask to be the responder:
				onStartShouldSetPanResponder: (_evt, _gestureState) => true,
				onStartShouldSetPanResponderCapture: (_evt, _gestureState) => false,
				// tslint:disable-next-line:max-line-length
				onMoveShouldSetPanResponder: (_evt, gestureState) => {
					return gestureState.dx > 60.0 || gestureState.dx < -60.0 ||
						gestureState.dy > 10.0 || gestureState.dy < -10.0
				},
				onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
				onPanResponderMove: onTouch,
			});
		}
	}
	// {hasBackground && <BackgroundImage />}
	public render() {
		const { children, header, footer, onTouch, showSearch } = this.props;
		return (
			<Container style={styles.container}>
				{header}
				<Container {...this.panResponder.panHandlers} style={styles.content}>
					{children}
					{footer}
					{showSearch && <TouchableOpacity activeOpacity={1} onPress={onTouch} style={styles.overlay} />}
				</Container>
			</Container>
		);
	}
}

export default HomePage;
