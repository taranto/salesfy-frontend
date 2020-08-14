import React from 'react';
import { View } from 'react-native';
import { Translation } from 'app-core/utils/translate/Translation';
import { Text, Button } from 'native-base';
import FastImage from 'react-native-fast-image';
import styles from './styles';

export const FacebookButton = (props) => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={props.handleFacebookLogin}
				style={styles.button}
			>
				<FastImage style={styles.img} resizeMode={"contain"} source={require("assets/facebook.png")} />
				<Text style={{ width: 150, textAlign: "left", color: "#4267B2" }}>{Translation.logInWithFacebook}</Text>
			</Button>
		</View>
	)
}

export const GoogleButton = (props) => {
	return (
		<View style={styles.buttonContainer}>
			<Button
				onPress={props.signIn}
				style={styles.button}
			>
				<FastImage style={styles.img} resizeMode={"contain"} source={require("assets/search.png")} />
				<Text style={{ width: 150, textAlign: "left", color: "dark-gray" }}>{Translation.logInWithGoogle}</Text>
			</Button>
		</View>
	)
}
