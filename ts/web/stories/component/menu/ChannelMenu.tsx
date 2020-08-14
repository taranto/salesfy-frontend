import React, { useState } from 'react';
import { ScreenMenu } from './ScreenMenu';
import ChannelDetailsContainer from 'app-core/container/channel_details_container/ChannelDetailsContainer';
import useReactRouter from 'use-react-router';

export const ChannelMenu = (params) => {
	const { history } = useReactRouter();
	const [openDetails, setOpenDetails] = useState({open: false, params: {}});
	const onEditClick = () => {
		setOpenDetails({open: true, params});
	}

	const onCopyClick = () => {
		setOpenDetails({open: true, params: {...params, isCopy: true}});
	}

	const onRemoveConfirm = () => {
		if(params.onConfirmRemove){
			params.onConfirmRemove(params);
			history.goBack();
		}
	}
	return (
		<>
			<ChannelDetailsContainer openDetails={openDetails} setOpenModal={setOpenDetails} />
			<ScreenMenu
				hasPower={params.hasPower}
				onEditClick={onEditClick}
				onCopyClick={onCopyClick}
				onRemoveConfirm={onRemoveConfirm}
			/>
		</>
	)
}
