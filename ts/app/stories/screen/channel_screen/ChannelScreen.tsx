import React from 'react';
import { ChannelList } from 'components';
import { IChannelList } from 'app-core/utils/interfaces';

class ChannelScreen extends React.Component<IChannelList> {
	public render() {
		const channelListProps:any = {
			...this.props
		}
		return <ChannelList {...channelListProps}/>
	}
}

export default ChannelScreen;
