import React from 'react';
import { renderChannelListItem } from './ChannelList'
import { HorizontalList } from '../horizontal-list/HorizontalList';

export const ChannelListHorizontal = ({ data, isLoading, height, hasPowerInItem, setOpenDetails, onConversion, deleteChannel, history }) => {
	return (
		<div className="channel-list horizontal">
			<HorizontalList
				qtComponentHeight={height}
				isLoading={isLoading}
				data={data}
				renderItem={(item) => renderChannelListItem({ item, onConversion, hasPowerInItem, history, deleteChannel, setOpenDetails })}
				qtItemWidth={330}
				isAutoSlidePerPage={true}
			/>
		</div>
	)
}
