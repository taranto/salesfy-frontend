import * as React from "react";
import { Icon, Button, View } from "native-base";
import styles from "./styles";
import platform from "app/theme/variables/platform";

const ItemContainer = (item) => (
	item.isFooter ? item.children :
		<View style={item.lkContent && item.lkContent !== '' ? styles.buttonContainer : styles.buttonContainerCenter}>{item.children}</View>
)

export const SocialShareButton = ({ onPress, children, isFooter, lkContent, shShowFullscreenImage }) => {
	// tslint:disable-next-line:max-line-length
	const fabStyle = isFooter ? { backgroundColor: platform.footerDefaultBg, borderRadius: 0 } : {};
	const color = { color: !isFooter && shShowFullscreenImage ? "white" : platform.categoryText }
	return (
		<ItemContainer isFooter={isFooter} lkContent={lkContent}>
			<Button onPress={onPress} style={[styles.buttons, fabStyle]} rounded={true} transparent={true} icon={true}>
				<Icon
					style={[styles.shareIcon, color]}
					name={"md-share"}
					android={"md-share"}
					ios={"ios-share"}
				/>
				{children}
			</Button>
		</ItemContainer>)
}

export const FavoriteButton = ({ onPress, isFavorite, isFooter, lkContent, shShowFullscreenImage }) => {
	// tslint:disable-next-line:max-line-length
	const color = { color: !isFavorite ? !isFooter && shShowFullscreenImage ? "white" : platform.categoryText : platform.activeFavorite }
	const fabStyle = isFooter ? { backgroundColor: platform.footerDefaultBg, borderRadius: 0 } : {};
	// let animated;
	// const animatePress = (evt) => animate(evt, animated, onPress)
	return (
		<ItemContainer isFooter={isFooter} lkContent={lkContent}>
			<Button onPress={onPress} style={[styles.buttons, fabStyle]} rounded={true} transparent={true} icon={true}>
				<Icon
					style={[styles.shareIcon, color]}
					name={'md-bookmark'}
					android={'md-bookmark'}
					ios={isFavorite ? "ios-bookmark" : "ios-bookmark"}
				/>
			</Button>
		</ItemContainer>)
}

export const LikeButton = ({ onPress, isLike, isFooter, lkContent, qtLike, shShowFullscreenImage }) => {
	// tslint:disable-next-line:max-line-length
	const color = { color: !isLike ? !isFooter && shShowFullscreenImage ? "white" : platform.categoryText : platform.activeLike }
	const fabStyle = isFooter ? { backgroundColor: platform.footerDefaultBg, borderRadius: 0 } : {};
	// let animated;
	// const animatePress = (evt) => animate(evt, animated, onPress)

	// const qtLabel = qtLike && qtLike > 0 && <Text style={[styles.textCount, color]}>{qtLike}</Text>;

	return (
		<ItemContainer isFooter={isFooter} lkContent={lkContent}>
			{countLabel(qtLike, color)}
			<Button onPress={onPress} style={[styles.buttons, fabStyle]} rounded={true} transparent={true} icon={true}>
				<Icon
					style={[styles.shareIcon, color]}
					name={'md-thumbs-up'}
					android={'md-thumbs-up'}
					ios={isLike ? "ios-thumbs-up" : "ios-thumbs-up"}
				/>
			</Button>
		</ItemContainer>)
}

const countLabel = (_qtLike, _style) => {
	return;
	/*if(!qtLike || qtLike === 0){
		return;
	}
	return <Text style={[styles.textCount, style]}>{qtLike}</Text>*/
}

const BUTTONS = [
	{ text: "Facebook", icon: "logo-facebook", iconColor: "#4267b2", type: "facebook" },
	{ text: "Whatsapp", icon: "logo-whatsapp", iconColor: "#34af23", type: "whatsapp" },
	{ text: "Twitter", icon: "logo-twitter", iconColor: "#00aced", type: "twitter" },
	{ text: "Copiar Link", icon: "link", iconColor: "#606060", type: "copy-link" },
	{ text: "Email", icon: "mail", iconColor: "#f47442", type: "email" }
];

if (platform.platform === "ios") {
	BUTTONS.push({ text: "Cancelar", icon: "close", iconColor: "red", type: "close" })
}

export const SocialShareItems = () => {
	return BUTTONS;
}
