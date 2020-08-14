import * as React from "react";
import ContentScreen, { IContentScreen } from "app/stories/screen/content_screen/ContentScreen";
import CardActionsContainer from "app-core/container/card_actions_container/CardActionsContainer";
import { View } from "react-native";
import { WebView } from 'react-native-webview';

interface IState {
	visible?: boolean;
}

interface IProps {
	stopLoadWebview: () => void;
	startLoadWebview: () => void;
}

class PostScreen extends ContentScreen<IContentScreen & IProps, IState> {

	constructor(props) {
		super(props);
	}

	public headerRightButtons() {
		return;
	}

	public fabButtons() {
		const { item } = this.props;

		return (
			<CardActionsContainer isFooter={true} {...item} />
		);
	}

	public contentChildrens() {
		const { stopLoadWebview, startLoadWebview } = this.props;
		const { lkContent } = this.props.item;

		let lkTransformed = lkContent;
		if (!lkContent.toString().startsWith("http://") && !lkContent.toString().startsWith("https://")) {
			lkTransformed = `http://${lkContent}`;
		}
		return (
			<View style={{ flex: 1 }}>
				<WebView
					scalesPageToFit={true}
					source={{ uri: lkTransformed }}
					onLoadStart={startLoadWebview}
					onLoad={stopLoadWebview}
				/>
			</View>
		);
	}
}

export default PostScreen;
