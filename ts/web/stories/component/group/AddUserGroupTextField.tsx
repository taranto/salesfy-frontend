import React from 'react';
import { CloseButton } from 'web/stories/component/button/Button';
import Autosuggest from 'react-autosuggest';
import { UserComboSuggestion } from 'web/stories/component/user/User';
import { connect } from "react-redux";
import { getUserNetworkData } from "app-core/redux_store/user/Actions";
import { ValHN, StringUtil } from 'salesfy-shared';
import { getUser } from 'app-core/communication/ask/Ask';
import Alert from 'web/native/Alert';


interface IProps {
	focusOnMount?: boolean;
	onBlur?: any;
	submit?: any;
	users: any[];
	dispatch: any;
	userByEmail: any;
	placeholder: string;
	excludeIds: number[];
	items;
	setToggleOffAddUserGroup
}

interface IState {
	value: any,
	suggestions: any,
}
class AddUserGroupTextField extends React.Component<IProps, IState> {
	public static defaultProps = {
		focusOnMount: true
	}
	public inputRef;
	public timeout;

	constructor(props) {
		super(props);

		this.state = {
			value: '',
			suggestions: [],
		};

		this.onKeyPress = this.onKeyPress.bind(this);
		this.handleCancelComponentEdit = this.handleCancelComponentEdit.bind(this);
	}

	public componentDidMount() {
		const { dispatch, users } = this.props;
		this.focusInItem();
		if(!users || users.length === 0){
			dispatch(getUserNetworkData());
		}
		return this.turnOffEditComponent()
	}

	public handleCancelComponentEdit = () => {
		setTimeout(()=> {
			const deactivate = () => {
				this.props.setToggleOffAddUserGroup(true)
			}

			deactivate()
		} ,400)

	}

	public turnOffEditComponent() {
		const setParentEditComponent = () => {
			this.props.setToggleOffAddUserGroup(true)
		}

		this.focusInItem();
		document.onkeydown = function(evt) {
			const keyboardEvent = evt.key
			if (keyboardEvent == 'Escape') {
				setParentEditComponent()
			}
		};
	}

	public focusInItem() {
		const { focusOnMount } = this.props;
		if (this.inputRef && focusOnMount) {
			this.inputRef.focus();
		}
	}

	public onChange = (_event, { newValue }) => {
		this.setState({
			value: newValue
		});
	};

	public onSuggestionSelected = (_event, data) => {
		this.props.submit(data.suggestion);
	};

	public isInExcludeArray(idUser) {
		return this.props.excludeIds.indexOf(idUser) !== -1;
	}


	public onSuggestionsFetchRequested = async ({ value }) => {
		const { users } = this.props;
		const arUserInNetwork = users
		const emUser = value.trim().toLowerCase();
		const inputLength = emUser.length;

		const arUserAvailable = arUserInNetwork ?
			arUserInNetwork.filter(lang =>
				!this.isInExcludeArray(lang.idUser) && (lang.nmUser && lang.nmUser.toLowerCase().includes(emUser) || (lang.emUser && lang.emUser.toLowerCase().includes(emUser))))
			: [];

		if (arUserAvailable.length === 0) {
			if (ValHN.valNmKey('emUser', emUser)) {
				const arUser = await getUser({ emUser });

				if (arUser.length > 0) {
					const user = arUser[0];
					if (!user.emUser) {
						user.emUser = emUser
					}
					if (!this.isInExcludeArray(user.idUser)) {
						arUserAvailable.push(user);
					}
				} else {
					arUserAvailable.push({ nmUser: emUser, emUser, isInvite: true });
				}
			}
		}

		this.setState({
			suggestions: inputLength === 0 || !arUserAvailable ? [] : arUserAvailable
		});
	};

	public getSuggestionValue = (suggestion) => {
		return suggestion.emUser ? suggestion.emUser : suggestion.nmUser;
	}

	public onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

	public onKeyPress(event) {
		const isEnterPress = event.type === "keypress" && event.key === "Enter"
		if (!isEnterPress) {
			return
		}
		const hasSuggestionsAvailable = this.state && this.state.suggestions && this.state.suggestions.length > 0
		const nmValueInput = this.state.value
		let isWellWrited = StringUtil.isEmail(nmValueInput)
		if (hasSuggestionsAvailable && !isWellWrited) {
			const nmHighlightedSuggestion = this.state.suggestions[0].emUser
			isWellWrited = StringUtil.isEmail(nmHighlightedSuggestion)
		}
		if (!hasSuggestionsAvailable && !isWellWrited) {
			event.preventDefault()
			Alert.warn("É preciso um email válido para convidar novos usuários para a equipe")
		} else if (!hasSuggestionsAvailable && isWellWrited) {
			const { users } = this.props;
			const arUserAlreadyInGroup : any[] = users
			const userAlreadyInGroupFound = arUserAlreadyInGroup.find(anUser => anUser.emUser.toLowerCase() === nmValueInput.toLowerCase())
			if (userAlreadyInGroupFound) {
				event.preventDefault()
				Alert.warn("Este usuário já faz parte da equipe")
			}
		}
	}

	public render() {
		const { placeholder } = this.props;
		const { value, suggestions } = this.state;

		const inputProps = {
			placeholder,
			value,
			onChange: this.onChange,
			onKeyPress : this.onKeyPress
		};

		return (
			<div style={{display:"flex", flexDirection:"row"}}>
				<CloseButton onClick={this.handleCancelComponentEdit}/>
				<Autosuggest
					ref={autosuggest => {
						if (autosuggest) {
							this.inputRef = autosuggest.input
						}
					}}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					onSuggestionSelected={this.onSuggestionSelected}
					getSuggestionValue={this.getSuggestionValue}
					renderSuggestion={UserComboSuggestion}
					inputProps={inputProps}
					alwaysRenderSuggestions={true}
					highlightFirstSuggestion={true}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	users: state.user.availableUsers,
	items: state.group.items,
});

export default connect(mapStateToProps)(AddUserGroupTextField);

