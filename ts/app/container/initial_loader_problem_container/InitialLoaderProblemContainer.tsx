
import * as React from "react";
import { InfoScreen } from "app/stories/screen/transition_screen/TransitionScreen";
import { connect } from "react-redux";
import { Linking, Platform } from 'react-native';
import authentication from "app-core/boot/Authentication";
import { HATCHERS_SITE_LINK, IOS_LINK, ANDROID_LINK } from "root/envVars";

interface IProps {
	type: number;
	errorTitle?: string;
	errorMessage: string;
	buttonText?: string;
	linkText?: string;
	dispatch: any;
	navigation: any;
}

class InitialLoaderProblemContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.reloadApp = this.reloadApp.bind(this);
		this.goToContact = this.goToContact.bind(this);
		this.goToStore = this.goToStore.bind(this);
	}

	public reloadApp() {
		const { navigation } = this.props;
		navigation.navigate('Loader');
		authentication.initAuthentication();
	}

	public goToContact() {
		Linking.openURL(HATCHERS_SITE_LINK)
	}

	public goToStore() {
		if (Platform.OS === "ios") {
			Linking.openURL(IOS_LINK)
		} else {
			Linking.openURL(ANDROID_LINK)
		}
	}

	public getByType() {
		const { type } = this.props;

		switch (type) {
			case 0:
				return { linkPress: this.goToContact, buttonAction: this.reloadApp}
			case 1:
				return { linkPress: this.goToContact, buttonAction: this.reloadApp}
			case 2:
				return { buttonAction: this.goToStore}
			default:
				return {};
		}

	}

	public render() {
		const { errorTitle, errorMessage, buttonText, linkText } = this.props;
		const { buttonAction, linkPress } = this.getByType();

		return (
			<InfoScreen
				errorTitle={errorTitle}
				errorMessage={errorMessage}
				buttonText={buttonText}
				buttonAction={buttonAction}
				linkText={linkText}
				linkPress={linkPress}
			/>
		);
	}
}

const mapStateToProps = state => ({
	type: state.app.type,
	errorTitle: state.app.errorTitle,
	errorMessage: state.app.errorMessage,
	buttonText: state.app.buttonText,
	buttonAction: state.app.buttonAction,
	linkText: state.app.linkText,
	linkPress: state.app.linkPress,
});

export default connect(mapStateToProps)(InitialLoaderProblemContainer);
