import React from 'react';
import { connect } from "react-redux";
import { GoogleDrive } from '../../stories/component/google-drive/GoogleDrive';

interface IGoogleDriveContainer {
	dispatch: any;
	onSave: (arIdFile, joToken) =>  void;
}

class GoogleDriveIntegrationContainer extends React.Component<IGoogleDriveContainer> {
	constructor(props) {
		super(props);
	}

	public render() {
		return (
			<GoogleDrive onSave={this.props.onSave}/>
		)
	}
}

export default connect()(GoogleDriveIntegrationContainer);
