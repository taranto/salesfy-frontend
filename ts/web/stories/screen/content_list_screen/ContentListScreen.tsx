import React from 'react';
import { connect } from 'react-redux';
import AbstractContentListScreen from 'app-core/stories/screen/AbstractContentListScreen';
import ScreenToolbar from 'web/container/screen_toolbar/ScreenToolbar';
import { IConnect } from 'app-core/utils/interfaces';
import { withRouter } from 'react-router-dom';
import { getContentList } from 'app-core/redux_store/content/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { FEED_CHANNEL } from 'root/envVars';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';
import { NewButton } from 'web/stories/component/button/Button';
import { ListHeaderTitle } from 'web/stories/component';
import { ChannelListCard } from 'web/stories/component/channel_list/ChannelList';
import FilterContainer from 'web/container/filter_container/FilterContainer';
import { Translation } from 'app-core/utils/translate/Translation';
import { ChannelMenu } from 'web/stories/component/menu/ChannelMenu';
import { deleteChannelData } from 'app-core/redux_store/channel/Actions';
import { FilterManager } from 'web/native/FilterManager';
import Alert from 'web/native/Alert';

const sortOptions = [
	{ value: 'dhPublish', label: Translation.dhPublishInfo },
	{ value: 'dhUpdate', label: Translation.lastUpdated },
	{ value: 'dhLastConversion', label: Translation.lastView },
	{ value: 'nmContent', label: Translation.name },
	{ value: 'vlEval', label: Translation.vlEvalSort },
	{ value: 'keyCtContentState', label: Translation.featured }
];

const filterTypes = (isLc, isChannel) =>
	[
		{ value: 'dsSearch', label: Translation.all },
		{ value: 'nmContent', label: Translation.name },
		{ value: 'dsContent', label: Translation.description },
		isLc && { value: 'nmTag', label: Translation.tag },
		!isLc && !isChannel && { value: 'nmGroup', label: Translation.group },
		{ value: 'nmPublisher', label: Translation.publisher },
		// { value: 'nmCtContent', label: Translation.type },
		!isChannel && { value: 'nmChannel', label: Translation.channel },
		!isChannel && { value: 'dsChannel', label: Translation.dsChannel }
	].filter((item) => item);

const advancedFilterTypes = (isLc, isChannel) =>
	[
		!isLc && !isChannel && { value: 'arIdGroup', label: Translation.group, fieldOption: 'groups' },
		!isChannel && { value: 'arIdChannel', label: Translation.channel, fieldOption: 'channels' },
		{ value: 'arIdPublisher', label: Translation.publisher, fieldOption: 'users' },
		// { value: 'arCtContent', label: Translation.type, fieldOption: 'ctContent' },
		isLc && { value: 'arIdTag', label: Translation.tag, fieldOption: 'tags' }
	].filter((item) => item);

class ContentListScreen extends AbstractContentListScreen<IConnect> {
	public unlisten;
	public pathname;

	constructor(props) {
		super(props);

		this.state = {
			showFeed: false
		};

		this.onBack = this.onBack.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	public onBack() {
		const { location, history } = this.props;

		if (location && location.state && location.state.fromChannel) {
			history.goBack();
		} else {
			history.push('/home');
		}
	}

	public filterContainer() {
		const { location } = this.props;
		const { idChannel, isPlaybook } =
			location && location.state ? location.state : { idChannel: undefined, isPlaybook: undefined };

		return (
			<div className="feed-filter-toolbar">
				<ListHeaderTitle title={Translation.contentYouLike} />
				<FilterContainer
					sortOptions={sortOptions}
					onFilterChange={this.onFilterChange}
					options={filterTypes(isPlaybook === false, idChannel)}
					advancedOptions={advancedFilterTypes(isPlaybook === false, idChannel)}
					canSort={true}
					defaultSort={'keyCtContentState'}
				/>
			</div>
		);
	}

	public toolbarHeader() {
		/*
		const { location, options, history, items } = this.props;
		const { hasPower, idChannel } = location && location.state ? location.state : { hasPower: false, idChannel: undefined };
		const hasToolbar = (options && options.idChannel !== FEED_CHANNEL);
		return (idChannel && hasToolbar) && (
			<ul className={`channel-list header ${(!items || items.length === 0) ? 'empty' : ''}`}>
				<ChannelListCard {...location.state} hasPowerInItem={() => hasPower} history={history}/>
			</ul>
		)*/
		return;
	}

	public onFilterChange(filterValues) {
		this.props.dispatch(
			getContentList(LIST_LIMIT_DEFAULT, 0, { ...this.props.options, ...filterValues }, true, true)
		);
	}

	public async deleteChannel({ idChannel }) {
		try {
			const mtDel = deleteChannelData({ idChannel });
			await this.props.dispatch(mtDel);
			Alert.success(Translation.channelRemovedSuccesfully);
			// const { history } = this.props;
			// history.goBack();
		} catch (e) {
			Alert.warn(e);
		}
	}

	public detailsHeader() {
		const { location, history, presentation } = this.props;

		if (!location.state) {
			return;
		}
		const {
			idChannel,
			nmChannel,
			piChannel,
			dsChannel,
			isPlaybook,
			hasPower,
			isMyChannels,
			idCtContentState,
			idCtChannelView
		} = location.state;

		const hasAuthToAdd = isMyChannels || hasPower;

		return (
			nmChannel && (
				<ScreenToolbar onBack={this.onBack}>
					{idChannel && (
						<ul className="channel-list toolbar">
							<ChannelListCard {...location.state} hasPowerInItem={() => hasPower} />
						</ul>
					)}
					<ListHeaderTitle title={nmChannel} />
					<div className="right">
						<FilterContainer
							sortOptions={sortOptions}
							onFilterChange={this.onFilterChange}
							options={filterTypes(isPlaybook === false, idChannel)}
							advancedOptions={advancedFilterTypes(isPlaybook === false, idChannel)}
							canSort={true}
							defaultSort={'keyCtContentState'}
						/>
						{hasAuthToAdd &&
						!presentation && (
							<NewButton
								onClick={() =>
									history.push(RoutesAppEnum.contentDetails.route, {
										idChannel,
										nmChannel,
										piChannel,
										dsChannel,
										idCtContentState,
										idCtChannelView,
										isPlaybook: isPlaybook !== undefined ? isPlaybook : true
									})}
								placeholder={Translation.newContent}
							/>
						)}
					</div>
					{idChannel &&
					!presentation && (
						<ChannelMenu {...location.state} onConfirmRemove={(item) => this.deleteChannel(item)} />
					)}
				</ScreenToolbar>
			)
		);
	}

	public componentWillMount() {
		this.onLocationChange(this.props.location);
		this.pathname = this.props.location.pathname;
		this.unlisten = this.props.history.listen((location) => {
			if (this.pathname === location.pathname) {
				this.onLocationChange(location);
			}
		});
	}

	public async onLocationChange(location) {
		const { dispatch, idUser } = this.props;
		const filterValue = await FilterManager.getDefaultFilterValue(location, idUser);

		if (location.state) {
			if (location.state.options) {
				dispatch(
					getContentList(LIST_LIMIT_DEFAULT, 0, { ...location.state.options, ...filterValue }, true, true)
				);
			} else if (location.state.isChannel) {
				dispatch(
					getContentList(
						LIST_LIMIT_DEFAULT,
						0,
						{ idChannel: location.state.idChannel, ...filterValue },
						true,
						true
					)
				);
			} else {
				dispatch(
					getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: FEED_CHANNEL, ...filterValue }, true, true)
				);
			}
		} else {
			dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { idChannel: FEED_CHANNEL, ...filterValue }, true, true));
		}
	}

	public componentWillUnmount() {
		this.unlisten();
	}
}

const mapStateToProps = (state) => ({
	presentation: state.app.presentation,
	idUser: state.user.idUser
});

export default withRouter(connect(mapStateToProps)(ContentListScreen));
