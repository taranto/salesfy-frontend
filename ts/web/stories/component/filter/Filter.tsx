import React from 'react';
import { Input } from '@material-ui/core';
import { Search, SortOutlined } from '@material-ui/icons';
import Select, { components } from 'react-select';

export const FilterInput = (props) => {
	return (
		<div className="filter">
			<Search />
			<Input
				placeholder="Buscar"
				margin="normal"
				{...props}
			/>
		</div>
	)
}

export const AdvancedFilterInput = ({ onTypeChange, search, onChange, keySearch, options, onEnter }) => {
	return (
		<div className="filter">
			<>
				<Search />
				<Input
					autoFocus={true}
					placeholder="Buscar"
					onChange={onChange}
					onKeyPress={(e) => {
						return e.which === 13 && onEnter(search)
					}}
					value={search}
				/>
			</>
			<Select
				className="select type"
				onChange={(data) => onTypeChange(data.value)}
				value={options.filter((item) => item.value === keySearch)}
				defaultValue={options[0]}
				options={options}
				isSearchable={false}
			/>
		</div>
	)
}

const SelectContainer = ({ children, ...props }) => {
	return (
		<components.SelectContainer {...props}>
			<SortOutlined />
			{children}
		</components.SelectContainer>
	);
};

export const Sort = ({ onSortChange, value, sortOptions }) => {
	return (
		<Select
			components={{ SelectContainer }}
			className="sort-select"
			onChange={(data) => onSortChange(data.value)}
			// value={sortOptions.filter((item) => item.value === defaultSort)}
			value={sortOptions.filter((item) => item.value === value)}
			options={sortOptions}
			isSearchable={false}

		/>
	)
}


