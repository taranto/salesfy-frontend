import * as React from "react";
import { connect } from "react-redux";
import { formValueSelector, reduxForm, touch, blur } from "redux-form";
import CreateHatchScreen from "app/stories/screen/create_hatch_screen/CreateHatchScreen";
import { RNS3 } from 'react-native-aws3';
import { HatchPreviewFooter } from "app/stories/component/hatch/Hatch";
import { I18n, KeyEnum, LayoutCardTemplateUtil, ValHN } from "salesfy-shared";
import { S3_SECRET_KEY, S3_ACCESS_KEY, S3_REGION, S3_BUCKET, S3_CONTENT_DIR } from "root/envVars";
import { executeAwait } from 'app-core/utils/delay_control/DelayControl';
import AbstractContentDetailsContainer from "app-core/container/content_details_container/AbstractContentDetailsContainer";
import { imageNameUtils } from "app-core/utils/string/StringUtils";
import { Alert } from 'native/Alert';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import validate from "./Validator";
import { Translation } from 'app-core/utils/translate/Translation';

interface IProps {
	dispatch: any
	navigation: any,
	lkContent?: any,
	nmContent?: any,
	dsContent?: any,
	isLoadingPublish?: boolean;
	user: any;
	valid?: boolean;
	publishTypes: any[];
	channels?: any[]
	settedNewChannels,
	ctTemplate,
	lkContentError,
	lkContentFormatError,
	idCtContent, nmCtContent
}

class CreateHatchesContainer extends AbstractContentDetailsContainer<IProps, any> {

	public saveTimeout;

	constructor(props) {
		super(props)

		this.onUploadSelect = this.onUploadSelect.bind(this);
		this.formatData = this.formatData.bind(this);
		this.next = this.next.bind(this);
		this.back = this.back.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onPublish = this.onPublish.bind(this);
		this.onStepPress = this.onStepPress.bind(this);
		this.downloadAndUploadImage = this.downloadAndUploadImage.bind(this);
		this.getLinkDetails = super.getLinkDetails.bind(this);

		this.state = {
			currentPosition: 0,
			hasBack: false,
			hasNext: true
		}
	}

	public componentWillMount() {
		super.componentWillMount();
		const { navigation } = this.props;

		this.props.initialize({ ctTemplate: LayoutCardTemplateUtil.TEMPLATE_1.cdTemplate, ...navigation.state.params });

		if (navigation.state.params && navigation.state.params.lkContent) {
			this.getLinkDetails(navigation.state.params.lkContent);
		}
	}

	public formatData(item) {
		const { user, ctTemplate } = this.props;

		const data = {
			nmPublisher: user.nmUser && user.nmUser,
			onConversion: () => { },
			cardActions: () => <HatchPreviewFooter item={item} />,
			shShowPublisher: true,
			shShowActionButtons: true,
			isPlaybook: true,
			...item,
			...LayoutCardTemplateUtil.getTemplateParams(ctTemplate),
		};
		return data;
	}

	public getLocalPath(url) {
		const filename = url.split('/').pop();
		return `${RNFS.DocumentDirectoryPath}/${filename}`;
	}

	public async downloadAndUploadImage(piContent) {
		if (ValHN.valNmKey('lkPiContent', piContent)) {
			const localFile = this.getLocalPath(piContent);

			const {promise} = RNFS.downloadFile({
				fromUrl: piContent,
				toFile: localFile,
				background: false,
				cacheable: false,
				connectionTimeout: 60 * 1000,
				readTimeout: 120 * 1000
			});

			return promise.then(() => {
				return this.onUploadSelect({
					name: localFile,
					uri: localFile
				})
			});
		} else {
			return Promise.resolve(piContent);
		}
	}

	public onUploadSelect(data) {
		const { user, change } = this.props;

		const fileName = imageNameUtils(user.idUser, data.name);

		const file = {
			uri: `${Platform.OS === "android" && 'file://'}${data.uri}`,
			name: `${fileName}`,
			type: 'image/jpeg'
		};

		const options = {
			keyPrefix: S3_CONTENT_DIR,
			bucket: S3_BUCKET,
			region: S3_REGION,
			accessKey: S3_ACCESS_KEY,
			secretKey: S3_SECRET_KEY,
			successActionStatus: 201
		};

		this.setState({ isLoadingPicture: true });
		return RNS3.put(file, options).then(response => {
			if (response.status !== 201) {
				throw new Error(I18n.t(KeyEnum.unrelizedImageUpload));
			}
			change('piContent', file.name);
			this.setState({ isLoadingPicture: false, errorMessage: undefined })
			return file.name;
		});

	}

	public onBack() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	public next() {
		const { currentPosition } = this.state;
		const { valid, dispatch } = this.props

		if (valid) {
			const newCurrentPosition = currentPosition + 1;
			this.setState({ currentPosition: newCurrentPosition, hasBack: true, hasNext: newCurrentPosition < 4, errorMessage: undefined })
		} else {
			dispatch(touch('hatchForm', 'nmContent'));
			dispatch(blur('hatchForm', 'nmContent'));
			dispatch(touch('hatchForm', 'piContent'));
			dispatch(blur('hatchForm', 'piContent'));
			Alert.error(Translation.requiredFields);
		}
	}

	public back() {
		const { currentPosition } = this.state;
		const newCurrentPosition = currentPosition - 1;
		this.setState({ currentPosition: newCurrentPosition, hasNext: true, hasBack: newCurrentPosition > 0, errorMessage: undefined })
	}

	public async onPublish() {
		const { dispatch, lkContent, nmContent, dsContent, navigation, piContent, settedNewChannels, ctTemplate, idCtContent, nmCtContent } = this.props;
		const piContentDf = await this.downloadAndUploadImage(piContent);
		const channels: any = []
		if (settedNewChannels && settedNewChannels.length > 0) {
			settedNewChannels.map(item => {
				channels.push({ value: item })
			})
		}

		const submit = this.submitSaveData({
			dispatch, nmContent, dsContent, piContent: piContentDf, idTemplate: ctTemplate,
			ctContent: { value: idCtContent, label: nmCtContent }, lkContent,
			settedChannels: [], settedNewChannels: channels,
			valid: true, isPlaybook: true, idContent: undefined, types: [],
			idPublisher: undefined
		}).then(() => {
			navigation.navigate('Home');
		}).catch(error => {
			Alert.error(error);
		});

		executeAwait(submit);
	}

	public onStepPress(position) {
		const { currentPosition } = this.state;
		if (position < currentPosition) {
			this.setState({ currentPosition: position, hasNext: true, hasBack: position > 0, errorMessage: undefined })
		} else if (position > currentPosition) {
			this.next();
		}
	}

	public render() {
		const { navigation, dsContent, nmContent, lkContent, channels, piContent, ctTemplate, idCtContent, nmCtContent, isLoadingPublish, lkContentError, valid } = this.props;
		const { hasNext, hasBack, currentPosition, errorMessage, isLoadingPicture, details, isLoadingLink } = this.state;

		const item = {
			dsContent, nmContent, lkContent, idCtContent, nmCtContent,
			piContent, hasNext, hasBack, currentPosition, errorMessage,
			navigation, ctTemplate, isLoadingPublish, details, isLoadingLink, lkContentError, channels, valid
		}

		return (
			<CreateHatchScreen
				{...item}
				back={this.back}
				next={this.next}
				onBack={this.onBack}
				formatData={this.formatData}
				onUploadSelect={this.onUploadSelect}
				onPublish={this.onPublish}
				onStepPress={this.onStepPress}
				isLoadingPicture={isLoadingPicture}
				getLinkDetails={this.getLinkDetails}
			/>
		);
	}
}

const hatchContainer = reduxForm({
	form: "hatchForm",
	validate
})(CreateHatchesContainer);

const mapStateToProps = state => ({
	publishTypes: state.contentList.publishTypes,
	showNewHatch: state.home.showNewHatch,
	user: state.user,
	isLoadingPublish: state.contentList.isLoadingPublish,
	channels: state.contentList.channelCombo,
	...formValueSelector("hatchForm")(state, "nmContent", "dsContent", "lkContent", "piContent", "settedNewChannels", "ctTemplate", "idCtContent", "nmCtContent", "lkContentError")
});

export default connect(mapStateToProps)(hatchContainer);
