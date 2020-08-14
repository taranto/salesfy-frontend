import * as React from "react";
import { HatchType } from "app/stories/component/hatch/Hatch";
import { connect } from "react-redux";
import { Container, Header, Left, Button, Icon, Body, Title } from "native-base";
import styles from "app/stories/screen/select_hatch_type_screen/styles";
import { PrimaryGradient } from "app/stories/component";
import { KeyEnum, I18n } from "salesfy-shared";

interface IProps {
	navigation: any;
	publishTypes: any[]
}

interface IState {
	[key: string]: any;
}

class SelectHatchTypeScreen extends React.Component<IProps, IState> {

	constructor(props) {
		super(props)

		this.onBack = this.onBack.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}

	public onValueChange(item) {
		// tslint:disable-next-line:no-console
		const { navigation } = this.props;

		if(item.idCtContent === -2){
			navigation.navigate("ImportHatch", {idCtContent: item.idCtContent, nmCtContent: item.nmCtContent, ...navigation.state.params})
		} else {
			navigation.navigate("NewHatch", {idCtContent: item.idCtContent, nmCtContent: item.nmCtContent, ...navigation.state.params})
		}
	}

	public onBack() {
		const { navigation } = this.props;
		navigation.goBack();
	}

	public render() {
		const { publishTypes } = this.props;
		return (
			<Container style={styles.content}>
				<PrimaryGradient style={styles.content}>
					<Header style={styles.header} hasTabs={true}>
						<Left style={styles.autoWidth}>
							<Button onPress={this.onBack} transparent={true}>
								<Icon name='ios-arrow-round-back' />
							</Button>
						</Left>
						<Body>
							<Title style={styles.textHeader}>{I18n.t(KeyEnum.selectPublishType)}</Title>
						</Body>
					</Header>
					<HatchType onValueChange={this.onValueChange} publishTypes={publishTypes}/>
				</PrimaryGradient>
			</Container>
		);
	}
}

const mapStateToProps = state => ({
	publishTypes: state.contentList.publishTypes,
	isLoading: state.user.isLoading,
	errorMessage: state.user.error,
});

export default connect(mapStateToProps)(SelectHatchTypeScreen);
