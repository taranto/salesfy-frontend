import React from 'react';
import { IContentList } from 'app-core/utils/interfaces/index';
import { ContentList } from 'components';
import { ListHeaderTitle } from 'components';
import { Translation } from 'app-core/utils/translate/Translation';

abstract class AbstractContentScreen<P = {}, S={}> extends React.Component<IContentList & P, S> {

	constructor(props) {
		super(props);

		this.listHeader = this.listHeader.bind(this);
		this.detailsHeader = this.detailsHeader.bind(this);
	}

	public detailsHeader() {
		return;
	}

	public filterContainer() {
		return (
			<ListHeaderTitle title={Translation.contentYouLike} />
		)
	}

	public listHeader() {
		const { isChannel } = this.props;

		if (isChannel) {//  && (options && options.idChannel !== FEED_CHANNEL)
			return this.toolbarHeader();
		}

		return;
	}

	public toolbarHeader() {
		return;
	}

	public render() {
		const { items, isLoading, remaining, refreshing, showFavorite, showChannelsAward,
			showFeed, onConversion, onEndReached, onScrollEndDrag,
			flatListRef, onViewableItemsChanged, onScroll, deleteContent,
			hasPowerInItem, isChannel, isTagChange, location, presentation
		} = this.props;

		const { hasPower, isMyChannels } = location && location.state ? location.state : { hasPower: false, isMyChannels: false };

		const hasAuthToAdd = isMyChannels || hasPower;

		const data = (!presentation && hasAuthToAdd) ? [{isWizard: true}].concat(items) : items;

		return (
			<>
				{this.detailsHeader()}
				<div className="screen-content">
					<ContentList
						listHeader={this.listHeader}
						extraData={this.props}
						isRemaining={remaining}
						onConversion={onConversion}
						isLoading={isLoading}
						onEndReached={onEndReached}
						data={data}
						onScrollEndDrag={onScrollEndDrag}
						flatRef={flatListRef}
						onViewableItemsChanged={onViewableItemsChanged}
						refreshing={refreshing}
						showFavorite={showFavorite}
						showChannelsAward={showChannelsAward}
						showFeed={showFeed}
						onScroll={onScroll}
						deleteContent={deleteContent}
						hasPowerInItem={hasPowerInItem}
						isChannel={isChannel}
						isTagChange={isTagChange}
					/>
				</div>
			</>
		);
	}
}

export default AbstractContentScreen;
