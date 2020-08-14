import React, { useEffect, useState, useMemo } from 'react';
import { ChannelList } from 'components';
import { connect } from 'react-redux';
import { getChannelList } from 'app-core/redux_store/channel/Actions';
import { LIST_LIMIT_DEFAULT } from 'root/envVars';
import { withRouter } from 'react-router-dom';
import ScreenToolbar from 'web/container/screen_toolbar/ScreenToolbar';
import { ListHeaderTitle } from 'web/stories/component';
import { NewButton } from 'web/stories/component/button/Button';
import FilterContainer from 'web/container/filter_container/FilterContainer';
import { useDispatch, useSelector } from 'react-redux';
import ChannelDetailsContainer from 'app-core/container/channel_details_container/ChannelDetailsContainer';
import { Translation } from 'app-core/utils/translate/Translation';
import { FilterManager } from 'web/native/FilterManager';

const sortOptions = [
	{ value: "nmChannel", label: Translation.name },
	{ value: "dhPublish", label: Translation.dhPublishInfo },
	{ value: "keyCtContentState", label: Translation.featured },
	{ value: "dhLastConversion", label: Translation.lastView },
]

const playbookFilterTypes: any = [
	{ value: 'dsSearch', label: Translation.all },
	{ value: 'nmChannel', label: Translation.name },
	{ value: 'dsChannel', label: Translation.description },
	{ value: 'nmGroup', label: Translation.group },
	{ value: 'nmPublisher', label: Translation.publisher },
];

const playbookAdvancedFilterTypes: any = [
	{ value: 'arIdGroup', label: Translation.groups, fieldOption: 'groups' },
	{ value: 'arIdPublisher', label: Translation.publishers, fieldOption: 'users' },
];

const lcFilterTypes: any = [
	{ value: 'dsSearch', label: Translation.all },
	{ value: 'nmChannel', label: Translation.name },
	{ value: 'dsChannel', label: Translation.description },
	{ value: 'nmTag', label: 'Tag' },
	{ value: 'nmPublisher', label: Translation.publisher },
];

const lcAdvancedFilterTypes: any = [
	{ value: 'arIdPublisher', label: Translation.publishers, fieldOption: 'users' },
	{ value: 'arIdTag', label: 'Tags', fieldOption: 'tags' },
];

const ChannelScreen = (props) => {
	const dispatch = useDispatch();
	const idUser = useSelector(state => state.user.idUser);
	const presentation = useSelector(state => state.app.presentation);
	const [openDetails, setOpenDetails] = useState({ open: false, params: {} });
	const [filterTypes, setFilterTypes] = useState([])
	const [advancedFilterTypes, setAdvancedFilterTypes] = useState([])
	const { options, location, canPostSeChannel, reloadList } = props;
	const hasAuthToAdd = location.state.isPlaybook || (!location.state.isPlaybook && canPostSeChannel);
	const channelProps = { ...props, canPostSeChannel: hasAuthToAdd, setOpenDetails }

	useEffect(() => {
		FilterManager.getDefaultFilterValue(location, idUser).then(filterValue => {
			if(location.state && location.state.filter){
				filterValue = {...filterValue, filter: location.state.filter};
			}
			
			if (location.state && location.state.isPlaybook) {				
				setFilterTypes(playbookFilterTypes);
				setAdvancedFilterTypes(playbookAdvancedFilterTypes);
				dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { isPlaybook: true, headerMessage: "Playbook", ...filterValue }, true))
			} else {
				setFilterTypes(lcFilterTypes);
				setAdvancedFilterTypes(lcAdvancedFilterTypes);
				dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { isPlaybook: false, headerMessage: "Learning Center", ...filterValue }, true))
			}
		});

	}, [location.pathname, location.state]);

	const onFilterChange = (filterValues) => {
		dispatch(getChannelList(LIST_LIMIT_DEFAULT, 0, { ...options, ...filterValues }, true, true));
	}

	const onNewChannel = () => {
		setOpenDetails({ open: true, params: { isPlaybook: location.state.isPlaybook } })
	}

	return useMemo(() => {
		return (
			<>
				<ChannelDetailsContainer reloadList={reloadList} openDetails={openDetails} setOpenModal={setOpenDetails} />
				<ScreenToolbar useBackHistory={true}>
					<ListHeaderTitle title={options && options.headerMessage} />
					<div className="right">
						<FilterContainer
							onFilterChange={onFilterChange}
							options={filterTypes}
							advancedOptions={advancedFilterTypes}
							canSort={true}
							sortOptions={sortOptions}
							defaultSort={location.state && location.state.isPlaybook ? "keyCtContentState" : "dhLastConversion"}
						/>
						{(hasAuthToAdd && !presentation) && <NewButton onClick={onNewChannel} placeholder={Translation.newChannel} />}
					</div>
				</ScreenToolbar>
				<div id="channel-list" className="screen-content">
					<ChannelList {...channelProps} />
				</div>
			</>
		)
	}, [props, openDetails, filterTypes, advancedFilterTypes, presentation])
}

const mapStateToProps = state => ({
	canPostSeChannel: state.user.canPostSeChannel,
	options: state.channelList.options
});

export default withRouter(connect(mapStateToProps)(ChannelScreen));
