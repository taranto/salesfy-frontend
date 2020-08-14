import React from "react";
import AbstractEditableField from './AbstractEditableField';
import { IconButton } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import { CircularLoader } from "web/stories/component";

class EditableTextField extends AbstractEditableField {

	constructor(props) {
		super(props);

		this.onBlurInput = this.onBlurInput.bind(this)
	}

	public editableLabel(input, placeholder) {
		const { meta: { error, visited, touched } } = this.props;

		return (
			<>
				<a onClick={() => this.setEditable(true)} href="#">
					<input
						type="text"
						ref={ref => this.textArea = ref}
						className={`fake-field fake-text-field ${(error && (visited || touched)) && 'error-field'}`}
						placeholder={placeholder}
						{...input}
						onChange={this.onChange}
						onBlur={this.onBlurInput}
						disabled={true}
					/>
				</a>
				{this.getSubmit()}
			</>
		)
	}

	public getSubmit() {
		const { onSubmitItem, submitIcon, isLoading } = this.props;
		const item = isLoading ? <CircularLoader style={{ height: 27, width: 27 }} /> : (submitIcon ? submitIcon : <Send />)
		return onSubmitItem && <IconButton className="submit-input" onClick={!isLoading && onSubmitItem}>{item}</IconButton>
	}

	public onBlurInput() {
		const { input } = this.props;
		if (input && input.onBlur) {
			input.onBlur();
		}

		this.setEditable(false)
	}

	public editableInput(input, placeholder) {
		const { meta: { error, visited, touched } } = this.props;
		return (
			<>
				<input
					type="text"
					ref={ref => this.textArea = ref}
					className={`field text-field ${(error && (visited || touched)) && 'error-field'}`}
					placeholder={placeholder}
					{...input}
					onChange={this.onChange}
					onBlur={this.onBlurInput}
				/>
				{this.getSubmit()}
			</>
		)
	}
}

// actionAwait(

export default EditableTextField;
