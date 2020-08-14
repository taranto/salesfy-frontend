import * as React from "react";
import { connect } from "react-redux";
import { INavigation } from "app-core/utils/interfaces";
import { ProfileIcon, SearchIcon, HomeHeader } from "app/stories/component";
import ActionSheet from "app/stories/component/actionsheet/ActionSheet";
import { showHeaderSearch } from "app-core/redux_store/home/Actions";
import { reduxForm } from "redux-form";
import { View } from "native-base";
import { getContentList } from "app-core/redux_store/content/Actions";
import { getChannelList } from "app-core/redux_store/home/Actions";
import { hideTabAll } from "app-core/redux_store/home/Actions";
import { LIST_LIMIT_DEFAULT, LIST_CHANNEL_LIMIT_DEFAULT, FEED_CHANNEL, UNKNOWN_CHANNEL } from "root/envVars";

interface IProps {
	dispatch: any;
	showSearch: boolean;
	dsSearch: string;
	options: any;
	channelList: [];
	hasFilter?: boolean;
	emUser?: string;
	navigation: any;
	home: any;
	remaining?: boolean;
	isLoading?: boolean;
	offset?:number;
}

interface IState {
	animate: boolean;
}

class HomeHeaderContainer extends React.Component<INavigation & IProps, IState> {

	public alreadyToAnimate;

	constructor(props) {
		super(props)

		this.onClickButton = this.onClickButton.bind(this);
		this.onSearchClick = this.onSearchClick.bind(this);
		this.onFilter = this.onFilter.bind(this);
		this.onDsSearch = this.onDsSearch.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);
		this.onEndReached = this.onEndReached.bind(this);

		this.state = {
			animate: false
		}
	}

	public onDsSearch() {
		const { dsSearch, options } = this.props;

		if (dsSearch) {
			this.props.dispatch(hideTabAll())
			if(options && options.idChannel !== FEED_CHANNEL){
				this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { dsSearch }, true, false))
			} else {
				this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: options.idChannel, dsSearch }, true, false))
			}
		}
	}

	public onCancelPress() {
		const { dispatch } = this.props;

		dispatch(showHeaderSearch(false))
	}

	public onFilter(channel) {
		const { options } = this.props;

		if (!options || options.idChannel !== channel) {
			this.props.dispatch(hideTabAll())
			this.props.dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: channel }, true, false))
		}
	}

	public onClickButton = () => {
		const { navigation } = this.props;
		navigation.openDrawer();
	}

	public componentWillReceiveProps(nextProps){
		const { showSearch } = this.props;
		if(nextProps.showSearch !== showSearch){
			this.setState({ animate: true })
		} else {
			this.setState({ animate: false })
		}
	}

	public onSearchClick() {
		const { dispatch, showSearch } = this.props;

		dispatch(showHeaderSearch(!showSearch))
	}

	public componentDidMount() {
		this.alreadyToAnimate = true;
	}

	public onEndReached() {}

	public componentWillMount() {
		this.alreadyToAnimate = false;
		this.props.dispatch(getChannelList(LIST_CHANNEL_LIMIT_DEFAULT, 0, true))
	}

	public shouldComponentUpdate(nextProps) {
		return !(nextProps.channelList !== this.props.channelList) && !(nextProps.dsSearch !== this.props.dsSearch)
	}

	public getSubtitle(){
		const { home } = this.props;

		if(home.showFeed){
			return "Início";
		} else if(home.showChannelsAward){
			return "Playbook"
		} else if(home.showFavorite){
			return "Favoritos"
		} else if(home.showChannels){
			return "Learning Center"
		} else if(home.showTags){
			return "Interesses"
		} else {
			return;
		}
	}

	public render() {
		const { showSearch, channelList, hasFilter, options, emUser, isLoading, home } = this.props;

		return (
			<View>
				<HomeHeader
					subtitle={this.getSubtitle()}
					showSearch={showSearch}
					data={channelList}
					onEndReached={this.onEndReached}
					onFilter={this.onFilter}
					onCancelPress={this.onCancelPress}
					onDsSearch={this.onDsSearch}
					leftButtons={ProfileIcon({ onPress: this.onClickButton })}
					rightButtons={home.showFeed ? SearchIcon({ onPress: this.onSearchClick, hasFilter }) : <View style={{width: 55}}/>}
					options={options}
					isLoading={isLoading}
				>
					<ActionSheet ref="actionSheet" autoHide={false} duration={0} message={emUser} />
				</HomeHeader>
			</View>
		);
	}
}

// tslint:disable-next-line:variable-name
const MenuContainer = reduxForm({
	form: "homeSearch",
})(HomeHeaderContainer);

const mapStateToProps = state => ({
	home: state.home,
	showSearch: state.home.showSearch,
	dsSearch: state.form.homeSearch && state.form.homeSearch.values ? state.form.homeSearch.values.dsSearch : undefined,
	channelList: state.home.channelList,
	offset: state.home.offset,
	remaining: state.home.remaining,
	isLoading: state.home.isLoading,
	emUser: state.user.emUser,
	hasFilter: state.contentList.options
		&& (state.contentList.options.dsSearch
			|| state.contentList.options.idTag
			|| (state.contentList.options.idChannel && state.contentList.options.idChannel !== FEED_CHANNEL && state.contentList.options.idChannel !== UNKNOWN_CHANNEL)
			|| state.contentList.options.idTag),
	options: state.contentList.options
});

export default connect(mapStateToProps)(MenuContainer);
