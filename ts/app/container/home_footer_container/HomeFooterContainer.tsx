import * as React from "react";
import { connect } from "react-redux";
import { INavigation } from "app-core/utils/interfaces";
import { HomeFooter } from "app/stories/component";
import { getContentList, goToContentListTop } from "app-core/redux_store/content/Actions"
import { showTabFeed, showTabChannelsAward, showTabFavorite, showTabChannels } from "app-core/redux_store/home/Actions"
import { NavigationActions } from 'react-navigation'
import { getChannelList, goToChannelListTop } from "app-core/redux_store/channel/Actions";
import { LIST_LIMIT_DEFAULT, FEED_CHANNEL } from "root/envVars";

interface IProps {
	dispatch: any,
	showChannelsAward: boolean,
	showFeed: boolean,
	showFavorite: boolean,
	showNewHatch:boolean,
	showChannels: boolean,
	options: any
}

class HomeFooterContainer extends React.Component<INavigation & IProps> {

	constructor(props) {
		super(props)

		this.onPressChannelsAward = this.onPressChannelsAward.bind(this);
		this.onPressFeed = this.onPressFeed.bind(this);
		this.onPressFavorite = this.onPressFavorite.bind(this);
		this.onPressNewHatch = this.onPressNewHatch.bind(this);
		this.onPressChannels = this.onPressChannels.bind(this);
	}

	public onPressFeed() {
		const { dispatch, showFeed } = this.props;

		if (showFeed) {
			dispatch(goToContentListTop(0));
		} else {
			dispatch(showTabFeed())
			dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: FEED_CHANNEL }, true))
		}
	}

	public onPressChannelsAward() {
		const { dispatch, showChannelsAward } = this.props;

		if (showChannelsAward) {
			dispatch(goToChannelListTop(0));
		} else {
			dispatch(showTabChannelsAward())
			dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { isPlaybook: true }, true))
		}
	}

	public onPressFavorite() {
		const { dispatch, showFavorite } = this.props;

		if (showFavorite) {
			dispatch(goToContentListTop(0));
		} else {
			dispatch(showTabFavorite())
			dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { isFavorite: true }, true))
		}
	}

	public onPressNewHatch() {
		const { dispatch } = this.props;

		dispatch(NavigationActions.navigate({ routeName: "SelectTypeNewHatch" }));
	}

	public onPressChannels() {
		const { dispatch, showChannels } = this.props;

		if (showChannels) {
			dispatch(goToChannelListTop(0));
		} else {
			dispatch(showTabChannels());
			dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { isPlaybook: false }, true));
		}
	}

	public render() {
		return (
			<HomeFooter
				onPressFeed={this.onPressFeed}
				onPressChannelsAward={this.onPressChannelsAward}
				onPressFavorite={this.onPressFavorite}
				onPressChannels={this.onPressChannels}
				onPressNewHatch={this.onPressNewHatch}
				{...this.props}
			/>
		);
	}
}

const mapStateToProps = state => ({
	showChannelsAward: state.home.showChannelsAward,
	showFeed: state.home.showFeed,
	showFavorite: state.home.showFavorite,
	showNewHatch: state.home.showNewHatch,
	showChannels: state.home.showChannels,
	options: state.contentList.options
});

export default connect(mapStateToProps)(HomeFooterContainer);
