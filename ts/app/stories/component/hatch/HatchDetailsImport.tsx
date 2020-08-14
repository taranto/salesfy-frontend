import React from 'react';
import { CtPlatform, I18n, KeyEnum } from 'salesfy-shared';
import { Form, Card, CardItem, Body, Text } from 'native-base';
import { FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { ListHeaderTitle } from 'app/stories/component/list/List';
import { Translation } from 'app-core/utils/translate/Translation';

const typesImport = [
	{ ...CtPlatform.facebook },
	{ ...CtPlatform.youtube },
	{ ...CtPlatform.tumblr },

	{ ...CtPlatform.linkedin },
	{ ...CtPlatform.instagram },
	{ ...CtPlatform.twitter },

	{ ...CtPlatform.medium },
	{ ...CtPlatform.blog },
	{ ...CtPlatform.outros }
]

interface IProps {
	onValueChange: any,
	ctPlatform: any
}
export class HatchDetailsImport extends React.Component<IProps> {
	constructor(props) {
		super(props);
	}
	/*
	public getSourceImage = (keyCtPlatform) => {
		
		switch (keyCtPlatform) {
			case CtPlatform.facebook.keyCtPlatform:
				return require("assets/facebook.png");
			case CtPlatform.youtube.keyCtPlatform:
				return require("assets/youtube.png");
			case CtPlatform.tumblr.keyCtPlatform:
				return require("assets/tumblr.png");
			case CtPlatform.linkedin.keyCtPlatform:
				return require("assets/linkedin.png");
			case CtPlatform.instagram.keyCtPlatform:
				return require("assets/instagram.png");
			case CtPlatform.blog.keyCtPlatform:
				return require("assets/blog.png");
			case CtPlatform.medium.keyCtPlatform:
				return require("assets/medium.png");
			case CtPlatform.outros.keyCtPlatform:
				return require("assets/others.png");
			case CtPlatform.twitter.keyCtPlatform:
				return require("assets/twitter.png");
		}
		
	}
	*/

	public keyExtractor = (item) => item.keyCtPlatform.toString();
	public renderImportType = ({ data, ctPlatform, onValueChange }) => (
		<this.ImportType item={data.item} ctPlatform={ctPlatform} onValueChange={onValueChange} />
	)

	// tslint:disable-next-line:variable-name
	public ImportType = ({ item, ctPlatform, onValueChange }) => {
		const cardStyle = ctPlatform === item.keyCtPlatform ? styles.cardTypeSelected : styles.cardType;
		return (
			// tslint:disable-next-line:jsx-no-lambda 
			<TouchableOpacity style={styles.cardType} onPress={() => onValueChange("ctPlatform", item.keyCtPlatform)}>
				<Card style={styles.cardType}>
					<CardItem style={cardStyle}>
						<Body style={styles.cardBodyType}>
							<Text style={styles.alignSelfCenter}>{item.nmCtPlatform}</Text>
						</Body>
					</CardItem>
				</Card>
			</TouchableOpacity>
		)
	}

	// <Image style={styles.imageImport} source={this.getSourceImage(item.keyCtPlatform)} />

	public render() {
		const { ctPlatform, onValueChange } = this.props;

		return (
			<Form style={styles.form}>
				<ListHeaderTitle title={Translation.importContent} description={I18n.t(KeyEnum.importSourceDescription)}/>
				<FlatList

					style={styles.flatList}
					data={typesImport}
					numColumns={3}
					extraData={this.props}
					keyExtractor={this.keyExtractor}
					renderItem={data => this.renderImportType({ data, ctPlatform, onValueChange })}
				/>
			</Form>
		)
	}
}
