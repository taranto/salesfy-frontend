import React from 'react';
import { connect } from 'react-redux';
import { ContentList } from 'components';
import AbstractContentListScreen from 'app-core/stories/screen/AbstractContentListScreen';

class ContentListScreen extends AbstractContentListScreen {

	public render() {
		const { items, isLoading, remaining, refreshing, showFavorite, showChannelsAward,
			showFeed, onConversion, cardActions, onEndReached, onScrollEndDrag,
			flatListRef, onViewableItemsChanged, onScroll
		} = this.props;

		return (
			<ContentList
				listHeader={this.listHeader}
				extraData={this.props}
				isRemaining={remaining}
				onConversion={onConversion}
				cardActions={cardActions}
				isLoading={isLoading}
				onEndReached={onEndReached}
				data={items}
				onScrollEndDrag={onScrollEndDrag}
				flatRef={flatListRef}
				onViewableItemsChanged={onViewableItemsChanged}
				refreshing={refreshing}
				showFavorite={showFavorite}
				showChannelsAward={showChannelsAward}
				showFeed={showFeed}
				onScroll={onScroll}
			/>
		);
	}
}

const mapStateToProps = state => ({
	options: state.channelList.options
});

export default connect(mapStateToProps)(ContentListScreen);
