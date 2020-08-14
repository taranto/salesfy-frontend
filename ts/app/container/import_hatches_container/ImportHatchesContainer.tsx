import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm } from "redux-form";
import { insertImportContent } from "app-core/redux_store/content/Actions";
import ImportHatchScreen from "app/stories/screen/import_hatch_screen/ImportHatchScreen";
import { CtPlatform, I18n, KeyEnum } from "salesfy-shared";
import { getLinkLabel } from "app/stories/component/hatch/Hatch";
import { fireSuccessMessage } from "app/stories/component/toast/Toast";

interface IProps {
	dispatch: any
	navigation: any,
	lkPlatformProfile?: any,
	user: any;
}

interface IState {
	currentPosition: number;
	hasBack: boolean;
	hasNext: boolean;
	errorMessage?: string;
	[key: string]: any;
}

class ImportHatchesContainer extends React.Component<IProps, IState> {

	constructor(props) {
		super(props)

		this.onBack = this.onBack.bind(this);
		this.next = this.next.bind(this);
		this.back = this.back.bind(this);
		this.onPublish = this.onPublish.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.onStepPress = this.onStepPress.bind(this);

		this.state = {
			currentPosition: 0,
			hasBack: false,
			hasNext: true,
			ctPlatform: CtPlatform.facebook.keyCtPlatform
		}
	}

	public onStepPress(position){
		const { currentPosition } = this.state;
		if(position < currentPosition){
			this.setState({ currentPosition: position, hasNext: true, hasBack: position > 0, errorMessage: undefined })
		} else if(position > currentPosition){
			this.next();
		}
	}

	public onBack() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	public next() {
		const { currentPosition } = this.state;

		const newCurrentPosition = currentPosition + 1;
			this.setState({ currentPosition: newCurrentPosition, hasBack: true, hasNext: newCurrentPosition < 1 })
	}

	public back() {
		const { currentPosition } = this.state;
		const newCurrentPosition = currentPosition - 1;
		this.setState({ currentPosition: newCurrentPosition, hasNext: true, hasBack: newCurrentPosition > 0 })
	}

	public onValueChange(key: string, value: any) {
		this.setState({ [key]: value });
	}

	public onPublish() {
		const { dispatch, lkPlatformProfile } = this.props;
		const { ctPlatform } = this.state;

		if(lkPlatformProfile){
			const link = `${getLinkLabel(ctPlatform)}${lkPlatformProfile}`;
			dispatch(insertImportContent({ lkPlatformProfile: link })).then(success => {
				if(success){
					fireSuccessMessage(I18n.t(KeyEnum.importContentSuccessFul));
				}
			});
		} else {
			this.setState({errorMessage: I18n.t(KeyEnum.nmKeyRequired, {nmKey: "Link"})})
		}

	}

	public render() {
		const { navigation, lkPlatformProfile } = this.props;
		const { hasNext, hasBack, currentPosition, ctPlatform, errorMessage } = this.state;

		const item = {
			hasNext, hasBack, currentPosition, errorMessage,
			navigation
		}

		return (
			<ImportHatchScreen
				{...item}
				back={this.back}
				next={this.next}
				onBack={this.onBack}
				onPublish={this.onPublish}
				lkPlatformProfile={lkPlatformProfile}
				ctPlatform={ctPlatform}
				onValueChange={this.onValueChange}
				errorMessage={errorMessage}
				onStepPress={this.onStepPress}
			/>
		);
	}
}

const importContainer = reduxForm({
	form: "hatchImportForm"
})(ImportHatchesContainer);

const mapStateToProps = state => ({
	showNewHatch: state.home.showNewHatch,
	user: state.user,
	...formValueSelector("hatchImportForm")(state, "lkPlatformProfile", "")
});

export default connect(mapStateToProps)(importContainer);
