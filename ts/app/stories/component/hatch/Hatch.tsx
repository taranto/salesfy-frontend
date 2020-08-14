import React from 'react';
import styles from './styles';
import { Form, Label, Text, Row, Col, Icon, Card, CardItem, Body, Content, Container } from 'native-base';
import { Field } from "redux-form";
import { SimpleFormInput, SimpleFormWithErrorInput, SimpleFormTextErrorInput, AreaInput } from 'app/stories/component/form/Form';
import FileSelector from 'app/stories/component/file_selector/FileSelector';
import { FlatList, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { ContentListCard, } from 'app/stories/component';
import { actionButton } from 'app/stories/component/content_list/ContentList';
import { I18n, KeyEnum, CtPlatform } from 'salesfy-shared';
import StepIndicator from 'react-native-step-indicator';
import platform from 'app/theme/variables/platform';
import { CircularLoader } from 'app/stories/component/loader/Loader';
import { ListHeaderTitle } from 'app/stories/component/list/List';
import { SimpleChannelList } from 'app/stories/component/channel_list/ChannelList';
import ComboBoxMulti from 'app/stories/component/combo_box_multi/ComboBoxMulti';
import { View } from 'react-native';
import { Translation } from 'app-core/utils/translate/Translation';

const icons = ["ios-create", "ios-brush", "ios-link", "ios-camera", "hatch"];
const iconsImport = ["ios-grid", "hatch"];
const customStyles = {
	stepIndicatorSize: 50,
	currentStepIndicatorSize: 60,
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 2,
	stepStrokeCurrentColor: '#8d53e9',
	stepStrokeWidth: 2,
	stepStrokeFinishedColor: '#8d53e9',
	stepStrokeUnFinishedColor: platform.brandPrimary,
	separatorFinishedColor: '#8d53e9',
	separatorUnFinishedColor: platform.brandPrimary,
	stepIndicatorFinishedColor: '#8d53e9',
	stepIndicatorUnFinishedColor: '#ffffff',
	stepIndicatorCurrentColor: '#ffffff',
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 13,
	stepIndicatorLabelCurrentColor: '#8d53e9',
	stepIndicatorLabelFinishedColor: '#ffffff',
	stepIndicatorLabelUnFinishedColor: platform.brandPrimary,
	labelColor: '#999999',
	labelSize: 13,
	currentStepLabelColor: '#8d53e9'
}

export const HatchIndicator = ({ currentPosition, onStepPress }) => {
	return (
		<StepIndicator
			customStyles={customStyles}
			renderStepIndicator={({ position, stepStatus }) => stepIndicador({ position, stepStatus, list: icons, onStepPress })}
			currentPosition={currentPosition}
		/>
	)
};

export const HatchIndicatorImport = ({ currentPosition, onStepPress }) => (
	<StepIndicator
		stepCount={2}
		customStyles={customStyles}
		renderStepIndicator={({ position, stepStatus }) => stepIndicador({ position, stepStatus, list: iconsImport, onStepPress })}
		currentPosition={currentPosition}
	/>
);

const stepIndicador = ({ position, stepStatus, list, onStepPress }) => {
	const StepIcon = () => list[position] === "hatch" ?
		<Image style={{ height: 25, width: 25 }} resizeMode="contain" source={require('assets/app-logo.png')} /> :
		<Icon style={stepStatus === 'finished' ? { color: 'white' } : {}} name={list[position]} />;

	const onPress = () => onStepPress(position);
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center" }} >
				<StepIcon />
			</View>
		</TouchableWithoutFeedback>
	)
}

export const HatchDetails = ({ details, isLoadingLink, getLinkDetails, children, lkContentError }) => (
	<Content>
		<Form style={styles.form} >
			<ListHeaderTitle title={Translation.contentLink} description={I18n.t(KeyEnum.contentLinkDescription)} />
			<Field
				name="lkContent"
				placeholderTextColor="#6d6d6d"
				label={Translation.contentLinkPlaceholder}
				component={SimpleFormTextErrorInput}
				autoCapitalize={"none"}
				style={[styles.marginLeftZero, styles.inputField]}
				onBlur={getLinkDetails}
			/>
			{isLoadingLink && (
				<>
					<CircularLoader />
					<Text style={styles.waitMessage}>{I18n.t(KeyEnum.waitPrepareContent)}</Text>
				</>
			)}
			{details && (
				<>
					{lkContentError ?
						<ListHeaderTitle title={Translation.lkContentErrorNotFound} description={I18n.t(KeyEnum.lkContentErrorNotFoundDetails)}/>
						: <ListHeaderTitle title={Translation.yourContentDetails} />
					}
					<Field
						name="nmContent"
						label={`${I18n.t(KeyEnum.inputTitle)}`}
						placeholderTextColor="#6d6d6d"
						component={SimpleFormWithErrorInput}
						autoCapitalize={"none"}
						style={[styles.marginLeftZero, styles.inputField]}
					/>
					<Field
						name="dsContent"
						label={`${I18n.t(KeyEnum.inputDescription)} (${I18n.t(KeyEnum.optional)})`}
						placeholderTextColor="#6d6d6d"
						component={AreaInput}
						autoCapitalize={"none"}
						style={[styles.areaBorder, styles.inputField]}
					/>
				</>
			)}
		</Form>
		{details && children}
	</Content>
);

export const ComboContentChannel = ({ items, children }) => {
	return (
		<Container style={styles.content}>
			<ListHeaderTitle title={I18n.t(KeyEnum.shareInChannels)} description={I18n.t(KeyEnum.shareInChannelsDescription)}/>
			<Field
				uniqueKey="idChannel"
				displayKey="nmChannel"
				items={items}
				customChipsRenderer={props => (
					<SimpleChannelList style={styles.contentChannelList} data={items.filter(item => props.selectedItems.includes(item.idChannel))} />
				)}
				selectText={Translation.chooseChannels}
				name="settedNewChannels"
				label={`${I18n.t(KeyEnum.inputDescription)} (${I18n.t(KeyEnum.optional)})`}
				placeholderTextColor="#6d6d6d"
				component={ComboBoxMulti}
				autoCapitalize={"none"}
				style={[styles.areaBorder, styles.inputField]}
			/>
			{children}
		</Container>
	)
}

export const HatchLinkImport = ({ ctPlatform, errorMessage }) => {
	const labelPlatform = getLinkLabel(ctPlatform);
	const titlePlatform = getLinkTitle(ctPlatform);
	return (
		<Form style={styles.form}>
			<ListHeaderTitle title={I18n.t(KeyEnum.importReference)} description={I18n.t(KeyEnum.importReferenceDescription)} />
			{labelPlatform && <Label>{labelPlatform}</Label>}
			<Field
				name="lkPlatformProfile"
				placeholderTextColor="#6d6d6d"
				label={labelPlatform ? "Perfil" : titlePlatform}
				component={SimpleFormInput}
				autoCapitalize={"none"}
				style={styles.marginLeftZero}
			/>
			{errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
		</Form>
	)
};

export const getLinkLabel = (keyCtPlatform) => {
	switch (keyCtPlatform) {
		case CtPlatform.facebook.keyCtPlatform:
			return CtPlatform.facebook.lkCtPlatformBase + "/";
		case CtPlatform.youtube.keyCtPlatform:
			return CtPlatform.youtube.lkCtPlatformBase + "/";
		case CtPlatform.tumblr.keyCtPlatform:
			return CtPlatform.tumblr.lkCtPlatformBase + "/";
		case CtPlatform.linkedin.keyCtPlatform:
			return CtPlatform.linkedin.lkCtPlatformBase + "/";
		case CtPlatform.instagram.keyCtPlatform:
			return CtPlatform.instagram.lkCtPlatformBase + "/";
		case CtPlatform.medium.keyCtPlatform:
			return CtPlatform.medium.lkCtPlatformBase + "/";
		case CtPlatform.twitter.keyCtPlatform:
			return CtPlatform.twitter.lkCtPlatformBase + "/";
		case CtPlatform.blog.keyCtPlatform:
			return;
		case CtPlatform.outros.keyCtPlatform:
			return;
		default:
			return;
	}
}

const getLinkTitle = (keyCtPlatform) => {
	switch (keyCtPlatform) {
		case CtPlatform.facebook.keyCtPlatform:
			return CtPlatform.facebook.nmCtPlatform;
		case CtPlatform.youtube.keyCtPlatform:
			return CtPlatform.youtube.nmCtPlatform;
		case CtPlatform.tumblr.keyCtPlatform:
			return CtPlatform.tumblr.nmCtPlatform;
		case CtPlatform.linkedin.keyCtPlatform:
			return CtPlatform.linkedin.nmCtPlatform;
		case CtPlatform.instagram.keyCtPlatform:
			return CtPlatform.instagram.nmCtPlatform;
		case CtPlatform.medium.keyCtPlatform:
			return CtPlatform.medium.nmCtPlatform;
		case CtPlatform.twitter.keyCtPlatform:
			return CtPlatform.twitter.nmCtPlatform;
		case CtPlatform.blog.keyCtPlatform:
			return CtPlatform.blog.nmCtPlatform;
		case CtPlatform.outros.keyCtPlatform:
			return CtPlatform.outros.nmCtPlatform;
		default:
			return;
	}
}

export const HatchLink = ({ errorMessage }) => (
	<Form style={styles.form}>
		<ListHeaderTitle title={Translation.insertLink} description={I18n.t(KeyEnum.insertLinkDescription)} />
		<Field
			name="lkContent"
			label={`${I18n.t(KeyEnum.link)} (${I18n.t(KeyEnum.optional)})`}
			placeholderTextColor="#6d6d6d"
			component={SimpleFormInput}
			autoCapitalize={"none"}
			error={errorMessage}
			style={styles.marginLeftZero}
		/>
		{errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
	</Form>
);

// tslint:disable
export const HatchType = ({ onValueChange, publishTypes }) => (
	<FlatList style={{ margin: 5 }}
		data={publishTypes}
		numColumns={3}
		keyExtractor={(item: any) => item.idCtContent.toString()}
		renderItem={(props) => <ButtonType item={props.item} onValueChange={onValueChange} />}
	/>
);


const ButtonType = ({ item, onValueChange }) => (
	<TouchableOpacity style={styles.cardType} onPress={() => onValueChange(item)}>
		<Card style={styles.cardType}>
			<CardItem style={styles.cardType}>
				<Body style={styles.cardBodyType}>
					<Icon style={styles.iconType} name={item.iconName} />
					<Text style={styles.alignSelfCenter}>{item.nmCtContent}</Text>
				</Body>
			</CardItem>
		</Card>
	</TouchableOpacity>
)



export const HatchImage = ({ ctTemplate, isLoadingPicture, onSelect, piContent = undefined, errorMessage }) => (
	<Content>
		<Form style={styles.form}>
			<ListHeaderTitle title={Translation.contentImage} />
			<Field
				name="piContent"
				placeholderTextColor="#6d6d6d"
				component={FileSelector}
				autoCapitalize={"none"}
				style={styles.marginLeftZero}
				onSelect={onSelect}
				ctTemplate={ctTemplate}
				urlImage={piContent}
			/>
			{errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
		</Form>
		{isLoadingPicture && <CircularLoader />}
	</Content>
);

/*
: piContent && <CardImagePreview piContent={piContent} />
const CardImagePreview = ({ piContent }) => {
	const isLink = ValHN.valNmKey('lkPiContent', piContent);
	return (
		<Card style={styles.cardImagePreview}>
			<CardItem cardBody>
				<Image style={styles.imagePreview} source={{ uri: isLink ? piContent : `${S3_PATH_CONTENT}/${piContent}` }} />
			</CardItem>
		</Card>
	)
}
*/


export const HatchPreview = ({ item, isLoadingPublish }) => {
	return (
		<>
			<ListHeaderTitle title={I18n.t(KeyEnum.visualizationContent)} />
			<ContentListCard {...item} />
			{isLoadingPublish && <CircularLoader />}
		</>
	)
};

export const HatchPreviewFooter = ({ item }) => (
	<View style={styles.viewPreviewFooter}>{actionButton(item, () => { })}</View>
)
/*
<Row>
	<Col style={styles.column}>
		{backButton({ hasBack, back })}
	</Col>
	<Col style={styles.column}>
		{nextButton({ hasNext, next, onPublish })}
	</Col>
</Row>
*/

export const HatchFooter = ({ currentPosition, onStepPress }) => (
	<View style={styles.footer}>
		<Row>
			<Col>
				<HatchIndicator currentPosition={currentPosition} onStepPress={onStepPress} />
			</Col>
		</Row>
	</View>
);

export const HatchFooterImport = ({ currentPosition, onStepPress }) => (
	<View style={styles.footer}>
		<Row>
			<Col>
				<HatchIndicatorImport currentPosition={currentPosition} onStepPress={onStepPress} />
			</Col>
		</Row>
	</View>
);
