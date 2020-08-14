import * as React from "react";
import { HatchImage, HatchDetails, HatchPreview, ComboContentChannel } from "app/stories/component/hatch/Hatch";
import { connect } from "react-redux";
import { Container, Header, Left, Button, Icon, Body, Title, Text } from "native-base";
import styles from "./styles";
import { PrimaryGradient } from "app/stories/component";
import { I18n, KeyEnum } from "salesfy-shared";
import { HatchTemplates } from "app/stories/component/hatch/HatchTemplates";
import { CircularLoader } from 'components';

interface IProps {
	navigation: any;
	lkContent: any,
	nmContent: any,
	dsContent: any,
	nmCtContent: any,
	piContent: any,
	onUploadSelect: any
	formatData: any;
	currentPosition: any;
	hasNext: any;
	hasBack: any;
	onBack: any;
	next: any;
	back: any;
	errorMessage: any;
	onPublish: any;
	onValueChange: any;
	ctTemplate: any;
	isLoadingPublish?: boolean;
	onStepPress: any;
	isLoadingPicture?: boolean;
	channels?: any[]
	details,
	isLoadingLink,
	getLinkDetails,
	idCtContent,
	lkContentError,
	valid
}

class CreateHatchScreen extends React.Component<IProps> {

	constructor(props) {
		super(props)
	}

	public details() {
		const {
			nmCtContent, lkContent, nmContent,
			dsContent, piContent,
			ctTemplate, currentPosition,
			errorMessage, onUploadSelect, formatData, isLoadingPublish,
			isLoadingPicture, channels, details, isLoadingLink, getLinkDetails,
			next, onPublish, idCtContent, lkContentError, valid
		} = this.props;

		const item = {
			idCtContent, nmCtContent, lkContent,
			nmContent, dsContent, piContent
		};

		switch (currentPosition) {
			case 0:
				return (
					<HatchDetails details={details} isLoadingLink={isLoadingLink} getLinkDetails={getLinkDetails} lkContentError={lkContentError}>
						<HatchImage
							onSelect={onUploadSelect}
							ctTemplate={ctTemplate}
							isLoadingPicture={isLoadingPicture}
							piContent={piContent}
							errorMessage={errorMessage}
						/>
						<HatchTemplates ctTemplate={ctTemplate} />
						{valid && <HatchPreview item={formatData(item)} isLoadingPublish={isLoadingPublish} />}
						<Button
							style={styles.buttonPrimary}
							small={true}
							disabled={isLoadingPublish}
							rounded={true}
							bordered={true}
							onPress={next}
						>
							<Text style={styles.textButtonPrimary}>{I18n.t(KeyEnum.next)}</Text>
						</Button>
					</HatchDetails>
				);
			case 1:
				return (
					<ComboContentChannel items={channels}>
						<Button
							style={styles.buttonPrimary}
							small={true}
							disabled={isLoadingPublish}
							rounded={true}
							bordered={true}
							onPress={onPublish}
						>
							<Text style={styles.textButtonPrimary}>{I18n.t(KeyEnum.publish)}</Text>
						</Button>
						{isLoadingPublish && <CircularLoader/>}
					</ComboContentChannel>
				);
			default:
				return;
		}
	}

	public render() {
		const { onBack, nmCtContent } = this.props;

		return (
			<Container style={styles.content}>
				<PrimaryGradient>
					<Header style={styles.header} hasTabs={true}>
						<Left style={styles.autoWidth}>
							<Button onPress={onBack} transparent={true}>
								<Icon name='ios-arrow-round-back' />
							</Button>
						</Left>
						<Body>
							<Title style={styles.textHeader}>{`${I18n.t(KeyEnum.add)} ${nmCtContent}`}</Title>
						</Body>
					</Header>
				</PrimaryGradient>
				{this.details()}
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(CreateHatchScreen);
