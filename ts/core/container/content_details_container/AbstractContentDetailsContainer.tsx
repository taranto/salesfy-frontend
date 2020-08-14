import * as React from "react";
import { touch, blur } from 'redux-form';
import { IContentDetailsContainer } from "app-core/utils/interfaces";
import { LayoutCardTemplateUtil } from 'salesfy-shared';
import { addContentData, updateContentData, getChannelContentComboData } from 'app-core/redux_store/content/Actions';
import Alert from 'native/Alert';
import { ValHN } from 'salesfy-shared';
import { Translation } from 'app-core/utils/translate/Translation';
import { getNmDefaultContentImage } from "web/utils/image/ImageUtils";
import { getPreview } from "app-core/communication/ask/preview/Preview";
import { DEFAULT_CONTENT_TYPE } from "root/envVars";

interface IState {
	updateLabel?: any;
	isLoadingLink?: boolean;
	details?: any;
}
abstract class AbstractContentDetailsContainer<P ={}, S ={}> extends React.Component<IContentDetailsContainer & P, IState & S> {

	constructor(props) {
		super(props);

		this.saveData = this.saveData.bind(this);
		this.submitSaveData = this.submitSaveData.bind(this);
		this.getLinkDetails = this.getLinkDetails.bind(this);
	}

	public componentWillMount() {
		this.props.dispatch(getChannelContentComboData({ isPlaybook: true }));
	}

	public alertInvalid() {
		const { dispatch } = this.props;
		dispatch(touch('content-details', 'nmContent'));
		dispatch(blur('content-details', 'nmContent'));
		dispatch(touch('content-details', 'ctContent'));
		dispatch(blur('content-details', 'ctContent'));
		dispatch(touch('content-details', 'idTemplate'));
		dispatch(blur('content-details', 'idTemplate'));
	}

	public async getLinkDetails(link) {
		const { lkContent, change } = this.props;
		const newLink = lkContent || link;
		let details;
		let hasError = true;

		if (newLink && ValHN.valNmKey('lkContent', newLink)) {
			this.setState({ isLoadingLink: true });
			try {
				details = await this.getContentByLink(newLink);
				hasError = (!details || details.hasError)
				if (hasError) {
					Alert.error(Translation.itWasNotPossibleToRetreiveInfo)
				}
			} catch (e) {
				Alert.error(e)
			}

			change('nmContent', !hasError && details? details.nmContent : '');
			change('dsContent', !hasError && details? details.dsContent : '');
			change('piContent', !hasError && details? details.piContent : '');
			change('lkContentError', hasError ? Translation.lkContentErrorNotFound : '');
		}
		this.setState({ details, isLoadingLink: false });
	}

	public getImageNumber(idTemplate) {
		switch (idTemplate) {
			case LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate:
				return 1;
			case LayoutCardTemplateUtil.TEMPLATE_5.cdTemplate:
				return 2;
			case LayoutCardTemplateUtil.TEMPLATE_7.cdTemplate:
				return 3;
			case LayoutCardTemplateUtil.TEMPLATE_8.cdTemplate:
				return 4;
		}
		return 0;
	}

	public async getContentByLink(lkContent) {
		const details = await getPreview(lkContent);
		const hasError = !details
		const content = {
			nmContent: !hasError ? details.data.nmPreview : new URL(lkContent).hostname,
			dsContent: !hasError ? details.data.dsPreview : lkContent,
			piContent: !hasError && details.data.piPreview ? details.data.piPreview : getNmDefaultContentImage(),
			idTemplate: LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate,
			idCtContent: DEFAULT_CONTENT_TYPE,
			lkContent,
			hasError
		}
		return content
	}

	public async submitSaveData({ dispatch, idContent, nmContent, dsContent, piContent, idTemplate, ctContent, isPlaybook, lkContent, settedNewChannels, valid, idPublisher }) : Promise<boolean> {
		const arIdChannel: number[] = settedNewChannels ? settedNewChannels.map(item => item.value) : [];
		const newPiContent = piContent ? piContent : getNmDefaultContentImage()
		let isSaved = false
		if (valid && newPiContent) {
			const joParam = {
				...LayoutCardTemplateUtil.getTemplateParams(idTemplate),
				idCtContent: ctContent.value, lkContent, isPlaybook,
				idContent, nmContent, dsContent, arIdChannel,
				piContent: newPiContent, idPublisher: idPublisher ? idPublisher.value : undefined
			}

			try {
				if (!idContent) {
					await dispatch(await addContentData(joParam))
					Alert.success(Translation.addContent)
				} else {
					await dispatch(await updateContentData(joParam))
					Alert.success(Translation.savedContent)
				}
				isSaved = true
				return isSaved
			} catch (e) {
				Alert.error(e)
			}
		} else {
			this.alertInvalid();
			Alert.error(Translation.insertRequiredFields)
		}
		return isSaved
	}

	public async saveData() {
		const data: any = this.props;
		return this.submitSaveData(data);
	}
}

export default AbstractContentDetailsContainer;
