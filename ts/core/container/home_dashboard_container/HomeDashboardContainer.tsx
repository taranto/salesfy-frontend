import React from 'react';
import { HomeDashboardScreen } from 'screens';
import { useSelector } from 'react-redux';

const HomeDashboardContainer = () => {
	const contentList = useSelector((state) => state.contentList);
	const channelList = useSelector((state) => state.channelList);

	const props = {
		contents: contentList.items,
		channels: channelList.items,
		isLoadingContents: contentList.isLoading,
		isLoadingChannels: channelList.isLoading
	};

	return <HomeDashboardScreen {...props} />;
};

export default HomeDashboardContainer;
