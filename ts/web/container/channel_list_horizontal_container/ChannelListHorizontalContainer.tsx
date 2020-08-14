import React, { useState } from 'react';
import { ChannelListHorizontal } from 'web/stories/component/channel_list/ChannelListHorizontal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChannelData } from 'app-core/redux_store/channel/Actions';
import ChannelDetailsContainer from 'app-core/container/channel_details_container/ChannelDetailsContainer';
import { useHistory } from 'react-router-dom';
import { CtUserGroupAccess } from 'salesfy-shared';

export const ChannelListHorizontalContainer = (props) => {
	const [openDetails, setOpenDetails] = useState({ open: false, params: {} });
	const dispatch = useDispatch();
	const idUser = useSelector(state => state.user.idUser)
	const history = useHistory()

	const hasPowerInItem = (item) => {
		const { idCtUserGroupAccess, idPublisher } = item;
		return idCtUserGroupAccess === CtUserGroupAccess.admin.key || idPublisher === idUser;
	}

	const deleteChannel = ({ idChannel }) => {
		dispatch(deleteChannelData({ idChannel }));
	}

	return (
		<>
			<ChannelDetailsContainer reloadList={() => ({})} openDetails={openDetails} setOpenModal={setOpenDetails} />
			<ChannelListHorizontal
				hasPowerInItem={hasPowerInItem}
				deleteChannel={deleteChannel}
				setOpenDetails={setOpenDetails}
				{...props}
				history={history}
			/>
		</>
	)
}
