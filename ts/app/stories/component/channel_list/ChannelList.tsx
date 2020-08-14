import React from 'react';
import defaultStyle, { smallStyles } from './styles'
import { FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';
import platform from 'app/theme/variables/platform';
import { emptyComponent, listLoading } from 'app/stories/component/content_list/ContentList';
import { Card, View, Text, H3 } from 'native-base';
import { ListHeaderTitle } from 'app/stories/component/list/List';
import { S3_PATH_CONTENT } from 'root/envVars';
import { Row } from 'native-base';
import { Col } from 'native-base';

// tslint:disable

export const SimpleChannelList = ({ data, onConversion = () => {}, style ={} }) => {
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			removeClippedSubviews={true}
			data={data}
			scrollEventThrottle={16}
			renderItem={item => renderItem(item, onConversion)}
			keyExtractor={keyExtractor}
			style={style}
		/>
	)
}

export const ChannelList = ({ flatRef, headerMessage, headerDescription, showFavorite, showChannelsAward, showFeed, onScrollEndDrag, onViewableItemsChanged, refreshing, isLoading, isRemaining, data, onEndReached, onConversion }) => {
	return (
		<FlatList
			ref={flatRef}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			onEndReached={onEndReached}
			removeClippedSubviews={true}
			data={data}
			refreshControl={
				<RefreshControl
					enabled={true}
					refreshing={refreshing && !isLoading}
					onRefresh={onScrollEndDrag}
					tintColor={platform.defaultSpinnerColor}
				/>
			}
			scrollEventThrottle={16}
			ListHeaderComponent={listHeader({ data, headerMessage, headerDescription })}
			renderItem={item => renderItem(item, onConversion)}
			keyExtractor={keyExtractor}
			ListFooterComponent={listLoading(isLoading, isRemaining)}
			ListEmptyComponent={emptyComponent(!isLoading && data.length === 0, showFavorite, showChannelsAward, showFeed)}
			onViewableItemsChanged={onViewableItemsChanged}
		/>
	)
}

const listHeader = ({ data, headerMessage, headerDescription }) => {
	if (data.length === 0) {
		return;
	}
	return headerMessage && (
		<ListHeaderTitle title={headerMessage} description={headerDescription} />
	)
}
const keyExtractor = ({ idChannel }) => idChannel.toString();
const renderItem = ({ item }, onConversion) => {
	return <ChannelListCard {...item} onConversion={onConversion} />
}

export const ChannelListCard = (item) => {
	const { idChannel, dsChannel, nmChannel, piChannel, onConversion, isSmall } = item;
	const onTouch = () => onConversion(item);

	const image = {
		uri: `${S3_PATH_CONTENT}/${piChannel}`,
		priority: FastImage.priority.normal
	}

	const styles = isSmall ? smallStyles.styles : defaultStyle.styles;
	const linesDescription = isSmall ? smallStyles.linesDescription : defaultStyle.linesDescription;

	return (
		// tslint:disable-next-line:jsx-no-lambda
		<View>
			<TouchableWithoutFeedback onPress={onTouch}>
				<Card style={styles.card}>
					<Row>
						<Col>
							<FastImage key={idChannel} source={image} style={styles.cardImage} />
						</Col>
						<Col style={styles.content}>
							{nameContent({ nmChannel, dsChannel, styles, linesDescription })}
							{description({ nmChannel, dsChannel, styles, linesDescription })}
						</Col>
					</Row>
				</Card>
			</TouchableWithoutFeedback>
		</View>
	)
}

const description = ({ dsChannel, nmChannel, linesDescription, styles }) => {
	if (!dsChannel) {
		return;
	}

	return <Text style={[styles.paddingItem, styles.description]} numberOfLines={nmChannel ? linesDescription : linesDescription + 2}>{dsChannel}</Text>
}

const nameContent = ({ nmChannel, dsChannel, linesDescription, styles }) => {
	if (!nmChannel) {
		return;
	}
	return <H3 style={[styles.paddingItem, styles.headerItem]} numberOfLines={dsChannel ? 2 : linesDescription + 2}>{nmChannel}</H3>
}
