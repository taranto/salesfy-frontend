import React from 'react';
import styles from './styles'
import { FlatList, TouchableHighlight } from 'react-native';
import FastImage from 'react-native-fast-image';
import { View, Text, Icon } from 'native-base';
import { PageCircularLoader } from 'app/stories/component';
import { S3_PATH_CONTENT } from 'root/envVars';

// tslint:disable

export const ChannelStoriesList = ({ isLoading, isRemaining, data, onRead, onEndReached }) => {
	return (
		<FlatList
			style={styles.flatList}
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			onEndReached={onEndReached}
			removeClippedSubviews={true}
			data={data}
			scrollEventThrottle={16}
			renderItem={item => renderItem(item, onRead)}
			keyExtractor={keyExtractor}
			ListFooterComponent={listLoading(isLoading, isRemaining, data)}
		/>
	)
}

const listLoading = (isLoading, isRemaining, data) => {
	if (data && data.length > 0 && isRemaining && isLoading) {
		return <View style={styles.cardImage}><PageCircularLoader style={styles.cardFullDummy} /></View>;
	} else {
		return;
	}
}

const keyExtractor = ({ idChannel }) => idChannel.toString();
const renderItem = ({ item }, onConversion) => {
	return item.idChannel === 0 ? <PublishCard {...item} onConversion={onConversion} /> : <ChannelListCard {...item} onConversion={onConversion} />
}

const getCardStyle = (item) => {
	const { hasUnread } = item;
	if (hasUnread) {
		return styles.cardSelected;
	}
	return styles.card;
}

export const ChannelListCard = (item) => {
	const { idChannel, piChannel, piIcon, onConversion } = item;
	const onTouch = () => onConversion(item);

	const image = {
		uri: `${S3_PATH_CONTENT}/${piIcon ? piIcon : piChannel}`,
		priority: FastImage.priority.normal
	}

	return (
		<View style={styles.cardImageView}>
			<TouchableHighlight underlayColor="#cec4c4" onPress={onTouch} style={styles.touchableHighlight}>
				<View style={getCardStyle(item)}>
					<FastImage key={idChannel} resizeMode="cover" source={image} style={styles.cardImage} />
				</View>
			</TouchableHighlight>
			<Text numberOfLines={2} style={styles.tagStorie}>{item.nmChannel}</Text>
		</View>
	)
}

export const PublishCard = (item) => {
	const { idChannel, onConversion } = item;
	const onTouch = () => onConversion(item);

	return (
		<View style={styles.cardImageView}>
			<TouchableHighlight underlayColor="#cec4c4" onPress={onTouch} style={styles.touchableHighlight}>
				<View style={styles.cardPublish}>
					<View style={styles.cardImage}>
						<FastImage
							key={idChannel}
							resizeMode="contain"
							source={require('assets/app-favicon30x30.png')}
							style={styles.cardImagePublish}
						/>
					</View>
					<View style={styles.iconAddView}>
						<Icon style={styles.iconAdd} name="add" />
					</View>
				</View>
			</TouchableHighlight>
			<Text numberOfLines={2} style={styles.tagStorie}>{item.nmChannel}</Text>
		</View>
	)
}
