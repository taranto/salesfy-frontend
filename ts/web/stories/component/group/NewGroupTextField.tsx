import React from 'react';
import { TextField } from '@material-ui/core';
import { CloseButton } from 'web/stories/component/button/Button';


interface IProps {
	placeholder?: string;
	focusOnMount?: boolean;
	defaultValue?: any;
	onBlur: any;
	submit?: any;
}

interface IState {
	value: any,
	suggestions: any,
}
class NewGroupTextField extends React.Component<IProps, IState> {
	public static defaultProps = {
		focusOnMount: true
	}
	public inputRef;
	public timeout;

	constructor(props) {
		super(props);

		this.state = {
			value: this.props.defaultValue,
			suggestions: [],
		};

		this.onKeyPress = this.onKeyPress.bind(this);
	}

	public componentDidMount() {
		return this.turnOffEditComponent()
	}

	public handleCancelComponentEdit = () => {
		setTimeout(()=> {
			this.props.onBlur()
		} ,400)

	}

	public turnOffEditComponent() {
		const setOnBlur = () => {
			this.props.onBlur()
		}

		this.focusInItem();
		document.onkeydown = function(evt) {
			const keyboardEvent = evt.key
			if (keyboardEvent == 'Escape') {
				setOnBlur()
			}
		};
	}

	public focusInItem() {
		const { focusOnMount } = this.props;
		if (this.inputRef && focusOnMount) {
			this.inputRef.focus();
		}
	}

	public onChange = (event) => {
		this.setState({
			value: event.target.value
		});
	};

	public onSubmitCapture = () => {
		const value = this.state.value
		var submit = this.props.submit

		if (this.timeout) {
			clearTimeout(this.timeout)
		}

		this.timeout = setTimeout(() => {
			if (value != null && value !== "") {
				submit(value);

				setTimeout(()=>{
					this.handleCancelComponentEdit()
				}, 400)
			};

		}, 400)
	};

	public onKeyPress(event) {
		if (event.key === 'Enter') {
			this.onSubmitCapture();
		} else if (event.key === 'Escape') {
			event.preventDefault();
			this.props.onBlur()
		}
	}

	public render() {
		const { placeholder } = this.props;
		const { value } = this.state;
		return (
			<div className='new-group-combo-container'>
				<div className='new-group-combo' style={{display:"flex", flexDirection:"row"}}>
					<CloseButton onClick={this.handleCancelComponentEdit}/>
					<TextField
						inputRef={ref => this.inputRef = ref}
						placeholder={placeholder}
						className="name-combo"
						value={value}
						onChange={this.onChange}
						onSubmit={this.onSubmitCapture}
						onBlur={this.props.onBlur}
						onKeyDown={this.onKeyPress}
					/>
				</div>
				<div className='window-blur'/>
			</div>
		);
	}
}

export default NewGroupTextField;
