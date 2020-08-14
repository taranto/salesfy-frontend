import * as React from "react";
import { connect } from "react-redux";
import { ChannelDetailsScreen } from 'screens';
import { reduxForm } from 'redux-form';
import { formValueSelector } from 'redux-form';
import { IChannelDetailsContainer } from "app-core/utils/interfaces";
import { addChannelData, copyChannelData, updateChannelData } from '../../redux_store/channel/Actions';
import validate from "./Validator"
import { touch, blur } from 'redux-form';
import Alert from 'native/Alert';
import { Translation } from 'app-core/utils/translate/Translation';
import { channelImportData } from 'app-core/redux_store/channel/Actions';
import { ScreenModalContainer } from "app-core/container/screen_modal_container/ScreenModalContainer";

class ChannelDetailsContainerComp extends React.Component<IChannelDetailsContainer, { updateLabel }> {

	constructor(props) {
		super(props);

		this.state = {
			updateLabel: undefined
		}

		this.saveData = this.saveData.bind(this);
		this.alertInvalid = this.alertInvalid.bind(this);
		this.onDriveImportContent = this.onDriveImportContent.bind(this);
	}

	public alertInvalid() {
		const { dispatch } = this.props;
		dispatch(touch('channel-details', 'nmChannel'));
		dispatch(blur('channel-details', 'nmChannel'));
		dispatch(touch('channel-details', 'piChannel'));
		dispatch(blur('channel-details', 'piChannel'));
	}

	public async onDriveImportContent(arJoFile, joToken) {
		try {
			const { idChannel } = this.props;
			const response = await channelImportData({ arJoFile, joToken: joToken.tokenObj, idChannel });
			if (response.status === 200) {
				Alert.success(Translation.importDriveSuccess);
			} else {
				Alert.error(Translation.importDriveError);
			}
		} catch (error) {
			Alert.error(Translation.importDriveError);
		}
	}

	public async saveData() :Promise<boolean>{
		const {
			valid, nmChannel, piChannel, idChannel, dsChannel, settedNewGroups,
			dispatch, change, isPlaybook, isCopy, idCopy, idCtChannelView,
			reloadList
		} = this.props;
		const arIdGroup : number[] = settedNewGroups ? settedNewGroups.map(item => item.value) : [];
		const newPiChannel = piChannel ? piChannel : undefined;
		let isSaved = false
		if (valid && newPiChannel) {
			if (idChannel) {
				const joParam = { nmChannel, piChannel, idChannel, dsChannel, idCtChannelView, arIdGroup }
				await dispatch(await updateChannelData(joParam))
				Alert.success(Translation.savedChannel)
				isSaved = true
				return isSaved
			} else {
				return dispatch(isCopy ?
					copyChannelData({ idChannel: idCopy, nmChannel, piChannel, dsChannel, isPlaybook, arIdGroup }) :
					addChannelData({ nmChannel, piChannel, dsChannel, isPlaybook, idCtChannelView, arIdGroup })
				).then(data => {
					change('idChannel', data.idChannel);

					Alert.success(Translation.addChannel);

					reloadList();
					isSaved = true
					return isSaved
				})
			}
		} else {
			this.alertInvalid();
			if(newPiChannel){
				Alert.error(Translation.insertRequiredFields)
			} else {
				Alert.error(Translation.imageRequired)
			}
		}
		return isSaved
	}

	public render() {
		const params = this.props.openDetails.params;
		return (
			<ScreenModalContainer
				id="channel-modal"
				className="channel-details"
				setOpen={this.props.setOpenModal}
				open={this.props.openDetails.open}
				title={params && params.nmChannel ? params.nmChannel : Translation.newChannel}
				data={{...this.props, ...this.state}}
			>
				<ChannelDetailsScreen
					setOpenModal={this.props.setOpenModal}
					saveData={this.saveData}
					onDriveImportContent={this.onDriveImportContent}
					params={params}
					{...this.props}
					{...this.state}
				/>
			</ScreenModalContainer>
		);
	}
}

const ChannelDetailsContainer = reduxForm({
	form: "channel-details",
	validate
})(ChannelDetailsContainerComp);

const mapStateToProps = state => ({
	isLoading: state.channelList.isLoading,
	idUser: state.user.idUser,
	nmUser: state.user.nmUser,
	options: state.group.comboItems,
	...formValueSelector("channel-details")(state, "idChannel", "idCopy", "nmChannel",
		"dsChannel", "piChannel", "isPlaybook", "oldGroups",
		"settedGroups", "settedNewGroups", "isCopy", "idCtChannelView"
	)
});

export default connect(mapStateToProps)(ChannelDetailsContainer);
