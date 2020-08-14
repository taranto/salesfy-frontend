import * as React from "react";
import { View, Footer, FooterTab } from "native-base";
import styles from "./styles";
import { SocialShareButton, FavoriteButton, LikeButton } from "app/stories/component";
import ActionSheet from "app/stories/component/actionsheet/ActionSheet";

interface IProps {
	onSocialPress: () => void,
	onFavoritePress: () => void,
	onLikePress: () => void,
	isFooter?: boolean,
	isFavorite?: boolean,
	isLike?: boolean,
	lkContent?: string,
	shShowActionButtons: boolean,
	actionButton: JSX.Element,
	shShowFullscreenImage: boolean,
	qtLike?:number,
	disabled?
}

class CardActionsScreen extends React.Component<IProps> {
	constructor(props) {
		super(props)
	}

	public render() {
		const {
			isFooter, onSocialPress, onFavoritePress,
			onLikePress, isLike, isFavorite, actionButton,
			lkContent, shShowFullscreenImage, shShowActionButtons, qtLike
		} = this.props;

		const children = <ActionSheet ref="actionSheet" autoHide={false} duration={0} message={'abc'} />;
		return (
			<ContainerButtons isFooter={isFooter} style={isFooter ? styles.viewFooter : styles.view}>
				{shShowActionButtons && SocialShareButton({ onPress: onSocialPress, children, isFooter, lkContent, shShowFullscreenImage })}
				{shShowActionButtons && LikeButton({ isLike, onPress: onLikePress, isFooter, lkContent, qtLike, shShowFullscreenImage })}
				{shShowActionButtons && FavoriteButton({ isFavorite, onPress: onFavoritePress, isFooter, lkContent, shShowFullscreenImage })}
				{actionButton}
			</ContainerButtons>
		);
	}
}

// tslint:disable-next-line:variable-name
const ContainerButtons = (props) => {
	const { isFooter, children } = props;

	return isFooter ?
		(
			<Footer {...props}>
				<FooterTab>
					{children}
				</FooterTab>
			</Footer>
		) : (
			<View {...props}>
				{children}
			</View>
		)
}

export default CardActionsScreen;
