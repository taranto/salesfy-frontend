import React from 'react';
import { SettingsMenu } from 'web/stories/component';
import { connect } from "react-redux";
import { logout } from 'app-core/redux_store/user/Actions';

interface IProps {
	open: boolean,
	dispatch: any,
	handleClose: () => void
}

class SettingsMenuContainer extends React.Component<IProps> {

	constructor(props) {
		super(props)

		this.doLogout = this.doLogout.bind(this);
	}

	public doLogout(){
		const { dispatch } = this.props;
		dispatch(logout());
	}

	public render() {
		return (
			<SettingsMenu
				doLogout={this.doLogout}
			/>
		);
	}
}

export default connect()(SettingsMenuContainer);
