import * as React from "react";
import { HatchLinkImport, HatchFooterImport } from "app/stories/component/hatch/Hatch";
import { connect } from "react-redux";
import { Container, Header, Left, Button, Icon, Body, Title, Right, Text } from "native-base";
import styles from "./styles";
import { PrimaryGradient } from "app/stories/component";
import { I18n, KeyEnum } from "salesfy-shared";
import { HatchDetailsImport } from "app/stories/component/hatch/HatchDetailsImport";
import { Translation } from 'app-core/utils/translate/Translation';

interface IProps {
	navigation: any;
	lkPlatformProfile: any;
	currentPosition: any;
	hasNext: any;
	hasBack: any;
	onBack: any;
	next: any;
	back: any;
	errorMessage: any;
	onPublish: any;
	onValueChange: any;
	ctPlatform: any;
	isLoadingPublish?:boolean;
	onStepPress: any;
}

class CreateHatchScreen extends React.Component<IProps> {

	constructor(props) {
		super(props)
	}

	public details() {
		const {
			currentPosition, onValueChange, ctPlatform, errorMessage
		} = this.props;

		switch (currentPosition) {
			case 0:
				return <HatchDetailsImport onValueChange={onValueChange} ctPlatform={ctPlatform}/>;
			case 1:
				return <HatchLinkImport ctPlatform={ctPlatform} errorMessage={errorMessage}/>;
			default:
				return;
		}
	}

	public render() {
		const { hasNext, onStepPress, onBack, next, onPublish, currentPosition, isLoadingPublish } = this.props;

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
							<Title style={styles.textHeader}>{Translation.importContent}</Title>
						</Body>
						<Right>
							<Button
								style={styles.button}
								small={true}
								disabled={isLoadingPublish}
								rounded={true}
								bordered={true}
								onPress={hasNext ? next : onPublish}
							>
								<Text style={styles.textButton}>{hasNext ? I18n.t(KeyEnum.next) : I18n.t(KeyEnum.publish)}</Text>
							</Button>
						</Right>
					</Header>
				</PrimaryGradient>
				{this.details()}
				<HatchFooterImport currentPosition={currentPosition} onStepPress={onStepPress}/>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	isLoading: state.user.isLoading
});

export default connect(mapStateToProps)(CreateHatchScreen);
