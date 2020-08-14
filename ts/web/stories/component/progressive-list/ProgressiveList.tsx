import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import { GridList } from '@material-ui/core';
import { CircularLoader } from 'components';

export const ProgressiveList = (props) => {
	const { data, rowHeight, cardWidth, cardWidthMobile, rowHeightMobile } = props;
	return (
		<div className="progressive-list" style={{ flex: '1 1 auto' }}>
			<AutoSizer disableHeight={false}>
				{(itemSizer) => {
					const { width, height } = itemSizer;

					const isMobile = width < 460;

					const realWidth =  !isMobile ? cardWidth : cardWidthMobile ? cardWidthMobile : cardWidth;
					const realHeight = !isMobile ? rowHeight : rowHeightMobile ? rowHeightMobile : rowHeight;

					const itemsPerRow = Math.floor(width / realWidth) || 1;
					const rowCount = Math.ceil(data.length / itemsPerRow) + 1;

					return (
						<List
							height={height}
							rowCount={rowCount}
							rowHeight={realHeight}
							noRowsRenderer={() => {
								return 50;
							}}
							rowRenderer={(item) => rowRenderer({ ...item, ...props, itemsPerRow, rowCount })}
							width={width}
						/>
					)
				}}
			</AutoSizer>
		</div>
	)
}

const rowRenderer = (rowItem) => {
	const { index, data, itemsPerRow, style, onEndReached, renderItem, listHeader, rowCount, listHeaderHeight, rowHeight, isLoading } = rowItem;
	const items: any[] = [];
	const fromIndex = index * itemsPerRow;

	const toIndex = Math.min(
		fromIndex + itemsPerRow,
		data.length
	);

	for (let i = fromIndex; i < toIndex; i++) {
		items.push(
			renderItem({ item: data[i], ...rowItem })
		);

		if (onEndReached && i === data.length - 1) {
			// LogUtils.print({onEndReached, length: data.length, i, index})
			onEndReached();
		}
	}
	const renderHeader = listHeader && listHeader();

	const customStyle = {
		...style,
		top: style.top + (renderHeader ? listHeaderHeight : 0)
	}

	const spinnerStyle = {
		...style,
		top: style.top + (renderHeader ? listHeaderHeight : 0) + rowHeight,
		right: 0,
	}

	const lasRow = index === (rowCount - 1);

	return (
		<>
			{index === 0 && renderHeader}
			<GridList key={`${index}-progressive-list`} style={customStyle} className="row-grid-list" spacing={1}>
				{items}
			</GridList>
			{(lasRow && isLoading && data.length > 0) && <div style={spinnerStyle} className="list-spinner"><CircularLoader /></div>}
		</>
	);
}
