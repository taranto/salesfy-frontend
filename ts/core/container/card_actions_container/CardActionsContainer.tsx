import * as React from "react";
import { connect } from "react-redux";
import { CardActionsScreen } from "screens";
import { favorite } from "app-core/redux_store/content/Actions"
import { LK_SHARE_CONTENT_PREFIX } from "root/envVars";
import Clipboard from "native/Clipboard";
import Share from "native/Share";

interface IProps {
	idContent: number,
	nmContent: string,
	dsContent: string,
	dispatch: any,
	isFavorite?: boolean,
	isLike?: boolean,
	lkContent?: string,
	isFooter?: boolean,
	shShowActionButtons: boolean,
	actionButton: JSX.Element,
	shShowFullscreenImage: boolean,
	qtLike?: number
	disabled?: boolean
}

class CardActionsContainer extends React.Component<IProps> {

	constructor(props) {
		super(props);

		this.onSocialPress = this.onSocialPress.bind(this);
		this.onFavoritePress = this.onFavoritePress.bind(this);
		this.onLikePress = this.onLikePress.bind(this);
	}

	public onLikePress() {
		// const { dispatch, idContent } = this.props;

		// dispatch(like(idContent));
	}

	public onFavoritePress() {
		const { dispatch, idContent, isFavorite } = this.props;

		dispatch(favorite(idContent, isFavorite))
	}

	public onSocialPress() {
		const { idContent, nmContent, dsContent } = this.props;

		const shareOptions = {
			title: nmContent,
			subject: nmContent,
			message: dsContent,
			url: `${LK_SHARE_CONTENT_PREFIX}?id=${idContent}`
		};
		Share.open(shareOptions);
	}

	public share(social) {
		if (social === "copy-link") {
			const { idContent } = this.props;
			Clipboard.setString(`${LK_SHARE_CONTENT_PREFIX}?id=${idContent}`);
		} else {
			const { idContent, nmContent, dsContent } = this.props;

			const shareOptions = {
				title: nmContent,
				subject: nmContent,
				message: dsContent,
				url: `${LK_SHARE_CONTENT_PREFIX}?id=${idContent}`,
				social
			};

			Share.open(shareOptions);
		}
	}

	public render() {
		const { isFavorite, isFooter, isLike, shShowActionButtons, actionButton, lkContent, shShowFullscreenImage, qtLike, disabled } = this.props;

		return (
			<CardActionsScreen
				onFavoritePress={this.onFavoritePress}
				onLikePress={this.onLikePress}
				onSocialPress={this.onSocialPress}
				isFavorite={isFavorite}
				isLike={isLike}
				isFooter={isFooter}
				shShowActionButtons={shShowActionButtons}
				actionButton={actionButton}
				lkContent={lkContent}
				shShowFullscreenImage={shShowFullscreenImage}
				qtLike={qtLike}
				disabled={disabled}
			/>
		)
	}
}

export default connect()(CardActionsContainer);
