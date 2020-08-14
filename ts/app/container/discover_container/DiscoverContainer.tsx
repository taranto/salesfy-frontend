import * as React from "react";
import { ContentListContainer } from "containers";
import { INavigation } from "app-core/utils/interfaces";
import ChannelListContainer from "app-core/container/channel_list_container/ChannelListContainer";
import TagListContainter from "app/container/tag_list_container/TagListContainter";
import { I18n, KeyEnum } from "salesfy-shared";

interface IProps {
	showChannelsAward: boolean;
	showChannels: boolean;
	showTags: boolean;
}

class DiscoverContainer extends React.Component<INavigation & IProps> {

	public getTitle(showChannelsAward, showChannels){
		if(showChannelsAward){
			return I18n.t(KeyEnum.salesPlaybook);
		}

		if(showChannels){
			return I18n.t(KeyEnum.salesIntelligence);
		}

		return;
	}

	public getDescription(showChannelsAward, showChannels){
		if(showChannelsAward){
			return I18n.t(KeyEnum.awardsTitle);
		}

		if(showChannels){
			return I18n.t(KeyEnum.channelsTitle);
		}

		return;
	}

	public getScreen(){
		const { navigation, showChannelsAward, showChannels, showTags } = this.props;

		if(showChannelsAward || showChannels){
			return <ChannelListContainer title={this.getTitle(showChannelsAward, showChannels)} navigation={navigation}/>
		} else if(showTags){
			return <TagListContainter navigation={navigation}/>
		} else {
			return <ContentListContainer navigation={navigation}/>
		}
	}

	public render() {
		return this.getScreen();
	}
}

export default DiscoverContainer;
