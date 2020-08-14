import React from 'react';
import styles from 'app/stories/component/tag_list/styles'
import { FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { listLoading } from 'app/stories/component/content_list/ContentList';
import { Text, Button, Row, Left, Body, Right, View } from 'native-base';
import { ListHeaderTitle } from 'app/stories/component/list/List';
import { S3_PATH_CONTENT } from 'root/envVars';

// tslint:disable

export const TagList = ({ isLoading, isRemaining, data, onSign, onUnsign, userTagLoading, extraData }) => {
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			onEndReachedThreshold={0.6}
			removeClippedSubviews={true}
			data={data}
			extraData={extraData}
			scrollEventThrottle={16}
			ListHeaderComponent={listHeader({ data, headerMessage: "Quais são seus assuntos de interesse?" })}
			renderItem={item => renderItem(item, onSign, onUnsign, userTagLoading)}
			keyExtractor={keyExtractor}
			ListFooterComponent={listLoading(isLoading, isRemaining)}
		/>
	)
}

const listHeader = ({ data, headerMessage }) => {
	if (data.length === 0) {
		return;
	}
	
	return <ListHeaderTitle title={headerMessage}></ListHeaderTitle>;
}
const keyExtractor = ({ idTag }) => idTag.toString();
const renderItem = ({ item }, onSign, onUnsign, userTagLoading) => {
	return <TagListCard {...item} onSign={onSign} onUnsign={onUnsign} userTagLoading={userTagLoading}/>
}

/*
	"idTag": 1
	"nmTag":"Marketing",
	"vlPriority":1,
	"isHidden":false
*/

export const TagListCard = (item) => {
	const { idTag, nmTag, piTag, isMerged, onSign, onUnsign } = item;

	// const piTagFake = "Appontmek14.jpg";

	const image = {
		uri: `${S3_PATH_CONTENT}/${piTag}`,
		priority: FastImage.priority.normal
	}

	return (
		// tslint:disable-next-line:jsx-no-lambda
		<View>
			<Row style={styles.row}>
				<Left style={styles.flexZero}>
					<FastImage key={idTag} source={image} style={styles.cardImage} />
				</Left>
				<Body>
					<Text numberOfLines={1} style={styles.text}>{nmTag}</Text>
				</Body>
				<Right style={styles.flexZero}>
					<MergeButton isMerged={isMerged} sign={() => onSign(item)} unsign={() => onUnsign(item)} />
				</Right>
			</Row>
		</View>
	)
}

export const MergeButton = ({ isMerged, sign, unsign }) => {
	if (isMerged) {
		return (
			<Button small={true} style={styles.buttonSelected} onPress={unsign}>
				<Text style={styles.buttonSelectedText}>Seguindo</Text>				
			</Button>
		)
	}

	return (
		<Button small={true} style={styles.button} bordered={true} onPress={sign}>
			<Text style={styles.buttonText}>Seguir</Text>
		</Button>
	)

}