import * as React from 'react';
import { connect } from 'react-redux';
import {
	getContentList,
	pushView,
	goToContentListTop,
	deleteContentData,
	setContentConversion
} from 'app-core/redux_store/content/Actions';
import CardActionsContainer from 'app-core/container/card_actions_container/CardActionsContainer';
import { ILoading, INavigation } from 'app-core/utils/interfaces';
import { IContent, CtUserGroupAccess } from 'salesfy-shared';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { ContentListScreen } from 'screens';
import { Translation } from 'app-core/utils/translate/Translation';
import Alert from 'web/native/Alert';

interface IContentListContainer extends ILoading, INavigation {
	items: IContent[];
	remaining: boolean;
	isTagChange: boolean;
	offset: number;
	dispatch: any;
	options?: any;
	views?: any[];
	scrollTop?: number;
	refreshing?: boolean;
	showFavorite?: boolean;
	showChannelsAward?: boolean;
	showFeed?: boolean;
	idUser;
	isChannel?;
}

class ContentListContainer extends React.Component<IContentListContainer> {
	public flatListRef;

	constructor(props) {
		super(props);

		this.onEndReached = this.onEndReached.bind(this);
		this.onConversion = this.onConversion.bind(this);
		this.cardActions = this.cardActions.bind(this);
		this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
		this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
		this.onScroll = this.onScroll.bind(this);
		this.deleteContent = this.deleteContent.bind(this);
		this.hasPowerInItem = this.hasPowerInItem.bind(this);

		this.flatListRef = React.createRef();
	}

	public componentWillMount() {
		const { navigation, options, showFeed } = this.props;
		if (navigation && showFeed) {
			this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, options, true));
		}
	}

	public componentWillReceiveProps(nextProps) {
		const { isChannel } = this.props;
		if (
			!isChannel &&
			this.props.scrollTop !== nextProps.scrollTop &&
			this.props.items &&
			this.props.items.length > 0
		) {
			this.props.dispatch(goToContentListTop(undefined));
			if (this.flatListRef && this.flatListRef.current && this.flatListRef.current.scrollToIndex) {
				this.flatListRef.current.scrollToIndex({ index: 0, animated: true });
			}
		}
	}

	public onEndReached() {
		const { remaining, isLoading, offset, options, isChannel } = this.props;

		if (!isLoading && remaining && offset > 0 && isChannel && options.idChannel) {
			this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, offset, options, offset === 0, undefined));
		}
	}

	public onConversion(item) {
		const { navigation, dispatch } = this.props;
		if (item.lkContent) {
			dispatch(setContentConversion(item));
			if (navigation) {
				navigation.navigate('Content', { item });
			}
		}
	}

	public onViewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems) {
			viewableItems.map((visibleItem) => {
				const item: any = this.props.items[visibleItem.index];

				if (item && !item.hasView) {
					item.hasView = true;
					this.props.dispatch(pushView(item.idContent));
				}
			});
		}
	};

	public cardActions(item, shShowActionButtons, actionButton) {
		return <CardActionsContainer {...item} shShowActionButtons={shShowActionButtons} actionButton={actionButton} />;
	}

	public onScrollEndDrag() {
		const { options } = this.props;
		this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, options, true, true));
	}

	public onScroll(_event) {}

	public async deleteContent({ idContent }) {
		try {
			const mtDel = deleteContentData({ idContent });
			await this.props.dispatch(mtDel);
			Alert.success(Translation.contentRemovedSuccesfully);
			const mtGet = getContentList(LIST_LIMIT_DEFAULT, 0, this.props.options, true, true);
			await this.props.dispatch(mtGet);
		} catch (e) {
			Alert.warn(e);
		}
	}

	public hasPowerInItem(item) {
		const { idUser } = this.props;
		const { idCtUserGroupAccess, idPublisher } = item;
		return idCtUserGroupAccess === CtUserGroupAccess.admin.key || idPublisher === idUser;
	}

	public render() {
		const {
			items,
			isLoading,
			remaining,
			refreshing,
			showFavorite,
			showChannelsAward,
			showFeed,
			options,
			isChannel,
			isTagChange
		} = this.props;

		const contentListProps = {
			extraData: this.props,
			onConversion: this.onConversion,
			cardActions: this.cardActions,
			onEndReached: this.onEndReached,
			onScroll: this.onScroll,
			onScrollEndDrag: this.onScrollEndDrag,
			flatRef: this.flatListRef,
			onViewableItemsChanged: this.onViewableItemsChanged,
			remaining,
			items,
			isLoading,
			refreshing,
			showFavorite,
			showChannelsAward,
			showFeed,
			options,
			isChannel,
			deleteContent: this.deleteContent,
			hasPowerInItem: this.hasPowerInItem,
			isTagChange
		};

		return <ContentListScreen {...contentListProps} />;
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.contentList.isLoading,
	items: state.contentList.items,
	views: state.contentList.views,
	offset: state.contentList.offset,
	remaining: state.contentList.remaining,
	options: state.contentList.options,
	isTagChange: state.contentList.isTagChange,
	scrollTop: state.contentList.scrollTop,
	refreshing: state.contentList.refreshing,
	showFavorite: state.home.showFavorite,
	showChannelsAward: state.home.showChannelsAward,
	showFeed: state.home.showFeed,
	idUser: state.user.idUser
});

export default connect(mapStateToProps)(ContentListContainer);
