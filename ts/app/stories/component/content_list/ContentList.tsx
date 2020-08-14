import React from 'react';
import {
	Card, CardItem,
	H3, Text, View, Button, Body, Container, Row, Col
} from 'native-base';
import styles, { linesDescription } from './styles'
import { FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import { PageCircularLoader } from 'components';
import { I18n, KeyEnum } from 'salesfy-shared';
import FastImage from 'react-native-fast-image'
import { FallbackCardImage } from 'app/stories/component/image/Image';
import { capitalize } from 'app-core/utils/string/StringUtils';
import platform from 'app/theme/variables/platform';
import { ShadeGradient } from 'app/stories/component/gradient/Gradient';
import { AppLogo } from 'app/stories/screen/transition_screen/TransitionScreen';
import { S3_PATH_CONTENT } from 'root/envVars';
import LogUtils from 'app-core/utils/LogUtils.ts/LogUtils';
import { ValHN } from 'salesfy-shared';
import { Translation } from 'app-core/utils/translate/Translation';

// tslint:disable

export const ContentList = (item) => {
	const { flatRef, listHeader, showFavorite, onScroll, extraData, showChannelsAward, showFeed, onScrollEndDrag, onViewableItemsChanged, refreshing, isLoading, isRemaining, data, onEndReached, onConversion, cardActions } = item;
	return (
		<FlatList
			ref={flatRef}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			onEndReached={onEndReached}
			removeClippedSubviews={true}
			data={data}
			extraData={extraData}
			refreshControl={
				<RefreshControl
					enabled={true}
					refreshing={refreshing && !isLoading}
					onRefresh={onScrollEndDrag}
					tintColor={platform.defaultSpinnerColor}
				/>
			}
			onScroll={onScroll}
			scrollEventThrottle={16}
			renderItem={item => renderItem(item, cardActions, onConversion)}
			keyExtractor={keyExtractor}
			ListHeaderComponent={showFeed && listHeader && listHeader()}
			ListFooterComponent={listLoading(isLoading, isRemaining)}
			ListEmptyComponent={emptyComponent(!isLoading && data.length === 0, showFavorite, showChannelsAward, showFeed)}
			onViewableItemsChanged={onViewableItemsChanged}
		/>
	)
}

export const emptyComponent = (showEmptyComponent, showFavorite, showChannelsAward, showFeed) => {
	let message = Translation.emptySearch;

	if (showFavorite) {
		message = I18n.t(KeyEnum.emptyFavorite);
	}

	if (showChannelsAward) {
		message = Translation.emptyChannel;
	}

	if (showFeed) {
		message = Translation.emptyFeed;
	}


	return showEmptyComponent &&
		(
			<Container style={styles.cardFullDummy}>
				<AppLogo text={message} textStyle={{ marginLeft: 30, marginRight: 30, textAlign: "center" }} inverse={true} />
			</Container>
		)
}

export const listLoading = (isLoading, isRemaining) => {
	// LogUtils.print({isRemaining});
	if (isRemaining) {
		return <PageCircularLoader style={styles.cardFullDummy} />;
	} else {
		if (isLoading) {
			return <PageCircularLoader style={styles.cardFullDummy} />;
		} else {
			return <View />
		}
	}
}
const keyExtractor = (item, index: number) => `${item.idContent}-${index}`;
const renderItem = ({ item }, cardActions, onConversion) => {
	return <ContentListCard {...item} cardActions={cardActions} onConversion={onConversion} />
}

export const ContentListCard = (item) => {
	const { idContent, nmContent,
		piContent, dsContent, nmPublisher, onConversion, cardActions,
		shShowTitle, shShowPublisher, shShowDescription, shShowActionButtons, nmCtContent,
		shShowShortCard, shShowFullscreenImage
	} = item;

	return (
		<TouchableWithoutFeedback onPress={() => onConversion(item)}>
			<Card style={styles.cardStyle}>
				<Col key={idContent} style={shShowShortCard ? styles.shortCard : shShowFullscreenImage ? styles.cardFull : styles.card}>
					{CardImage({ shShowShortCard, shShowFullscreenImage, piContent })}
					{CardContent({ shShowTitle, shShowShortCard, shShowPublisher, nmPublisher, nmCtContent, shShowDescription, nmContent, dsContent, shShowFullscreenImage })}
					{shShowFullscreenImage && <ShadeGradient style={styles.topShade} inverse={true}><View /></ShadeGradient>}
					{shShowFullscreenImage && <ShadeGradient style={styles.footerShade}><View /></ShadeGradient>}
					<CardItem footer style={styles.footer}>
						<Body>
							{cardActions(item, shShowActionButtons, actionButton(item, onConversion))}
						</Body>
					</CardItem>
				</Col>
			</Card>
		</TouchableWithoutFeedback>
	)
}

const CardAuthor = ({ shShowPublisher, nmPublisher, nmCtContent }) => {
	if (!shShowPublisher) {
		return;
	}
	return <Text note style={styles.authorText}>{`${capitalize(nmCtContent)} por ${nmPublisher}`}</Text>
}

const CardContent = ({ shShowTitle, shShowShortCard, shShowDescription, shShowPublisher, nmPublisher, nmCtContent, shShowFullscreenImage, dsContent, nmContent }) => {
	if (shShowShortCard || (!shShowTitle && !shShowDescription)) {
		return;
	}

	const piStyle = shShowFullscreenImage ? styles.cardItemVerticalAlign : { margin: 5 };
	const cardStyle = shShowFullscreenImage ? styles.cardItemContentPi : styles.cardItemContent;

	return (
		<CardItem cardBody style={piStyle}>
			<Row style={cardStyle}>
				{nameContent({ shShowTitle, dsContent, nmContent })}
				{CardAuthor({ shShowPublisher, nmPublisher, nmCtContent })}
				{description({ shShowDescription, dsContent, nmContent })}
			</Row>
		</CardItem>
	)
}

const nameContent = ({ shShowTitle, nmContent, dsContent }) => {
	if (!shShowTitle) {
		return;
	}
	return <H3 style={[styles.paddingItem, styles.headerItem]} numberOfLines={dsContent ? 2 : linesDescription + 2}>{nmContent}</H3>
}

const description = ({ shShowDescription, nmContent, dsContent }) => {
	if (!shShowDescription) {
		return;
	}

	return <Text style={[styles.paddingItem, styles.description]} numberOfLines={nmContent ? linesDescription : linesDescription + 2}>{dsContent}</Text>
}

const CardImage = ({ shShowShortCard, shShowFullscreenImage, piContent }) => {
	const image = { uri: ValHN.valNmKey('lkPiContent', piContent) ? piContent : `${S3_PATH_CONTENT}/${piContent}`, priority: FastImage.priority.normal }
	const piStyle = shShowFullscreenImage ?
		(shShowShortCard ? styles.cardImageShort : styles.cardImageFullHeight)
		: styles.cardImage;
	const cardStyle = shShowFullscreenImage ? styles.cardItemFull : {};

	return (
		<CardItem cardBody style={cardStyle} >
			{piContent && <FallbackCardImage source={image} style={piStyle} />}
		</CardItem>
	)
}

export const actionButton = (item, onConversion) => {
	if (item.lkContent && item.lkContent !== '') {
		const buttonItem = {
			nmButton: I18n.t(KeyEnum.viewLinkContent),
			shShowFullscreenImage: item.shShowFullscreenImage,
			onPress: () => onConversion(item)
		};

		return <ContentButton {...buttonItem} />
	}

	return;
}

// tslint:disable-next-line:variable-name
export const ContentButton = (item) => {
	const { nmButton, onPress, shShowFullscreenImage } = item;

	const styleText = shShowFullscreenImage ? styles.postButtonTextWhite : styles.postButtonText;

	return (
		<Button style={styles.postButton} transparent={true} onPress={onPress}>
			<Text numberOfLines={1} uppercase={true} style={styleText}>{nmButton}</Text>
		</Button >
	)
}
