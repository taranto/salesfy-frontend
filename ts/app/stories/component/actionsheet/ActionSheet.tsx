import React from "react";
import {
	Modal,
	Platform,
	ActionSheetIOS,
	TouchableOpacity,
	FlatList,
	Text
} from "react-native";
import styles from './styles'
import { ListItem, Left, Icon, Body, View } from "native-base";

/* tslint:disable */

interface IActionSheetItem {
	icon: string,
	iconColor: string,
	text: string
}

interface IProps {
	autoHide: boolean,
	duration: number,
	message?: string,
}

interface IState {
	modalVisible: boolean
	cancelButtonIndex?: number,
	destructiveButtonIndex?: number,
	title?: string,
	message?: string,
	items: Array<{}>,
	callback: any
}

class ActionSheet extends React.Component<IProps, IState> {

	constructor(props) {
		super(props);

		this.state = {
			modalVisible: false,
			items: [],
			callback: () => { }
		};

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
	}

	public show(config, callback) {
		if (Platform.OS === "ios") {
			if (typeof config.options[0] == "object") {
				let options = config.options;
				let filtered = options.map(item => {
					return item.text;
				});
				config.options = filtered;
				ActionSheetIOS.showActionSheetWithOptions(config, callback);
			} else {
				ActionSheetIOS.showActionSheetWithOptions(config, callback);
			}
		} else {
			this.setState({
				items: config.options,
				title: config.title,
				message: config.message,
				destructiveButtonIndex: config.destructiveButtonIndex,
				cancelButtonIndex: config.cancelButtonIndex,
				modalVisible: true,
				callback
			});
		}
	}

	public hide() {
		this.setState({ modalVisible: false });
	}

	public componentDidMount() {
		if (!this.props.autoHide && this.props.duration) {
			console.warn(`It's not recommended to set autoHide false with duration`);
		}
	}

	public headerComponent(){
		if(!this.props.message){
			return;
		}
		return <Text style={{ height: 30, top: 30, color: "#477bb9" }}>{this.props.message}</Text>
	}
	// "fullScreen" | "pageSheet" | "formSheet" | "overFullScreen"
	public render() {
		return (
			<Modal
				animationType={"fade"}
				transparent={true}
				visible={this.state.modalVisible}
				onRequestClose={() => {
					this.state.callback(this.state.cancelButtonIndex);
					this.setState({ modalVisible: false });
				}}
			>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						this.state.callback(this.state.cancelButtonIndex);
						this.setState({ modalVisible: false });
					}}
					style={styles.overlay}>
					<View style={styles.touchableOpacity}>
					{this.headerComponent()}
						<FlatList
							style={styles.flatList}
							data={this.state.items}
							keyExtractor={(item, index) => `${item}_${index}`}
							renderItem={({ index, item }) => {
								const actionItem = item as IActionSheetItem;

								return typeof this.state.items[0] === "string" ? (
									<ListItem
										onPress={() => {
											this.state.callback(parseInt(String(index)));
											this.setState({ modalVisible: false });
										}}
										style={styles.itemSimple}>
										<Text>{item}</Text>
									</ListItem>
								) : (
										<ListItem
											onPress={() => {
												this.state.callback(parseInt(String(index)));
												this.setState({ modalVisible: false });
											}}
											style={styles.item}
											icon>
											<Left>
												<Icon
													name={actionItem.icon}
													style={{
														color: actionItem.iconColor ? actionItem.iconColor : undefined
													}}
												/>
											</Left>
											<Body style={styles.body}>
												<Text style={styles.bodyText}>{actionItem.text}</Text>
											</Body>
										</ListItem>
									);
							}}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	}
}

export default ActionSheet;
