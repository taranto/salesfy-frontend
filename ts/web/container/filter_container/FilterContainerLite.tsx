import * as React from 'react';
import { AdvancedFilterInput } from 'web/stories/component/filter/Filter';
import { useSelector } from 'react-redux';
import useReactRouter from 'use-react-router';
import { FilterManager } from 'web/native/FilterManager';
import { IconButton, Tooltip } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { Close } from '@material-ui/icons';

const initialState: any = { nmSort: 'keyCtContentState', filter: {} };

//in the useEffect
const setDefaults = (setFilterValue, setKeySearch, setSearch, defaultSearch, options) => {
	if (defaultSearch) {
		setFilterValue(defaultSearch.filterValue || initialState);
		setKeySearch(defaultSearch.keySearch || (options[0] && options[0].value));
		setSearch(defaultSearch.search || '');
	} else {
		setKeySearch(options[0] && options[0].value);
		setSearch('');
	}
};

let timeout;

const FilterContainerLite = ({ onFilterChange, options, nmFilter }) => {
	const [ showSearch, setShowSearch ] = React.useState(false);
	const { location } = useReactRouter();
	const idUser = useSelector((state) => state.user.idUser);
	const [ filterValue, setFilterValue ] = React.useState({ ...initialState });
	const [ keySearch, setKeySearch ] = React.useState();
	const [ search, setSearch ] = React.useState();

	const onFilter = (values) => {
		if (onFilterChange) {
			onFilterChange(values);
		}
	};

	const clearFilter = () => {
		setDefaults(setFilterValue, setKeySearch, setSearch, undefined, options);
		doFilter(initialState, true, {
			filterValue: initialState,
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
			timeout = setTimeout(() => onFilter(data), 800);
		}

		FilterManager.setDefaultFilter(
			location,
			idUser,
			{
				filterValue: data,
				keySearch,
				search,
				...values
			},
			nmFilter
		);
	};

	const onEnter = (value) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		const data = { nmSort: filterValue.nmSort, filter: { [keySearch]: value } };
		setSearch(value);
		setFilterValue(data);
		onFilter(data);
		FilterManager.setDefaultFilter(
			location,
			idUser,
			{
				filterValue: data,
				keySearch,
				search: value
			},
			nmFilter
		);
	};

	React.useEffect(
		() => {
			FilterManager.getDefaultFilter(location, idUser, nmFilter).then((defaultSearch) => {
				setDefaults(setFilterValue, setKeySearch, setSearch, defaultSearch, options);
			});
		},
		[ showSearch, location.pathname ]
	);

	const onChange = (value) => {
		setSearch(value);
		const data = { nmSort: filterValue.nmSort, filter: { [keySearch]: value } };
		doFilter(data, true, { filterValue: data, search: value });
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => onFilter(data), 800);
	};

	const onTypeChange = (key) => {
		setKeySearch(key);
		const data = { nmSort: filterValue.nmSort, filter: { [key]: search } };
		doFilter(data, true, { filterValue: data, keySearch: key });
	};

	const hasFilter = filterValue.length > 0 || search;

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
					</div>
				</div>
			)}
			{search && (
				<Tooltip title={'Limpar filtro'}>
					<IconButton className={`filter-icon`} onClick={clearFilter}>
						<Close />
					</IconButton>
				</Tooltip>
			)}
		</div>
	);
};

export default FilterContainerLite;
