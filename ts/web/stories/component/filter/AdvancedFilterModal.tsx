import React, { useEffect } from 'react';
import SimpleModal from 'web/stories/component/modal/Modal';
import EditableCombobox from 'web/stories/component/editable-field/EditableCombobox';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';
import { IconButton, Tooltip } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSelector } from 'react-redux';

export const FilterModal = ({ initialize, defaultAdvancedFilterValues, onAdvancedChange, advancedOptions, filter, search, clearFilter }) => {
	const form = useSelector(state => state.form)

	useEffect(() => {
		initialize(defaultAdvancedFilterValues);
	}, [defaultAdvancedFilterValues])

	const onClickSuccess = () => {
		const filterData = form['filter-modal'] ? form['filter-modal'].values : {};
		onAdvancedChange(filterData);
	}

	const hasFilter = defaultAdvancedFilterValues && Object.entries(defaultAdvancedFilterValues).length > 0;

	return (
		<>
			<SimpleModal
				title={"Filtro avançado"}
				className={"filter"}
				confirmButtonText="Filtrar"
				Button={(props) => (
					<Tooltip title={hasFilter ? "Filtro aplicado" : "Filtro avançado"}>
						<IconButton onClick={props.onClick} className={`filter-icon ${hasFilter ? "filtered" : ""}`}>
							<img src={hasFilter ? require('assets/filterSetted.png') : require('assets/filter.png')}/>
						</IconButton>
					</Tooltip>
				)}
				onClickSuccess={onClickSuccess}
			>
				<div style={{ marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 20 }}>
					{advancedOptions.map(option => {
						return (
								<Field
									key={option.value}
									name={option.value}
									title={option.label}
									placeholder={`Selecione ${option.label}`}
									options={filter[option.fieldOption]}
									onValueChange={() => { }}
									component={EditableCombobox}
								/>
						)
					})}
				</div>
			</SimpleModal>
			{(hasFilter || search) && <Tooltip title={"Limpar filtro"}>
				<IconButton className={`filter-icon`} onClick={clearFilter}>
					<Close />
				</IconButton>
			</Tooltip>}
		</>
	)
}

export const AdvancedFilterModal = reduxForm({
	form: "filter-modal"
})(FilterModal);
