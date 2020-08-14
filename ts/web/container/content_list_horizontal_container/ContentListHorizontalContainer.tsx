import React from 'react';
import { ContentListHorizontal } from 'web/stories/component/content_list/ContentListHorizontal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContentData } from 'app-core/redux_store/content/Actions';
import { setContentConversion } from 'app-core/redux_store/content/Actions';
import { CtUserGroupAccess } from 'salesfy-shared';

export const ContentListHorizontalContainer = (props) => {
	const dispatch = useDispatch();
	const idUser = useSelector(state => state.user.idUser)

	const onConversion = (item) => {
		if (item.lkContent) {
			dispatch(setContentConversion(item));
		}
	}

	const deleteContent = ({ idContent }) => {
		dispatch(deleteContentData({ idContent }));
	}

	const hasPowerInItem = (item) => {
		const { idCtUserGroupAccess, idPublisher } = item;
		return idCtUserGroupAccess === CtUserGroupAccess.admin.key || idPublisher === idUser;
	}

	return (
		<ContentListHorizontal
			hasPowerInItem={hasPowerInItem}
			onConversion={onConversion}
			deleteContent={deleteContent}
			{...props}
		/>
	)
}
