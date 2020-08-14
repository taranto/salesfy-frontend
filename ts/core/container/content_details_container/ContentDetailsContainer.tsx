import * as React from "react";
import { connect } from "react-redux";
import { ContentDetailsScreen } from 'screens';
import { reduxForm, formValueSelector } from 'redux-form';
import { IContentDetailsContainer } from "app-core/utils/interfaces";
import { getUserNetworkData } from "app-core/redux_store/user/Actions";
import validate from "./Validator"
import { actionAwait } from 'app-core/utils/delay_control/DelayControl';
import AbstractContentDetailsContainer from './AbstractContentDetailsContainer';

class ContentDetailsContainerComp extends AbstractContentDetailsContainer<IContentDetailsContainer> {

	constructor(props) {
		super(props);

		this.state = {}

		this.getLinkDetails = super.getLinkDetails.bind(this);
	}

	public componentWillMount(){
		super.componentWillMount();
		const { dispatch } = this.props;

		dispatch(getUserNetworkData())
	}

	public render() {
		const detailsProps = {
			saveData: actionAwait(this.saveData),
			getLinkDetails: this.getLinkDetails,
			...this.props,
			...this.state
		}
		return (
			<ContentDetailsScreen {...detailsProps} />
		);
	}
}

const ContentDetailsContainer = reduxForm({
	form: "content-details",
	validate
})(ContentDetailsContainerComp);

const mapStateToProps = state => ({
	isLoading: state.contentList.isLoading,
	idUser: state.user.idUser,
	users: state.user.availableUsers,
	nmUser: state.user.nmUser,
	channels: state.contentList.channelCombo,
	types: state.contentList.publishTypes,
	...formValueSelector("content-details")(state, "idContent", "nmContent", "dsContent", "piContent", "lkContent",
		"idTemplate", "ctContent", "isPlaybook", "oldChannels", "settedChannels", "settedNewChannels", "idPublisher")
});

export default connect(mapStateToProps)(ContentDetailsContainer);
