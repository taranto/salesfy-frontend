import React from "react";
import AbstractEditableField from 'web/stories/component/editable-field/AbstractEditableField';
import Select from 'react-select';

class EditableSelect extends AbstractEditableField<{multiValueContainer, option, className}> {

	constructor(props) {
		super(props);
	}

	public editableLabel(input, placeholder) {
		return <a onClick={() => this.setEditable(true)}>{this.getField(input, placeholder, true)}</a>
	}

	public getField(input, placeholder, disabled = false) {
		const { options, multiValueContainer, option, className, meta: { error, visited, touched } } = this.props;

		const components = {}

		if(multiValueContainer){
			components['MultiValueContainer'] = multiValueContainer;
		}

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
				value={input.value}
				isDisabled={disabled}
				onClick={() => disabled && this.setEditable(true)}
				onChange={this.onChange}
				onBlur={() => {
					this.setEditable(false);
					// input.onBlur(input.value)
				}}
			/>
		)
	}

	public editableInput(input, placeholder) {
		return this.getField(input, placeholder);
	}
}

export default EditableSelect;
