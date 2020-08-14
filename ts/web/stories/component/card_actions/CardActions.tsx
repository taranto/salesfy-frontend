import * as React from "react";
import { Button } from "@material-ui/core";
import { Bookmark, ThumbUp } from "@material-ui/icons";
import { Translation } from 'app-core/utils/translate/Translation';

const platform = {
	footerDefaultBg: "#F8F8F8",
	categoryText: "#7f7f7f",
	activeFavorite: "#670000",
	activeLike: "#477bb9"
}

export const SocialShareButton = ({ disabled, onPress, children }) => {
	return (
		<Button variant="text" size="small" disabled={disabled} onClick={!disabled && onPress}>
			{Translation.share}
			{children}
		</Button>
	)
}

export const FavoriteButton = ({ disabled, onPress }) => {
	return (
		<Button disabled={disabled} onClick={!disabled && onPress}>
			<Bookmark />
		</Button>
	)
}

export const LikeButton = ({ disabled, onPress, isLike, isFooter, qtLike, shShowFullscreenImage }) => {
	const color = { color: !isLike ? !isFooter && shShowFullscreenImage ? "white" : platform.categoryText : platform.activeLike }
	return (
		<>
			{countLabel(qtLike, color)}
			<Button disabled={disabled} onClick={!disabled && onPress}>
				<ThumbUp />
			</Button>
		</>
	)
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

// tslint:disable-next-line:variable-name
export const SocialShareItems = () => {
	return BUTTONS;
}
