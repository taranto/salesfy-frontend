import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditableTextArea from 'web/stories/component/editable-field/EditableTextArea';
import EditableTextField from 'web/stories/component/editable-field/EditableTextField';
import EditableCombobox from 'web/stories/component/editable-field/EditableCombobox';
import { Field } from 'redux-form';
import { IChannelDetails } from 'app-core/utils/interfaces';
import { SaveCompleteButton } from 'web/stories/component/button/Button';
import { getGroupComboList } from 'app-core/redux_store/group/Actions';
import { normalizeCombo } from 'app-core/utils/Utils';
import { S3FileUpload } from 'web/utils/s3/UploadFile';
import { getChannelGroupData, getChannelById } from 'app-core/redux_store/channel/Actions';
import GoogleDriveIntegrationContainer from '../../../container/google_drive_integration_container/GoogleDriveIntegrationContainer';
import { CropPanel } from 'web/stories/component/picture-upload/CropPanel';
import ChannelSliderCarousel from 'web/stories/component/card-slider-carousel/ChannelSliderCarousel';
import { executeAwait } from 'app-core/utils/delay_control/DelayControl';
import { imageNameUtils } from 'app-core/utils/string/StringUtils';
import { CtChannelView } from 'salesfy-shared';
import { Translation } from 'app-core/utils/translate/Translation';
import { urlBase64ToBlob, getNmDefaultChannelImage } from '../../../utils/image/ImageUtils';
import { ImageSuggest } from 'web/stories/component/image_suggest/ImageSuggest';
import { getGroupCombo } from 'app-core/communication/ask/Ask';
import { AR_NM_DEFAULT_IMAGE_SUGGEST_CHANNEL } from 'root/envVars';

interface IState {
	hasChange
	imagePreviewUrl,
	currentSlide,
	arNmDefaultImage:string[]
	file?,
	imageToCrop?
}

class ChannelDetailsScreen extends React.Component<IChannelDetails, IState> {

	constructor(props) {
		super(props);

		this.state = {
			hasChange: false,
			imagePreviewUrl: undefined,
			currentSlide: 0,
			arNmDefaultImage: AR_NM_DEFAULT_IMAGE_SUGGEST_CHANNEL
		}

		this.save = this.save.bind(this);
		this.onCrop = this.onCrop.bind(this);
		this.toCropImage = this.toCropImage.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
		this.getTemplateAspectRatio = this.getTemplateAspectRatio.bind(this);
		this.setCurrentSlide = this.setCurrentSlide.bind(this);
		this.setFile = this.setFile.bind(this);
		this.onImageSuggestChange = this.onImageSuggestChange.bind(this);
		this.getNrSlidePositionIndex = this.getNrSlidePositionIndex.bind(this);
	}

	public toCropImage(imageToCrop, file) {
		this.setState({ imageToCrop, file })
	}

	public componentWillMount() {
		this.loadChannel();
		this.props.dispatch(getGroupComboList());
	}

	public getTemplateAspectRatio() {
		const { currentSlide } = this.state;

		const isWideScreen = CtChannelView.widescreen.key === this.getArJoAllCardTemplateData()[currentSlide].idCtChannelView;

		if (isWideScreen) {
			return 421 / 203;
		} else {
			return 141 / 203;
		}
	}

	public onChannelEdit(isCopy, idChannel, isPlaybook, channel) {
		const idCopy = idChannel;
		if (isCopy) {
			delete channel.idChannel;
		}
		const currentSlide = this.getNrSlidePositionIndex(channel)
		this.setCurrentSlide(currentSlide)
		this.props.initialize({ ...channel, idCopy, isPlaybook, currentSlide });
	}

	public async loadChannel() {
		const { params } = this.props;
		if (params) {
			if (params.idChannel) {
				const { idChannel, isPlaybook, isCopy } = params;
				this.onChannelEdit(isCopy, idChannel, isPlaybook, params);
				const channel = await getChannelById(idChannel);
				this.onChannelEdit(isCopy, idChannel, isPlaybook, channel);
				if (channel) {
					this.props.dispatch(getChannelGroupData(idChannel)).then(settedGroups => {
						const normSetted = normalizeCombo("idGroup", "nmGroup", settedGroups);
						this.props.change("settedGroups", settedGroups);
						this.props.change("settedNewGroups", normSetted)
					});
				}
			} else {
				this.props.initialize({ isPlaybook: params.isPlaybook ? true : false, idCtChannelView: CtChannelView.default.key, piChannel: getNmDefaultChannelImage() })
				const normSetted = await this.getDefaultArGroupSelected()
				this.props.change("settedNewGroups", normSetted)
			}
			this.setState({ hasChange: false })
		}
	}

	public getNrSlidePositionIndex(params?:{ idCtChannelView?:number} ): number {
		if (!params) {
			return 0
		}
		return params.idCtChannelView !== undefined ? params.idCtChannelView-1 : 0
	}

	public async getDefaultArGroupSelected(): Promise<any> {
		if (!this.props.location.state.filter) {
			return
		}
		const arIdGroupInFilter: number[] = this.props.location.state.filter.arIdGroup
		const joGroupCombo = await getGroupCombo()
		const arGroupCombo = joGroupCombo.items
		if (!arIdGroupInFilter) {
			const normalizedCombo = normalizeCombo("idGroup", "nmGroup", arGroupCombo)
			return normalizedCombo
		}
		const arGroupComboInFilter = arGroupCombo.filter(groupCombo => arIdGroupInFilter.includes(groupCombo.idGroup))
		const normalizedSet = normalizeCombo("idGroup", "nmGroup", arGroupComboInFilter)
		return normalizedSet
	}

	public setFile(file, imagePreviewUrl) {
		this.setState({ imagePreviewUrl })
		return file && S3FileUpload(file);
	}

	public save() {
		const { saveData } = this.props;
		saveData().then((isSaved:boolean) => {
			this.setState({ hasChange: false })
			if (isSaved) {
				this.props.setOpenModal(false)
			}
		});
	}

	public onValueChange() {
		this.setState({ hasChange: true })
	}

	public onCrop(cropper) {
		const { file } = this.state;
		const imagePreviewUrl = cropper.getCroppedCanvas().toDataURL();
		this.setState({ imageToCrop: undefined, imagePreviewUrl });

		const fileName = imageNameUtils(this.props.idUser, file.name);

		const blobFile = urlBase64ToBlob(imagePreviewUrl);

		if (blobFile) {
			const newFile = new File([blobFile], fileName);
			this.setFile(newFile, imagePreviewUrl);
			this.props.change('piChannel', fileName);
			executeAwait(this.onValueChange);
		}
	}

	public getArJoAllCardTemplateData() {
		const { nmChannel, dsChannel, piChannel } = this.props;
		const { imagePreviewUrl } = this.state;

		const cardDetails = {
			nmChannel, dsChannel, piChannel, imagePreviewUrl,
			hasPowerInItem: () => false
		}

		return [
			{
				...cardDetails, idCtChannelView: CtChannelView.default.key, info: Translation.traditional
			},
			{
				...cardDetails, idCtChannelView: CtChannelView.widescreen.key, info: Translation.widescreen
			}
		]
	}

	public setCurrentSlide(currentSlide) {
		this.setState({ currentSlide });
	}

	public onImageSuggestChange(piChannel) {
		this.props.change('piChannel', piChannel);
		executeAwait(this.onValueChange);
	}

	public render() {
		const { options, piChannel, idChannel, nmChannel } = this.props;
		const { hasChange, imagePreviewUrl, imageToCrop } = this.state;

		const aspectRatio = this.getTemplateAspectRatio();

		return (
			<>
				<div id="channel-details" className="channel-details details">
					<div className="form">
						<div className="row">
							<div className="col">
								{imageToCrop ?
									<CropPanel
										aspectRatio={aspectRatio}
										imageToCrop={imageToCrop}
										onCrop={this.onCrop}
									/> : <Field
										name="idCtChannelView"
										component={ChannelSliderCarousel}
										items={this.getArJoAllCardTemplateData()}
										imagePreviewUrl={imagePreviewUrl || piChannel}
										onValueChange={this.onValueChange}
										toCropImage={this.toCropImage}
										setCurrentSlide={this.setCurrentSlide}
										currentSlide={this.state.currentSlide}
										setFile={this.setFile}
										change={this.props.change}
									/>}
								<ImageSuggest
									onImageChange={this.onImageSuggestChange}
									dsSearchTerm={nmChannel}
									options={{ orientation: "vertical", min_width: 110, min_height: 110 * 1.45 }}
									arNmDefaultImage={this.state.arNmDefaultImage}
								/>
							</div>
							<div className="col">
								{idChannel && <GoogleDriveIntegrationContainer onSave={this.props.onDriveImportContent} />}
								<Field
									name="nmChannel"
									title={Translation.title}
									image={require('assets/channel.svg')}
									placeholder={Translation.insertTitle}
									component={EditableTextField}
									onValueChange={this.onValueChange}
								/>
								<Field
									name="dsChannel"
									icon="notes"
									title={Translation.description}
									placeholder={Translation.insertDescription}
									component={EditableTextArea}
									onValueChange={this.onValueChange}
								/>
								<Field
									name="settedNewGroups"
									icon="group"
									title={Translation.groups}
									placeholder={Translation.authGroups}
									options={normalizeCombo("idGroup", "nmGroup", options)}
									component={EditableCombobox}
									onValueChange={this.onValueChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="footer">
					{hasChange && <SaveCompleteButton onClick={this.save} />}
				</div>
			</>
		)
	}
}

export default withRouter<any, any>(connect()(ChannelDetailsScreen));
