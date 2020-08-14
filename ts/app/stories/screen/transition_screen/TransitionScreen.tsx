import * as React from "react";
import { Text, Container, Content, Button } from "native-base";
import styles from './styles';
import { CircularLoader, PrimaryGradient } from "components";
import { StatusBar, View, Image } from "react-native";
import platform from "app/theme/variables/platform";
import { I18n, KeyEnum } from "salesfy-shared";

// tslint:disable-next-line:variable-name
const WaitingBuildScreen = ({ infoText }) => {
	return (
		<Container>
			<StatusBar
				backgroundColor={platform.statusBarColor}
				barStyle="light-content"
			/>
			<PrimaryGradient style={styles.container}>
				<Content contentContainerStyle={styles.container}>
					<AppLogo />
					<CircularLoader inverse={true} />
					<Text style={styles.waitingMessage}>{infoText}</Text>
				</Content>
			</PrimaryGradient>
		</Container>
	);
}

// tslint:disable-next-line:variable-name
export const InfoScreen = ({ errorTitle, errorMessage, buttonText, buttonAction, linkText, linkPress }) => {
	return (
		<Container>
			<StatusBar
				backgroundColor={platform.statusBarColor}
				barStyle="light-content"
			/>
			<PrimaryGradient style={styles.container}>
				<Content contentContainerStyle={styles.container}>
					<AppLogo />
					{errorTitle && <Text style={styles.waitingMessageTitle}>{errorTitle}</Text>}
					<Text style={styles.waitingMessage}>{errorMessage}</Text>
					<Button rounded={true} bordered={true} style={styles.submitButton} color={"white"} onPress={buttonAction}>
						<Text style={styles.submitText}>{buttonText}</Text>
					</Button>
					{linkText && generateLinkButton(linkText, linkPress)}
				</Content>
			</PrimaryGradient>
		</Container>
	);
}

const generateLinkButton = (linkText, linkPress) => (
	<Button primary={true} small={true} transparent={true} style={styles.linkButton} onPress={linkPress}>
		<Text style={styles.linkButtonColor}>{linkText}</Text>
	</Button>
)

// tslint:disable-next-line:variable-name
export const AppLogo = ({ text, inverse = false, textStyle = {} }:{text?:string, inverse?:boolean, style?, textStyle?:any}) => (
	<View style={styles.viewLogo}>
		<Image
			resizeMode="contain"
			style={styles.imgHeader}
			source={inverse ? require('assets/app-favicon.png') : require('assets/app-logo-white.png')}
		/>
		{text && <Text style={inverse ? [styles.hatchersTextInverse, textStyle] : [styles.hatchersText, textStyle]}>{text}</Text>}
	</View>
)

export default WaitingBuildScreen;
