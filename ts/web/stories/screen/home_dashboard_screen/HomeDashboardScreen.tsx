import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import ChannelStoriesContainer from 'app-core/container/channel_stories_container/ChannelStoriesContainer';
import { ListHeaderTitle } from 'components';
import { Translation } from 'app-core/utils/translate/Translation';
import { ContentListHorizontalContainer } from '../../../container/content_list_horizontal_container/ContentListHorizontalContainer';
import { ChannelListHorizontalContainer } from '../../../container/channel_list_horizontal_container/ChannelListHorizontalContainer';

import { connect } from 'react-redux';
import { getChannelList } from 'app-core/redux_store/channel/Actions';
import { getContentList } from 'app-core/redux_store/content/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { withRouter } from 'react-router-dom';
import FilterContainerLite from 'web/container/filter_container/FilterContainerLite';
import { FilterManager } from 'web/native/FilterManager';
import { useSelector } from 'react-redux';

import { groupOptions } from 'web/container/filter_container/options/FilterContainerLiteOptions';

export interface IHomeDashboardScreen {
	contents: any[];
	channels: any[];
	isLoadingContents?: boolean;
	isLoadingChannels?: boolean;
	options?: any;
	location?: any;
	dispatch?: any;
}
const HomeDashboardScreen = (props: IHomeDashboardScreen) => {
	const { options, location, dispatch } = props;

	const idUser = useSelector((state) => state.user.idUser);

	const [ filterOp, setFilterOp ] = useState({});

	const newOptions = { ...options, isActiveChannel: true };

	const setContentOptions = (param) => {
		const { nmSort } = param;
		FilterManager.setDefaultFilter(location, idUser, { ...filterOp, filterValue: { nmSort: nmSort } }, 'content');
		dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { ...newOptions, nmSort: nmSort }, true, true));
	};
	const setChannelOptions = (param) => {
		const { nmSort } = param;
		FilterManager.setDefaultFilter(location, idUser, { ...filterOp, filterValue: { nmSort: nmSort } }, 'channel');
		dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { ...newOptions, nmSort: nmSort }, true, true));
	};

	//filter config starts HERE ----------------------------------------------
	const { playbookFilterTypes, lcFilterTypes } = groupOptions;

	const { contents, channels, isLoadingContents, isLoadingChannels } = props;

	const onFilterChangeChannel = (filterValues) => {
		dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { ...options, ...filterValues }, true, true));
	};
	const onFilterChangeContent = (filterValues) => {
		dispatch(getContentList(LIST_LIMIT_DEFAULT, 0, { ...newOptions, ...filterValues }, true, true));
	};

	useEffect(
		() => {
			FilterManager.getDefaultFilterValue(location, idUser, 'channel').then((filterValue) => {
				dispatch(
					getChannelList(
						LIST_LIMIT_DEFAULT,
						0,
						{
							nmSort: 'keyCtContentState',
							isPlaybook: true,
							headerMessage: 'Playbook',
							...filterValue
						},
						true
					)
				);
			});
		},
		[ location.pathname ]
	);

	useEffect(
		() => {
			FilterManager.getDefaultFilterValue(location, idUser, 'content').then((filterValue) => {
				setFilterOp(filterValue);
				dispatch(
					getContentList(
						LIST_LIMIT_DEFAULT,
						0,
						{
							nmSort: 'keyCtContentState',
							...filterValue,
							isPlaybook: true,
							headerMessage: 'Playbook',
							isActiveChannel: true
						},
						true,
						undefined
					)
				);
			});
		},
		[ location.pathname ]
	);

	return (
		<div className="home-dashboard-screen">
			<ChannelStoriesContainer />
			<div className="list-toolbar">
				<ListHeaderTitle title={Translation.homeContent} />
				<FilterContainerLite
					nmFilter={'content'}
					onFilterChange={onFilterChangeContent}
					options={lcFilterTypes}
				/>
				<ButtonGroup className="button-group" size="small" aria-label="small outlined button group">
					<Button onClick={() => setContentOptions({ nmSort: 'dhLastConversion' })}>
						{Translation.contentLastConversion}
					</Button>
					<Button onClick={() => setContentOptions({ nmSort: 'keyCtContentState' })}>
						{Translation.featured}
					</Button>
				</ButtonGroup>
			</div>
			<ContentListHorizontalContainer height={350} data={contents} isLoading={isLoadingContents} />
			<div className="list-toolbar">
				<ListHeaderTitle title={Translation.homeChannel} />
				<FilterContainerLite
					nmFilter={'channel'}
					onFilterChange={onFilterChangeChannel}
					options={playbookFilterTypes}
				/>
				<ButtonGroup className="button-group" size="small" aria-label="small outlined button group">
					<Button onClick={() => setChannelOptions({ nmSort: 'dhLastConversion' })}>
						{Translation.channelLastConversion}
					</Button>
					<Button onClick={() => setChannelOptions({ nmSort: 'keyCtContentState' })}>
						{Translation.featured}
					</Button>
				</ButtonGroup>
			</div>
			<ChannelListHorizontalContainer
				history={history}
				height={205}
				data={channels}
				isLoading={isLoadingChannels}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	canPostSeChannel: state.user.canPostSeChannel,
	options: state.channelList.options
});

export default withRouter(connect(mapStateToProps)(HomeDashboardScreen));
