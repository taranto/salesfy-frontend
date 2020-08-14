import React from 'react';
import { renderContentListItem } from './ContentList'
import { HorizontalList } from '../horizontal-list/HorizontalList';

export const ContentListHorizontal = ({ data, isLoading, height, hasPowerInItem, onConversion, deleteContent, location }) => {
	return (
		<div className="content-list horizontal">
			<HorizontalList
				qtComponentHeight={height}
				isLoading={isLoading}
				data={data}
				renderItem={(item) => renderContentListItem({ item, onConversion, deleteContent, hasPowerInItem, location })}
				qtItemWidth={230}
				isAutoSlidePerPage={true}
			/>
		</div>
	)
}
