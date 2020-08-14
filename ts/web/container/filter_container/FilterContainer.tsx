import * as React from 'react';
import { AdvancedFilterInput, Sort } from 'web/stories/component/filter/Filter';
import { AdvancedFilterModal } from '../../stories/component/filter/AdvancedFilterModal';
import { useSelector, useDispatch } from 'react-redux';
import {
	getFilterTagData,
	getFilterPublisherData,
	getFilterGroupData,
	getFilterCtContentData,
	getFilterChannelData
} from 'app-core/redux_store/filter/Actions';
import useReactRouter from 'use-react-router';
import { FilterManager } from 'web/native/FilterManager';
import { IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const initialState: any = { nmSort: 'keyCtContentState' };

const loadGroupFilter = (advancedOptions, dispatch, filter) => {
	advancedOptions.map((option) => {
		if (option.value === 'arIdTag' && !filter['tags']) {
			dispatch(getFilterTagData({}));
		} else if (option.value === 'arIdGroup' && !filter['groups']) {
			dispatch(getFilterGroupData({}));
		} else if (option.value === 'arIdPublisher' && !filter['users']) {
			dispatch(getFilterPublisherData({}));
		} else if (option.value === 'arCtContent' && !filter['ctContent']) {
			dispatch(getFilterCtContentData({}));
		} else if (option.value === 'arIdChannel' && !filter['channels']) {
			dispatch(getFilterChannelData({}));
		}
	});
};

const normalizeData = (filterData) => {
	const toFilter = {};
	Object.keys(filterData).map((key) => {
		if (filterData[key]) {
			toFilter[key] = filterData[key].map((item) => item.value);
		}
	});
	return toFilter;
};

const setDefaults = (
	setFilterValue,
	setKeySearch,
	setSearch,
	setAdvancedFilter,
	defaultSearch,
	options,
	defaultSort
) => {
	if (defaultSearch) {
		setFilterValue(defaultSearch.filterValue || initialState);
		setKeySearch(defaultSearch.keySearch || (options[0] && options[0].value));
		setSearch(defaultSearch.search || '');
		setAdvancedFilter(defaultSearch.advancedFilter || {});
	} else {
		setFilterValue({ ...initialState, nmSort: defaultSort });
		setKeySearch(options[0] && options[0].value);
		setSearch('');
		setAdvancedFilter({});
	}
};

let timeout;

const FilterContainer = ({ onFilterChange, options, advancedOptions, sortOptions, defaultSort, canSort = false }) => {
	const [ showSearch, setShowSearch ] = React.useState(false);
	const { location } = useReactRouter();
	const idUser = useSelector((state) => state.user.idUser);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();
	const [ filterValue, setFilterValue ] = React.useState({ ...initialState, nmSort: defaultSort });
	const [ keySearch, setKeySearch ] = React.useState();
	const [ search, setSearch ] = React.useState();
	const [ advancedFilter, setAdvancedFilter ] = React.useState({});

	const onFilter = (values) => {
		if (onFilterChange) {
			onFilterChange(values);
		}
	};

	const clearFilter = () => {
		setDefaults(setFilterValue, setKeySearch, setSearch, setAdvancedFilter, undefined, options, defaultSort);
		doFilter(initialState, true, {
			filterValue: { ...filterValue },
			search: '',
			keySearch: options[0] && options[0].value,
			advancedFilter: {}
		});
		setShowSearch(false);
	};

	const doFilter = (data, isInstantFilter, values) => {
		setFilterValue(data);
		if (isInstantFilter) {
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(() => onFilter(data), 500);
		}
		FilterManager.setDefaultFilter(location, idUser, {
			filterValue: data,
			keySearch,
			search,
			advancedFilter,
			...values
		});
	};

	const onEnter = (value) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		const data = { nmSort: filterValue.nmSort, filter: { [keySearch]: value } };
		setSearch(value);
		setFilterValue(data);
		onFilter(data);
		FilterManager.setDefaultFilter(location, idUser, {
			filterValue: data,
			keySearch,
			search: value,
			advancedFilter
		});
	};

	React.useEffect(
		() => {
			FilterManager.getDefaultFilter(location, idUser).then((defaultSearch) => {
				setDefaults(
					setFilterValue,
					setKeySearch,
					setSearch,
					setAdvancedFilter,
					defaultSearch,
					options,
					defaultSort
				);
			});
		},
		[ location.pathname, location.state, options, advancedOptions ]
	);

	React.useEffect(
		() => {
			loadGroupFilter(advancedOptions, dispatch, filter);
		},
		[ showSearch ]
	);

	const onSortChange = (value) => {
		const data = { ...filterValue, nmSort: value };
		doFilter(data, true, { filterValue: data });
	};

	const onChange = (value) => {
		setSearch(value);
		const data = { nmSort: filterValue.nmSort, filter: { [keySearch]: value } };
		doFilter(data, true, { filterValue: data, search: value });
	};

	const onTypeChange = (key) => {
		setKeySearch(key);
		const data = { nmSort: filterValue.nmSort, filter: { [key]: search } };
		doFilter(data, search, { filterValue: data, keySearch: key });
	};

	const onAdvancedChange = (advancedFilterValues) => {
		setAdvancedFilter(advancedFilterValues);
		const data = { nmSort: filterValue.nmSort, filter: { ...filterValue, ...normalizeData(advancedFilterValues) } };
		doFilter(data, true, { filterValue: data, advancedFilter: advancedFilterValues });
	};

	const hasFilter = (advancedFilter && Object.entries(advancedFilter).length > 0) || search;

	return (
		<div className="filter-container">
			{!showSearch && (
				<IconButton
					onClick={() => setShowSearch(true)}
					className={`filter-icon ${hasFilter ? 'filtered' : ''}`}
				>
					<Search />
				</IconButton>
			)}
			{showSearch && (
				<div id="filter-slide">
					<div id="slide">
						<AdvancedFilterInput
							keySearch={keySearch}
							onChange={(event) => onChange(event.target.value)}
							onTypeChange={onTypeChange}
							options={options}
							search={search}
							onEnter={onEnter}
						/>
						<AdvancedFilterModal
							clearFilter={clearFilter}
							search={search}
							defaultAdvancedFilterValues={advancedFilter}
							filter={filter}
							onAdvancedChange={onAdvancedChange}
							advancedOptions={advancedOptions}
						/>
					</div>
				</div>
			)}
			{canSort && (
				<Sort onSortChange={onSortChange} value={filterValue.nmSort || defaultSort} sortOptions={sortOptions} />
			)}
		</div>
	);
};

export default FilterContainer;
