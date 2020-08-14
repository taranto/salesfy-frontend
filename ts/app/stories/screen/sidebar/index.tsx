import * as React from "react";
import { Text, Container, ListItem, Content, Left, Icon, Body, View } from "native-base";
import { FlatList, Image } from 'react-native';

import styles from "./styles";
import { S3_PATH_CONTENT } from 'root/envVars';
import FastImage from 'react-native-fast-image';
import { RegExpConst } from "salesfy-shared";

export interface IProps {
	navigation: any;
	routes: any;
	onPress:any;
	user:any;
}

/*
{ text: "Termos de uso", icon: "ios-paper-outline", iconColor: "#477bb9", type: "term" },
	{ text: "Política de privacidade", icon: "ios-lock-outline", iconColor: "#477bb9", type: "privacity" },
	{ text: "Política de conteúdos", icon: "ios-book-outline", iconColor: "#477bb9", type: "content" },
	{ text: "Publique em Hatchers", icon: "megaphone", iconColor: "#477bb9", type: "market" },
	{ text: "Sair", icon: "ios-exit-outline", iconColor: "#477bb9", type: "logoff" }
*/

export default class Sidebar extends React.Component<IProps> {

	public renderItem = (actionItem, onPress) => {
		return (
			<ListItem onPress={() => onPress(actionItem.type)} style={styles.item} icon={true}>
			<Left style={styles.leftColumn}>
				<Icon
					name={actionItem.icon}
					style={{color: "white"}}
				/>
			</Left>
			<Body style={styles.body}>
				<Text style={styles.bodyText}>{actionItem.text}</Text>
			</Body>
		</ListItem>
		);
	}

	public render() {
		const { onPress, user } = this.props;

		let image = require("assets/profile.png");
		if(user.piAvatar){
			image = RegExpConst.HTTP_S.test(user.piAvatar) ? {uri: user.piAvatar} : {uri: `${S3_PATH_CONTENT}/${user.piAvatar}`};
		}
		return (
			<Container>
				<Content style={styles.sideBar}>
						<View style={styles.headerView}>
							<FastImage style={styles.imgUser} source={image}/>
							<Text style={styles.headerText}>{user.nmUser}</Text>
							<Text style={styles.headerText}>{user.emUser}</Text>
						</View>
						<FlatList
							data={this.props.routes}
							keyExtractor={(item:any) => `${item.type}`}
							renderItem={({item}) => this.renderItem(item, onPress)}
						/>
				</Content>
			</Container>
		);
	}
}
