import * as React from "react";

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
	qtLike?: number
	disabled?: boolean
}

const CardActionsScreen = (props: IProps) => {
	const {
		actionButton,
	} = props;

	return (
		<>
			{actionButton}
		</>
	)
}

export default CardActionsScreen;
