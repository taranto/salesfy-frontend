import * as React from 'react';
import { connect } from 'react-redux';
import { ILoading, INavigation } from 'app-core/utils/interfaces';
import { IContent, CtUserGroupAccess } from 'salesfy-shared';
import { getChannelList, goToChannelListTop, deleteChannelData } from 'app-core/redux_store/channel/Actions';
import { hideTabAll } from 'app-core/redux_store/home/Actions';
import { getContentList } from 'app-core/redux_store/content/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { ChannelScreen } from 'screens';
import { Translation } from 'app-core/utils/translate/Translation';
import Alert from 'web/native/Alert';
// tslint:disable
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
	title?: any;
	description?: string;
	idUser?: any;
	redraw?: boolean;
}

class ChannelListContainer extends React.Component<IContentListContainer> {
	public flatListRef;

	constructor(props) {
		super(props);

		this.onEndReached = this.onEndReached.bind(this);
		this.onConversion = this.onConversion.bind(this);
		this.onScrollEndDrag = this.onScrollEndDrag.bind(this);
		this.hasPowerInItem = this.hasPowerInItem.bind(this);
		this.deleteChannel = this.deleteChannel.bind(this);
		this.reloadList = this.reloadList.bind(this);

		this.flatListRef = React.createRef();
	}

	public componentWillReceiveProps(nextProps) {
		if (this.props.scrollTop !== nextProps.scrollTop && this.props.items && this.props.items.length > 0) {
			this.props.dispatch(goToChannelListTop(undefined));
			if (this.flatListRef && this.flatListRef.current && this.flatListRef.current.scrollToIndex) {
				this.flatListRef.current.scrollToIndex({ index: 0, animated: true });
			}
		}
	}

	public hasPowerInItem(item) {
		const { idCtUserGroupAccess, idPublisher } = item;
		return idCtUserGroupAccess === CtUserGroupAccess.admin.key || idPublisher === this.props.idUser;
	}

	public onEndReached() {
		const { remaining, isLoading, offset, options } = this.props;

		if (!isLoading && remaining && options) {
			this.props.dispatch(getChannelList(LIST_LIMIT_DEFAULT, offset, options, offset === 0));
		}
	}

	public onConversion(item) {
		const { dispatch, navigation } = this.props;
		if (navigation && item.idChannel) {
			dispatch(hideTabAll());
			dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: item.idChannel }, true));
		}
	}

	public onScrollEndDrag() {
		const { options } = this.props;
		this.props.dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, options, true, true));
	}

	public async deleteChannel({ idChannel }) {
		try {
			const mtDel = await deleteChannelData({ idChannel });
			await this.props.dispatch(mtDel);
			Alert.success(Translation.channelRemovedSuccesfully);
			const mtGet = await getChannelList(LIST_LIMIT_DEFAULT, 0, this.props.options, true, true);
			await this.props.dispatch(mtGet);
		} catch (e) {
			Alert.warn(e);
		}
	}

	public reloadList() {
		this.props.dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, this.props.options, true));
	}

	public render() {
		const { remaining, isLoading, items, options, redraw } = this.props;

		const channelProps = {
			isLoading,
			options,
			isRemaining: remaining,
			data: items,
			redraw,
			onEndReached: this.onEndReached,
			onConversion: this.onConversion,
			hasPowerInItem: this.hasPowerInItem,
			deleteChannel: this.deleteChannel,
			reloadList: this.reloadList
		};
		return <ChannelScreen {...channelProps} />;
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.channelList.isLoading,
	items: state.channelList.items,
	views: state.channelList.views,
	offset: state.channelList.offset,
	remaining: state.channelList.remaining,
	redraw: state.channelList.redraw,
	options: state.channelList.options,
	isTagChange: state.channelList.isTagChange,
	scrollTop: state.channelList.scrollTop,
	refreshing: state.channelList.refreshing,
	showFavorite: state.home.showFavorite,
	showChannelsAward: state.home.showChannelsAward,
	showFeed: state.home.showFeed,
	idUser: state.user.idUser
});

export default connect(mapStateToProps)(ChannelListContainer);
