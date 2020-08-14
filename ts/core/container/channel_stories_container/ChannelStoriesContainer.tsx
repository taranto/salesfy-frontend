import * as React from 'react';
import { connect } from 'react-redux';
import { ILoading, INavigation } from 'app-core/utils/interfaces';
import { getChannelStoriesList } from 'app-core/redux_store/channel/Actions';
import { ChannelStoriesList } from 'components';
import { hideTabAll } from 'app-core/redux_store/home/Actions';
import { getContentList } from 'app-core/redux_store/content/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { CtUserGroupAccess } from 'salesfy-shared';

interface ITagListContainer extends ILoading, INavigation {
	items: any[];
	remaining: boolean;
	offset: number;
	dispatch: any;
	options: any;
	navigation: any;
	presentation?: boolean;
	idUser?: number;
}

interface IState {
	hasScroll?: boolean;
}

class ChannelStoriesContainer extends React.Component<ITagListContainer, IState> {
	public listRef = React.createRef();

	constructor(props) {
		super(props);

		this.state = {
			hasScroll: false
		};
		this.onRead = this.onRead.bind(this);
		this.onEndReached = this.onEndReached.bind(this);
		this.scrollToNext = this.scrollToNext.bind(this);
		this.scrollToBack = this.scrollToBack.bind(this);
		this.onResize = this.onResize.bind(this);
		this.hasPowerInItem = this.hasPowerInItem.bind(this);
	}

	public componentDidMount() {
		this.props.dispatch(getChannelStoriesList(LIST_LIMIT_DEFAULT, 0, true)).then(() => {
			this.onResize();
		});
	}

	public onEndReached() {
		const { remaining, isLoading, offset } = this.props;

		if (!isLoading && remaining) {
			this.props.dispatch(getChannelStoriesList(LIST_LIMIT_DEFAULT, offset, false));
		}
	}

	public onRead(item) {
		const { options, navigation } = this.props;

		if (item.idChannel === 0) {
			this.props.dispatch(hideTabAll());
			if (navigation) {
				navigation.navigate('SelectTypeNewHatch');
			}
		} else if (!options || options.idChannel !== item.idChannel) {
			this.props.dispatch(hideTabAll());
			this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: item.idChannel }, true, false));
		}
	}

	public scrollToBack() {
		const element: any = this.listRef.current;
		element.scrollLeft = element.scrollLeft - 200;
	}

	public scrollToNext() {
		const element: any = this.listRef.current;
		element.scrollLeft = element.scrollLeft + 200;

		if (element.scrollLeft + element.offsetWidth >= element.scrollWidth * 0.8) {
			this.onEndReached();
		}
	}

	public onResize() {
		const element: any = this.listRef.current;
		if (element) {
			this.setState({ hasScroll: element.scrollWidth > element.offsetWidth });
		} else {
			this.setState({ hasScroll: false });
		}
	}

	public hasPowerInItem(item) {
		const { idCtUserGroupAccess, idPublisher } = item;
		return idCtUserGroupAccess === CtUserGroupAccess.admin.key || idPublisher === this.props.idUser;
	}

	public render() {
		const { items, isLoading, remaining, presentation } = this.props;
		const { hasScroll } = this.state;

		const props = {
			listRef: this.listRef,
			isRemaining: remaining,
			isLoading,
			onEndReached: this.onEndReached,
			data: presentation ? items : [{ idChannel: 0 }].concat(items),
			onRead: this.onRead,
			scrollToNext: this.scrollToNext,
			scrollToBack: this.scrollToBack,
			onResize: this.onResize,
			hasScroll,
			hasPowerInItem: this.hasPowerInItem
		};

		return <ChannelStoriesList {...props} />;
	}
}

const mapStateToProps = (state) => ({
	isLoading: state.channelList.isLoadingStories,
	items: state.channelList.itemsStories,
	offset: state.channelList.offsetStories,
	remaining: state.channelList.remainingStories,
	options: state.contentList.options,
	presentation: state.app.presentation,
	idUser: state.user.idUser
});

export default connect(mapStateToProps)(ChannelStoriesContainer);
