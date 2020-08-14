import React from "react";
import AbstractEditableField from 'web/stories/component/editable-field/AbstractEditableField';
import Select from 'react-select';
import { Chip } from '@material-ui/core';
import { Translation } from "app-core/utils/translate/Translation";

class EditableCombobox extends AbstractEditableField<{multiValueContainer, option, className}> {

	constructor(props) {
		super(props);
	}

	public editableLabel(input, placeholder) {
		const { option, className, meta: { error, visited, touched }} = this.props;

		return (
			<a href="#" style={{height: 54}} onClick={() => this.setEditable(true)}>
				
				<Select
						{...input}
						options={option}
						onClick={() => this.setEditable(true)}
						ref={ref => this.textArea = ref}
						className={`combo-field ${className} ${(error && (visited || touched)) && 'error-field'}`}
						classNamePrefix="combo-field"
						placeholder={placeholder}
						isMulti={true}
						value={input.value}
						isDisabled={true}
						onChange={this.onChange}
						onBlur={() => {
							this.setEditable(false);
							// input.onBlur(input.value)
						}}
						noOptionsMessage={()=>Translation.thereAreNoOptions}
				/>
			</a>
		)
	}

	public getChips(arrValues) {
		const {multiValueContainer} = this.props;
		return arrValues.map(data => {
			if(multiValueContainer){
				return multiValueContainer({data});
			}
			return <Chip key={data.value} label={data.label} className="chip" />
		})
	}

	public getField(input, placeholder, disabled = false) {
		const {options, option, className, meta: {error, visited, touched } } = this.props;

		const components = {}

		if(option){
			components['Option'] = option;
		}

		const extendProps = {components};
		return (
			<Select
				{...input}
				{...extendProps}
				options={options}
				ref={ref => this.textArea = ref}
				className={`combo-field ${className} ${(error && (visited || touched)) && 'error-field'}`}
				classNamePrefix="combo-field"
				placeholder={placeholder}
				isMulti={true}
				value={input.value}
				isDisabled={disabled}
				onClick={() => disabled && this.setEditable(true)}
				onChange={this.onChange}
				onBlur={() => {
					this.setEditable(false);
					// input.onBlur(input.value)
				}}
				noOptionsMessage={()=>Translation.thereAreNoOptions}
			/>
		)
	}

	public editableInput(input, placeholder) {
		return this.getField(input, placeholder);
	}
}

export default EditableCombobox;
