import React, { useState } from 'react';
import CardMenu from 'web/stories/component/card_menu/CardMenu';
import useReactRouter from 'use-react-router';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';
import { useDispatch } from 'react-redux'
// import { like } from 'app-core/redux_store/content/Actions';
import { favorite, notify } from 'app-core/redux_store/content/Actions';
import { MenuItem, CircularProgress } from '@material-ui/core';
import Clipboard from 'native/Clipboard';
import { Bookmark, Share, NotificationImportant } from '@material-ui/icons';
import Alert from 'native/Alert';
import { Translation } from 'app-core/utils/translate/Translation';

export const CardContentMenu = ({ hasPower, deleteContent, dataRow }) => {
	const [loadingFavorite, setLoadingFavorite] = useState(false);
	const [loadingNotify, setLoadingNotify] = useState(false);
	const [data, setData] = useState(dataRow);
	const { history } = useReactRouter();
	const dispatch = useDispatch();

	const { idContent, lkContent, isFavorite } = data;

	const onEdit = () => {
		history.push(RoutesAppEnum.contentDetails.route, data)
	}
	const onCopyClick = () => {
		history.push(RoutesAppEnum.contentDetails.route, { ...data, isPlaybook: true, isCopy: true })
	}

	/*
	const onLikePress = (e) => {
		e.stopPropagation();
		dispatch(like(idContent));
	}*/

	const onFavoritePress = async (e) => {
		e.stopPropagation();
		setLoadingFavorite(true);
		try {
			const newData = await dispatch(favorite(idContent, !isFavorite));
			setData(newData)
			if (!isFavorite) {
				Alert.success(Translation.favoriteSuccess)
			} else {
				Alert.success(Translation.unfavoriteSuccess)
			}
		} catch (e) {
			Alert.warn(e)
		}
		setLoadingFavorite(false);
	}

	const onSocialPress = (e) => {
		e.stopPropagation();
		Clipboard.setString(`${lkContent}`);
	}

	const onNotifyPress = async (e) => {
		e.stopPropagation();
		setLoadingNotify(true);
		try {
			await dispatch(notify(idContent));
			Alert.success(Translation.notifySuccess)
		} catch (e) {}
		setLoadingNotify(false);
	}

	const dsFavorite = isFavorite?Translation.toUnfavorite:Translation.toFavorite

	return (
		<CardMenu
			hasPower={hasPower}
			onEditClick={onEdit}
			onRemoveClick={() => deleteContent(data)}
			onCopyClick={onCopyClick}
		>
			{hasPower && (<MenuItem className="menu-progress" onClick={onNotifyPress}>
				<NotificationImportant />{Translation.notifyUpdate}
				{loadingNotify && <CircularProgress size={24} className={"buttonProgress"} />}
			</MenuItem>)}
			<MenuItem className="menu-progress" onClick={onFavoritePress}>
				<Bookmark />
				{dsFavorite}
				{loadingFavorite && <CircularProgress size={24} className={"buttonProgress"} />}
			</MenuItem>
			<MenuItem onClick={onSocialPress}><Share />{Translation.share}</MenuItem>
		</CardMenu>
	)
}

// <MenuItem onClick={onLikePress}><Bookmark />Curtir</MenuItem>
