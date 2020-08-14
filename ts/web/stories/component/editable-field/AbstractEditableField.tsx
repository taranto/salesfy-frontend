import React from "react";

interface IProps {
	icon?: string;
	title?: string;
	image?:any;
	placeholder?:string;
	input:any;
	options: any[];
	onValueChange: any;
	onSubmitItem?: any;
	onBlur?: any;
	submitIcon?:any;
	meta: { error, visited, touched }
	isLoading?
}

interface IState {
	editable?: boolean;
}
abstract class AbstractEditableField<P = {}> extends React.Component<IProps & P, IState> {
	public textArea;
	public hasChange;

	constructor(props) {
		super(props);

		this.state = {
			editable: false
		}

		this.setEditable = this.setEditable.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	public setEditable(editable) {
		this.setState({ editable })
		if(editable){
			setTimeout(() => {
				if (this.textArea) {
					this.textArea.focus();
				}
			}, 200)
		} else {
			if(this.hasChange){
				this.props.onValueChange();
			}
		}
	}

	public onChange(value){
		const { input } = this.props;
		if(input.value !== value){
			input.onChange(value);
			this.hasChange = true;
		}
	}

	public abstract editableLabel(input, placeholder);

	public abstract editableInput(input, placeholder);

	public render() {
		const { icon, image, title, input, placeholder, meta: { error, visited, touched }} = this.props;
		const { editable } = this.state;

		return (
			<div className="editable-field" onFocus={() => this.setEditable(true)}>
				<div className="title">
					{icon && <i className="material-icons">{icon}</i>}
					{image && <img src={image}/>}
					{title && <h3>{title}</h3>}
					{(error && (visited || touched) && !editable) && <span className="error">{error}</span>}
				</div>
				<div className="editable">
					<p>
						{editable ? this.editableInput(input, placeholder) : this.editableLabel(input, placeholder)}
					</p>
				</div>
			</div>
		);
	}
}

export default AbstractEditableField;

/*
export const FormInput = (
	{ icon, label, autoCapitalize, secureTextEntry, onCancelPress, input, meta: { touched, error } }
) => {
	return (
		<View>
			<Item error={error && touched} style={styles.item}>
				<Icon active={true} name={icon} onPress={onCancelPress} />
				<Input
					placeholder={label}
					placeholderTextColor={"white"}
					secureTextEntry={secureTextEntry}
					autoCapitalize={autoCapitalize}
					style={styles.input}
					{...input}
				/>
			</Item>
			{(error && touched) && <Text style={styles.errorMessage}>{error}</Text>}
		</View>
	);
}
*/
