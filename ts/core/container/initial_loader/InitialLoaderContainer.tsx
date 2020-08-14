import * as React from "react";
import { TransitionScreen } from "screens";
import { I18n, KeyEnum } from "salesfy-shared";
import Authentication from 'app-core/boot/Authentication';
import { connect } from "react-redux";

interface IProps {
	loggedOut?: boolean;
	dispatch: any;
	navigation: any;
}

class InitialLoaderContainer extends React.Component<IProps> {

	constructor(props){
		super(props);
	}

	public componentWillMount() {
		const { loggedOut, navigation } = this.props;
		if(!loggedOut){
			Authentication.initAuthentication();
		} else {
			if(navigation){
				navigation.navigate({ routeName: "Login" });
			}
		}
	}

	public render() {
		return <TransitionScreen infoText={I18n.t(KeyEnum.loading)}/>;
	}
}

const mapStateToProps = state => ({
	loggedOut: state.user.loggedOut
});

export default connect(mapStateToProps)(InitialLoaderContainer);
