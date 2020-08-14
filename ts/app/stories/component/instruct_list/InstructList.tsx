import * as React from 'react';
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import { Button, Text } from 'native-base';
import { S3_PATH_CONTENT } from 'root/envVars';

// tslint:disable-next-line:variable-name
export const InstructList = ({ data }) => {
	return (
		<FlatList
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			pagingEnabled={true}
			onEndReachedThreshold={0.5}
			removeClippedSubviews={true}
			data={data}
			style={styles.list}
			// tslint:disable-next-line:jsx-no-lambda
			renderItem={item => renderItem(item)}
			keyExtractor={keyExtractor}
		/>
	)
}

const keyExtractor = ({ idImage }) => idImage.toString();
const renderItem = ({ item }) => {
	return <ListCard {...item} />
}

// tslint:disable-next-line:variable-name
const ListCard = (item) => {
	const { idImage, piChannel } = item;
	const image = {
		uri: `${S3_PATH_CONTENT}/${piChannel}`,
		priority: FastImage.priority.normal
	}

	return <FastImage key={idImage} source={image} resizeMode={"cover"} style={styles.cardImage} />
}

// tslint:disable-next-line:variable-name
export const IntroButton = ({ onPress, left, text }) => {
	return (
		<Button onPress={onPress} transparent={true} color="white" style={[styles.absoluteBottomButton, left ? styles.left : styles.right]}>
			<Text style={styles.buttonText}>{text}</Text>
		</Button>
	)
}
