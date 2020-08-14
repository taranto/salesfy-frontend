import * as React from "react";
import { connect } from "react-redux";
import { HomeMenuButtons } from "app/stories/component";
import Sidebar from "app/stories/screen/sidebar";
import { Linking } from "react-native";
import { logout } from "app-core/redux_store/user/Actions";
import { hideTabAll, showTags } from "app-core/redux_store/home/Actions";
import { getContentList } from "app-core/redux_store/content/Actions";
import { HATCHERS_ANNOUNCE, HATCHERS_CONTENT_LINK, HATCHERS_PRIVACITY_LINK, HATCHERS_TERM_LINK, LIST_LIMIT_DEFAULT, TUTORIAL_CHANNEL } from "root/envVars";

export interface IProps {
	navigation: any;
	user: any;
	dispatch: any;
	countIndicators: any;
}
export interface IState {
	routes: any[]
}

class SidebarContainer extends React.Component<IProps, IState> {

	constructor(props){
		super(props)

		this.onSelectItem = this.onSelectItem.bind(this);

		this.state = {
			routes: HomeMenuButtons()
		}
	}

	public onSelectItem = (type) => {
		const { navigation } = this.props;
		switch (type) {
			case 'tutorial':
				this.onTutorialClick();
				break;
			case 'tags':
				this.onTagsClick();
				break;
			case 'term':
				this.onTermClick();
				break;
			case 'privacity':
				this.onPrivacityClick();
				break;
			case 'content':
				this.onContentClick();
				break;
			case 'logoff':
				this.onLogoffClick();
				break;
			case 'market':
				this.onMarketClick();
			default:
				break;
		}
		navigation.toggleDrawer();
	}

	public onTutorialClick() {
		const { dispatch } = this.props;
		dispatch(hideTabAll())
		dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: TUTORIAL_CHANNEL }, true))
	}

	public onTermClick() {
		Linking.openURL(HATCHERS_TERM_LINK)
	}

	public onPrivacityClick() {
		Linking.openURL(HATCHERS_PRIVACITY_LINK)
	}

	public onContentClick() {
		Linking.openURL(HATCHERS_CONTENT_LINK)
	}

	public onMarketClick() {
		Linking.openURL(HATCHERS_ANNOUNCE)
	}

	public onTagsClick() {
		const { dispatch } = this.props;

		dispatch(hideTabAll());
		dispatch(showTags());
	}

	public onLogoffClick() {
		const { dispatch } = this.props;

		dispatch(logout())
	}

	public render() {
		const { routes } = this.state;
		const { user } = this.props;
		return <Sidebar onPress={this.onSelectItem} user={user} routes={routes} navigation={this.props.navigation} />;
	}
}

const mapStateToProps = state => ({
	user: state.user,
	errorMessage: state.user.error
});

export default connect(mapStateToProps)(SidebarContainer)
