import * as React from "react";
import { connect } from "react-redux";
import { HomePage, TransitionScreen } from "screens";
import { DiscoverContainer } from "app/container";
import { INavigation } from "app-core/utils/interfaces";
import { I18n, KeyEnum, IContent } from "salesfy-shared";
import { showHeaderSearch, showTabFeed } from "app-core/redux_store/home/Actions";
import HomeHeaderContainer from "app/container/home_header_container/HomeHeaderContainer";
import HomeFooterContainer from "app/container/home_footer_container/HomeFooterContainer";
import { BackHandler, SafeAreaView } from "react-native";
import { NavigationActions } from "react-navigation";
import { getContentList } from "app-core/redux_store/content/Actions";
import ShareMenu from 'react-native-share-menu';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';

interface IProps {
	dispatch: any,
	items: IContent[],
	isLoading: boolean,
	showSearch: boolean,
	showChannelsAward: boolean,
	showTags: boolean;
	showFeed: boolean,
	showFavorite: boolean,
	isTagChange: boolean,
	showNewHatch: boolean,
	showChannels: boolean,
}

class HomePageContainer extends React.Component<INavigation & IProps> {
	constructor(props) {
		super(props)

		this.onTouch = this.onTouch.bind(this);
		this.onBack = this.onBack.bind(this);
	}

	public componentWillMount() {
		if (ShareMenu) {
			ShareMenu.getSharedText((lkContent: string) => {
				if (lkContent && lkContent.length) {
					if (lkContent.startsWith('content://media/')) {
						// console.log("text media", lkContent)
						// this.setState({ sharedImage: text });
					} else {
						this.props.navigation.navigate('SelectTypeNewHatch', { lkContent });
					}
				}
			})
		}
	}

	public componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.onBack);
	}

	public componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.onBack);
	}

	public onBack = () => {
		const { showSearch, showFeed, dispatch, navigation } = this.props;

		if (navigation.isFocused()) {
			if (showSearch) {
				dispatch(showHeaderSearch(false))
			} else {
				if (showFeed) {
					BackHandler.exitApp();
				} else {
					dispatch(showTabFeed());
					dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, {}, true));
				}
			}
		} else {
			dispatch(NavigationActions.back());
		}

		return true;
	}

	public onTouch(_evt, _gestureState) {
		const { dispatch, showSearch } = this.props;

		if (showSearch) {
			dispatch(showHeaderSearch(false))
		}
	}

	public render() {
		const {
			navigation, items, isLoading, isTagChange,
			showTags, showNewHatch, showChannelsAward,
			showFeed, showFavorite, showChannels, showSearch
		} = this.props;

		const homeHeader = <HomeHeaderContainer ref="homeHeader" navigation={navigation} />;
		const homeFooter = <HomeFooterContainer />

		return items.length === 0 && !isTagChange && isLoading ?
			<TransitionScreen infoText={I18n.t(KeyEnum.loading)} /> :
			(
				<SafeAreaView style={{flex: 1}}>
					<HomePage
						header={homeHeader}
						hasBackground={showNewHatch === false}
						showSearch={showSearch}
						footer={homeFooter}
						onTouch={this.onTouch}
						{...{ showChannelsAward, showFeed, showFavorite }}
					>
						<DiscoverContainer showTags={showTags} showChannelsAward={showChannelsAward} showChannels={showChannels} navigation={navigation} />
					</HomePage>
				</SafeAreaView>
			);
	}
}

const mapStateToProps = state => ({
	items: state.contentList.items,
	isLoading: state.contentList.isLoading,
	showSearch: state.home.showSearch,
	showChannelsAward: state.home.showChannelsAward,
	showChannels: state.home.showChannels,
	showFeed: state.home.showFeed,
	showFavorite: state.home.showFavorite,
	showNewHatch: state.home.showNewHatch,
	showTags: state.home.showTags,
	isTagChange: state.contentList.isTagChange
});

export default connect(mapStateToProps)(HomePageContainer);
