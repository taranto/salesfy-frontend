import React from 'react';
import { HomeScreen } from 'web/stories/screen';
import SettingsMenuContainer from 'web/container/settings_menu/SettingsMenuContainer';
import { connect } from "react-redux";
import { Route, withRouter } from 'react-router';
import GroupContainer from 'app-core/container/group_container/GroupContainer';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';
import ContentListContainer from 'app-core/container/content_list_container/ContentListContainer';
import ChannelListContainer from 'app-core/container/channel_list_container/ChannelListContainer';
import ChannelDetailsContainer from 'app-core/container/channel_details_container/ChannelDetailsContainer';
import ContentDetailsContainer from 'app-core/container/content_details_container/ContentDetailsContainer';
import ChannelContentListContainer from 'app-core/container/channel_content_list_container/ChannelContentListContainer';
import HomeDashboardContainer from 'app-core/container/home_dashboard_container/HomeDashboardContainer';
import DashboardContainer from 'web/container/dashboard_container/DashboardContainer';
import OneSignal from 'app-core/services/OneSignal';
import { Translation } from 'app-core/utils/translate/Translation';

interface IProps {
	history: any
	user: any,
	dispatch: any
}

interface IState {
	open: boolean,
	openMenuProfile: boolean
}

class HomeContainer extends React.Component<IProps, IState> {

	public menu;

	constructor(props) {
		super(props)

		this.menuClick = this.menuClick.bind(this);
		this.settingsMenu = this.settingsMenu.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.onItemClick = this.onItemClick.bind(this);
		this.menuClose = this.menuClose.bind(this);

		this.menu = React.createRef();

		this.state = {
			open: false,
			openMenuProfile: false
		}

		OneSignal.init();
	}

	public getMenuItems(user) {
		return [
			{
				id: "0",
				icon: "home",
				label: Translation.start,
				route: RoutesAppEnum.home.route,
				presentation: false
			},
			// {
			// 	id: "2",
			// 	icon: "public",
			// 	label: "Learning Center",
			// 	route: "/home/channels",
			// 	state: { isPlaybook: false },
			// 	presentation: false
			// },
			{
				id: "3",
				icon: "menu_book",
				label: Translation.playbook,
				route: "/home/channels",
				state: { isPlaybook: true },
				presentation: true
			},
			{
				id: "4",
				icon: "business_center",
				label: Translation.myContent,
				route: RoutesAppEnum.content.route,
				state: { options: { idPublisher: user.idUser, hideStories: true }, nmChannel: Translation.myContent, isMyChannels: true },
				presentation: true
				// idParent: "0"
			},
			{
				id: "5",
				icon: "bookmark",
				label: Translation.favorites,
				route: RoutesAppEnum.content.route,
				state: { options: { isFavorite: true, hideStories: true }, nmChannel: Translation.favorites },
				presentation: true
				// idParent: "0"
			},
			{
				id: "6",
				icon: "group",
				label: Translation.groups,
				route: "/home/groups",
				presentation: false
			}
		]
	}

	public onItemClick(item) {
		const { history } = this.props;
		history.push(item.route, { ...item.state });
	}

	public menuClick() {
		const { open } = this.state;

		const newOpen = !open;

		this.setState({ open: newOpen })
	}

	public menuClose() {
		this.setState({ open: false })
	}

	public handleToggle() {
		const { openMenuProfile } = this.state;

		this.setState({ openMenuProfile: !openMenuProfile })
	}

	public handleClose() {
		// this.setState({ openMenuProfile: false })
	}

	public settingsMenu() {
		const { openMenuProfile } = this.state;
		return <SettingsMenuContainer open={openMenuProfile} handleClose={this.handleClose} />
	}

	public render() {
		const { open } = this.state;
		const { user } = this.props;
		return (
			<HomeScreen
				user={user}
				open={open}
				menuClick={this.menuClick}
				menuItems={this.getMenuItems(user)}
				settingsMenu={this.settingsMenu}
				handleToggle={this.handleToggle}
				onItemClick={this.onItemClick}
				menuClose={this.menuClose}
				menuRef={this.menu}
			>
				<Route exact={true} path={RoutesAppEnum.home.route} component={HomeDashboardContainer} />
				<Route exact={true} path={RoutesAppEnum.content.route} component={ContentListContainer} />
				<Route exact={true} path={"/dashboard"} component={DashboardContainer} />
				<Route exact={true} path={RoutesAppEnum.channels.route} component={ChannelListContainer} />
				<Route exact={true} path={RoutesAppEnum.channelContent.route} component={ChannelContentListContainer} />
				<Route exact={true} path={RoutesAppEnum.channelDetails.route} component={ChannelDetailsContainer} />
				<Route exact={true} path={RoutesAppEnum.contentDetails.route} component={ContentDetailsContainer} />
				<Route exact={true} path={RoutesAppEnum.groups.route} component={GroupContainer} />
			</HomeScreen>
		);
	}
}

const mapStateToProps = state => ({
	user: state.user,
});

export default withRouter(connect(mapStateToProps)(HomeContainer));
