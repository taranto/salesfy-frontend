import React from 'react';
import {
	Header, Body, Title, Left, Button, Icon, Card, CardItem, Text, List, Right
} from 'native-base';
import { Image } from 'react-native'
import styles from './styles'
import { CircularLoader, SecondaryGradient } from 'app/stories/component';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { I18n } from 'salesfy-shared';
import { KeyEnum } from 'salesfy-shared';

export const ContentHeader = ({ nmContent, onBack, isLoadingWebview }) => (
	<SecondaryGradient style={styles.bar}>
		<Header style={styles.header} hasTabs={true}>
			<Left style={styles.autoWidth}>
				<Button onPress={onBack} transparent={true}>
					<Icon name='ios-arrow-round-back' />
				</Button>
			</Left>
			<Body>
				<Title style={styles.textHeader}>{nmContent}</Title>
			</Body>
			<Right style={{flex: 0, width: 50}}>
			{isLoadingWebview && <CircularLoader size={"small"} inverse={true} />}
			</Right>
		</Header>
	</SecondaryGradient>
)

export const ContentButtonExternalUrl = (item) => {
	const { lkContent, nmButton } = item;
	const onPress = () => Linking.openURL(lkContent);

	return (
		// tslint:disable-next-line:max-line-length
		<Button style={styles.postButton} block={true} success={true} onPress={onPress}>
			<Text uppercase={true}>{nmButton}</Text>
		</Button >
	)
}

export const ContentDetails = ({ lkContent }) => {

	let lkTransformed = lkContent;
	if (!lkContent.toString().startsWith("http://") && !lkContent.toString().startsWith("https://")) {
		lkTransformed = `http://${lkContent}`;
	}
	return (
		<WebView startInLoadingState={true} source={{ uri: lkTransformed }} />
	)
}

export const ContentDetailsList = ({ }) => {
	return (
		<List style={styles.list} />
	)
}

// tslint:disable-next-line:max-line-length
const dsAuthor = "As empresas precisam crescer, e crescem através de ideias. Nós da Gestão por Ideias buscamos prover as empresas com diversas ideias que inspirem e contribuam para o crescimento contínuo dos negócios."
const piAuthor = "https://www.dropbox.com/s/5ywnvuwxb70k9mb/Autor1200x600.png?raw=1"
const nmPublisher = "Gestão por Ideias";

export const ContentAuthor = () => {
	return (
		<Card style={styles.card}>
			<CardItem cardBody={true}>
				<Image source={{ uri: piAuthor }} style={styles.cardImage} />
			</CardItem>
			<CardItem>
				<Text style={styles.authorText} uppercase={true}>{`${I18n.t(KeyEnum.publisher)}: ${nmPublisher}`}</Text>
			</CardItem>
			<CardItem>
				<Text style={styles.description}>{dsAuthor}</Text>
			</CardItem>
		</Card>
	)
}
