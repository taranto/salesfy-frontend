
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ScreenToolbar from 'web/container/screen_toolbar/ScreenToolbar';
import EditableTextArea from 'web/stories/component/editable-field/EditableTextArea';
import EditableTextField from 'web/stories/component/editable-field/EditableTextField';
import EditableCombobox from 'web/stories/component/editable-field/EditableCombobox';
import { Field } from 'redux-form';
import { IContentDetails } from 'app-core/utils/interfaces';
import { SaveCompleteButton } from 'web/stories/component/button/Button';
import { normalizeCombo } from 'app-core/utils/Utils';
import { S3FileUpload } from 'web/utils/s3/UploadFile';
import FormScreenLocation from 'web/stories/screen/screen_location/FormScreenLocation';
import EditableSelect from 'web/stories/component/editable-field/EditableSelect';
import { ChannelListCard } from 'web/stories/component/channel_list/ChannelList';
import CardSliderCarousel from 'web/stories/component/card-slider-carousel/CardSliderCarousel';
import { LayoutCardTemplateUtil } from 'salesfy-shared';
import { getContentChannelData } from 'app-core/redux_store/contentChannel/Actions';
import { DEFAULT_CONTENT_TYPE, AR_NM_DEFAULT_IMAGE_SUGGEST_CONTENT } from 'root/envVars';
import { CropPanel } from '../../component/picture-upload/CropPanel';
import { imageNameUtils } from 'app-core/utils/string/StringUtils';
import { executeAwait } from 'app-core/utils/delay_control/DelayControl';
import { getContentById } from 'app-core/redux_store/content/Actions';
import { urlBase64ToBlob, getNmDefaultContentImage } from '../../../utils/image/ImageUtils';
import { ImageSuggest } from 'web/stories/component/image_suggest/ImageSuggest';
import { FastLink } from 'web/stories/component/fast-link/FastLink';
import { ListHeaderTitle } from 'web/stories/component';
import { Translation } from 'app-core/utils/translate/Translation';

interface IState {
	hasChange
	imagePreviewUrl,
	currentSlide,
	arNmDefaultImage : string[],
	file?,
	imageToCrop?
}

class ContentDetailsScreen extends FormScreenLocation<IContentDetails, IState> {

	constructor(props) {
		super(props);

		this.state = {
			hasChange: false,
			imagePreviewUrl: undefined,
			currentSlide: 0,
			arNmDefaultImage: AR_NM_DEFAULT_IMAGE_SUGGEST_CONTENT
		}

		this.save = this.save.bind(this);
		this.multiValueContainer = this.multiValueContainer.bind(this);
		this.templateOption = this.templateOption.bind(this);
		this.setFile = this.setFile.bind(this);
		this.toCropImage = this.toCropImage.bind(this);
		this.onCrop = this.onCrop.bind(this);
		this.getTemplateAspectRatio = this.getTemplateAspectRatio.bind(this);
		this.setCurrentSlide = this.setCurrentSlide.bind(this);
		this.onImageSuggestChange = this.onImageSuggestChange.bind(this);
	}

	public onContentEdit(isCopy, isPlaybook, ctContent, content) {
		const {
			shShowTitle, shShowDescription, shShowActionButtons,
			shShowPublisher, shShowShortCard, shShowFullscreenImage,
			shShowShareButton
		} = content;
		const idTemplate = LayoutCardTemplateUtil.getCd({
			shShowTitle, shShowDescription, shShowActionButtons,
			shShowShareButton, shShowPublisher, shShowShortCard,
			shShowFullscreenImage
		});

		if (isCopy) {
			delete content.idContent;
		}

		const idPublisher = { value: content.idPublisher, label: content.nmPublisher }
		const currentSlide = this.getNrSlidePositionIndex(idTemplate)
		this.setCurrentSlide(currentSlide)
		this.props.initialize({ idTemplate, isPlaybook, ctContent, ...content, idPublisher, currentSlide });
	}

	public getNrSlidePositionIndex(idTemplate?: number): number {
		let nrSlidePositionIndex = 0
		switch (idTemplate) {
			case LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate: nrSlidePositionIndex = 0; break
			case LayoutCardTemplateUtil.TEMPLATE_2.cdTemplate: nrSlidePositionIndex = 1; break
			case LayoutCardTemplateUtil.TEMPLATE_7.cdTemplate: nrSlidePositionIndex = 2; break
			case LayoutCardTemplateUtil.TEMPLATE_8.cdTemplate: nrSlidePositionIndex = 3; break
			default: nrSlidePositionIndex = 0; break;
		}
		return nrSlidePositionIndex
	}

	public async onLocationChange(location) {
		if (location.state) {
			const { idContent, isCopy, isPlaybook, idChannel, nmChannel, piChannel, dsChannel, idCtChannelView, ctContent } = location.state;
			if (idContent) {
				this.onContentEdit(isCopy, isPlaybook, ctContent, location.state);
				const content: any = await getContentById(idContent);
				this.onContentEdit(isCopy, isPlaybook, ctContent, content);
				this.setState({ hasChange: false });

				this.props.dispatch(getContentChannelData({ idContent: location.state.idContent })).then(settedChannels => {
					const normSetted = isCopy ? [] : normalizeCombo("idChannel", "nmChannel", settedChannels);
					this.props.change('settedChannels', settedChannels);
					this.props.change('settedNewChannels', normSetted);
				});
			} else {
				const settedChannels = idChannel ? [{ idChannel, nmChannel, piChannel, dsChannel, idCtChannelView }] : [];
				const normSetted = idChannel ? [{ value: idChannel, label: nmChannel }] : [];
				const typesContent = normalizeCombo("idCtContent", "nmCtContent", this.props.types);
				const defaultContentType = typesContent.filter(type => type.value === DEFAULT_CONTENT_TYPE)[0];
				this.props.initialize({
					idTemplate: LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate,
					settedChannels, settedNewChannels: normSetted,
					ctContent: defaultContentType,
					isPlaybook,
					idPublisher: { value: this.props.idUser, label: this.props.nmUser }
				})
			}

		}
	}

	public setFile(file, imagePreviewUrl) {
		this.setState({ imagePreviewUrl })
		return file && S3FileUpload(file);
	}

	public save() {
		const { saveData, history } = this.props;
		saveData().then((isSaved: boolean) => {
			this.setState({ hasChange: false })
			if (isSaved) {
				history.goBack()
			}
		}).catch(_error => {
			// Alert.error(error.message);
		});
	}

	public onValueChange() {
		this.setState({ hasChange: true })
	}

	public multiValueContainer = ({ data }) => {
		const { channels } = this.props;
		const channel = channels.filter(item => item.idChannel === data.value)[0];
		return (
			<ul className="channel-list combo">
				<ChannelListCard {...channel} hasPowerInItem={() => false} />
			</ul>
		);
	};

	public templateOption = (item) => {
		return (
			<div {...item.innerProps}><img src={require(`assets/templates/template${item.value}.png`)} /></div>
		);
	};

	public getArJoAllCardTemplateData() {
		const { nmContent, dsContent, lkContent, idPublisher } = this.props;
		const { imagePreviewUrl } = this.state;

		const piContent = this.props.piContent ? this.props.piContent : getNmDefaultContentImage()

		const formData = {
			onConversion: () => { },
			piContent,
			imagePreviewUrl
		}

		const cardDetails = {
			nmContent: nmContent && nmContent !== "" ? nmContent : Translation.title,
			dsContent,
			lkContent,
			nmPublisher: idPublisher && idPublisher.label,
		}

		return [
			{
				...LayoutCardTemplateUtil.getTemplateParams(LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate),
				...formData,
				cdTemplate: LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate,
				info: Translation.traditional,
				...cardDetails,
			},
			{
				...LayoutCardTemplateUtil.getTemplateParams(LayoutCardTemplateUtil.TEMPLATE_2.cdTemplate),
				...formData,
				cdTemplate: LayoutCardTemplateUtil.TEMPLATE_2.cdTemplate,
				info: Translation.fullscreen,
				...cardDetails,
			},
			{
				...LayoutCardTemplateUtil.getTemplateParams(LayoutCardTemplateUtil.TEMPLATE_7.cdTemplate),
				...formData,
				cdTemplate: LayoutCardTemplateUtil.TEMPLATE_7.cdTemplate,
				info: Translation.shortened,
				...cardDetails,
			},
			{
				...LayoutCardTemplateUtil.getTemplateParams(LayoutCardTemplateUtil.TEMPLATE_8.cdTemplate),
				...formData,
				cdTemplate: LayoutCardTemplateUtil.TEMPLATE_8.cdTemplate,
				info: Translation.shortenedWithImage,
				...cardDetails,
			}
		]
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
			this.props.change('piContent', fileName);
			executeAwait(this.onValueChange);
		}
	}

	public toCropImage(imageToCrop, file) {
		this.setState({ imageToCrop, file })
	}

	public setCurrentSlide(currentSlide) {
		this.setState({ currentSlide });
	}

	public getTemplateAspectRatio() {
		const { currentSlide } = this.state;

		const idTemplate = this.getArJoAllCardTemplateData()[currentSlide].cdTemplate;

		switch (idTemplate) {
			case LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate:
				return 2 / 1;
			case LayoutCardTemplateUtil.TEMPLATE_2.cdTemplate:
				return 3 / 4;
			case LayoutCardTemplateUtil.TEMPLATE_7.cdTemplate:
				return 2 / 1;
			case LayoutCardTemplateUtil.TEMPLATE_8.cdTemplate:
				return 1.4 / 1;
			default:
				return;
		}
	}

	public onImageSuggestChange(piContent) {
		this.props.change('piContent', piContent);
		executeAwait(this.onValueChange);
	}

	public render() {
		const {
			channels, nmContent,
			getLinkDetails, lkContent, isLoadingLink, users, piContent
		} = this.props;
		const { hasChange, imagePreviewUrl, imageToCrop } = this.state;

		const aspectRatio = this.getTemplateAspectRatio();

		return (
			<>
				<ScreenToolbar useBackHistory={true}>
					<ListHeaderTitle title={nmContent ? nmContent : Translation.newContent} />
					<div className="center" />
					<div className="right">
						{hasChange && <SaveCompleteButton onClick={this.save} />}
					</div>
				</ScreenToolbar>
				<div className="screen-content content-details details">
					<div className="form">
						<div className="row">
							<div className="col">
								{imageToCrop ?
									<CropPanel
										aspectRatio={aspectRatio}
										imageToCrop={imageToCrop}
										onCrop={this.onCrop}
									/> : <Field
										name="idTemplate"
										component={CardSliderCarousel}
										items={this.getArJoAllCardTemplateData()}
										imagePreviewUrl={imagePreviewUrl || piContent}
										onValueChange={this.onValueChange}
										toCropImage={this.toCropImage}
										setCurrentSlide={this.setCurrentSlide}
										currentSlide={this.state.currentSlide}
										setFile={this.setFile}
										change={this.props.change}
									/>}
								<ImageSuggest
									onImageChange={this.onImageSuggestChange}
									dsSearchTerm={nmContent}
									options={{ orientation: "horizontal", min_width: 230, min_height: 115 }}
									arNmDefaultImage={this.state.arNmDefaultImage}
								/>
							</div>
							<div className="col">
								<FastLink />
								<Field
									name="lkContent"
									icon="link"
									title={"Link"}
									placeholder="Link do conteúdo..."
									component={EditableTextField}
									onSubmitItem={(e) => {
										e.stopPropagation();
										getLinkDetails(lkContent)
									}}
									submitIcon={<img className="button-magic" src={require("assets/magic-wand.svg")} />}
									isLoading={isLoadingLink}
									onValueChange={this.onValueChange}
									setFile={this.setFile}
								/>
								<Field
									name="nmContent"
									title={Translation.title}
									image={require('assets/content.svg')}
									placeholder={Translation.insertTitle}
									component={EditableTextField}
									onValueChange={this.onValueChange}
								/>
								<Field
									name="dsContent"
									icon="notes"
									title={Translation.description}
									placeholder={Translation.insertDescription}
									component={EditableTextArea}
									onValueChange={this.onValueChange}
								/>
								<Field
									name="idPublisher"
									icon="group"
									title={Translation.author}
									placeholder={Translation.selectContentAuthor}
									options={normalizeCombo("idUser", "nmUser", users.filter(user => user.nmUser))}
									component={EditableSelect}
									onValueChange={this.onValueChange}
								/>
								<Field
									name="settedNewChannels"
									image={require('assets/channel.svg')}
									title={Translation.channels}
									placeholder={Translation.authToChannels}
									options={normalizeCombo("idChannel", "nmChannel", channels)}
									className="channel-list"
									component={EditableCombobox}
									onValueChange={this.onValueChange}
									multiValueContainer={this.multiValueContainer}
								/>
							</div>
						</div>
					</div>

				</div>
			</>
		)
	}
}

export default withRouter(connect()(ContentDetailsScreen));
