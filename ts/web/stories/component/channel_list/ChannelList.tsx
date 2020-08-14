import React from 'react';
import { S3_PATH_CONTENT, CARD_CHANNEL_PROPORTION, CARD_CHANNEL_WIDTH, CARD_CHANNEL_MOBILE_WIDTH, DEFAULT_ENTER_DELAY } from 'root/envVars';
import { Card, CardMedia, GridListTile, CardActions, Tooltip } from '@material-ui/core';
import { ProgressiveList } from 'web/stories/component/progressive-list/ProgressiveList';
import { withRouter } from 'react-router-dom';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';
import { connect, useSelector } from 'react-redux';
import CardMenu from 'web/stories/component/card_menu/CardMenu';
import { PageCircularLoader } from 'components';
import { CardContent } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { CtChannelView } from 'salesfy-shared'
import { Translation } from 'app-core/utils/translate/Translation';
import { cardStyleByState, cardLabelByState } from 'web/utils/cardState/CardState';
import { CtCardState, RegExpConst } from 'salesfy-shared';
import styles from "./styles";

// tslint:disable

const SimpleChannelList = ({ isLoading, data, onEndReached, onConversion, hasPowerInItem, setOpenDetails, history, deleteChannel, listHeader, isTagChange }) => {
	if (isTagChange && isLoading) {
		return <PageCircularLoader className="list-loader" />
	} else if (data && data.length === 0) {
		return isLoading ? <PageCircularLoader className="list-loader" /> : (
			<>
				{listHeader && listHeader()}
				{emptyComponent && emptyComponent()}
			</>
		)
	}
	return (
		<div className="channel-list">
			<ProgressiveList
				listHeader={listHeader} //made father prop
				listHeaderHeight={255}
				rowHeight={(CARD_CHANNEL_WIDTH * CARD_CHANNEL_PROPORTION) + 10}
				cardWidth={CARD_CHANNEL_WIDTH + 40}
				rowHeightMobile={(CARD_CHANNEL_MOBILE_WIDTH * CARD_CHANNEL_PROPORTION) + 10}
				cardWidthMobile={CARD_CHANNEL_MOBILE_WIDTH + 40}
				renderItem={renderChannelListItem} //made here
				data={data} //made father prop
				onEndReached={onEndReached} //made father prop
				onConversion={onConversion} //made father prop
				hasPowerInItem={hasPowerInItem} //made father prop
				history={history} //made father prop 
				deleteChannel={deleteChannel} //made father prop
				isLoading={isLoading} //made father prop
				setOpenDetails={setOpenDetails} //made father prop
			/>
		</div>
	)
}

export const emptyComponent = () => {
	return (
		<div className="list-empty" >
			<Typography style={{ ...styles.hatchersText, ...styles.viewLogo, marginLeft: 30, marginRight: 30, textAlign: "center" }}>{Translation.emptyChannel}</Typography>
		</div>
	)
}
// final statement of that script
export const ChannelList = withRouter(connect()(SimpleChannelList));

// IS a property for ProgressiveList
export const renderChannelListItem = ({ item, onConversion, hasPowerInItem, history, deleteChannel, setOpenDetails }) => {
	return <ChannelListCard {...item} setOpenDetails={setOpenDetails} onConversion={onConversion} hasPowerInItem={hasPowerInItem} history={history} deleteChannel={deleteChannel} />
}
// goes inside ChannelListCard
const ChannelTooltip = (item) => {
	const { children, nmChannel, dsChannel, nmPublisher, keyCtContentState } = item;

	if (!nmChannel) {
		return <>{children}</>
	}

	const placeholder = <React.Fragment>
		<p>{nmChannel}{cardLabelByState(CtCardState.get(keyCtContentState))}</p>
		{dsChannel && <p>{dsChannel}</p>}
		{nmPublisher ? (<p>{`${Translation.nmPublisher} ${nmPublisher}`}</p>) : ''}
	</React.Fragment>

	return (
		<Tooltip enterDelay={DEFAULT_ENTER_DELAY} title={placeholder}>
			{children}
		</Tooltip>
	)
}
// goes inside renderChannelListItem (that goes inside ProgressiveList)
export const ChannelListCard = (item) => {
	const presentation = useSelector(state => state.app.presentation);
	const { setOpenDetails, idChannel, children, idCtChannelView, piChannel, imagePreviewUrl, nmChannel, dsChannel, isPlaybook, onConversion, history, hasPowerInItem, deleteChannel } = item;

	const hasPower = hasPowerInItem(item);

	const params = {
		idChannel, piChannel, nmChannel, dsChannel, idCtChannelView, isPlaybook, hasPower
	}

	const onTouch = () => {
		history.push(RoutesAppEnum.channelContent.route, { fromChannel: true, isChannel: true, ...params })
		onConversion(item);
	}
	const onEdit = () => {
		setOpenDetails({ open: true, params });
	}
	const onCopy = () => {
		setOpenDetails({ open: true, params: { ...params, isCopy: true } });
	}
	const onNew = () => {
		history.push(RoutesAppEnum.contentDetails.route, { ...params })
	}

	const isWideScreen = CtChannelView.widescreen.key === idCtChannelView;

	let image = RegExpConst.HTTP_S.test(piChannel) ? piChannel : `${S3_PATH_CONTENT}/${piChannel}`;

	if (!image) {
		image = require('assets/attach.png');
	}

	const cssCardState = presentation?"":cardStyleByState(CtCardState.get(item.keyCtContentState))

	return (
		<GridListTile key={item.idContent} cols={1} rows={1} className="tile">
			<ChannelTooltip {...item}>
				<Card key={idChannel} className={`card ${cssCardState}`} onClick={!children ? onTouch : () => { }}>
					{children}
					<CardMedia
						className={`card-image ${isWideScreen ? 'widescreen' : ''}`}
						image={imagePreviewUrl ? imagePreviewUrl : image}
					/>
					<CardContent className="card-content">
						{!isWideScreen && nmChannelLayout({ nmChannel, dsChannel, idChannel })}
						{!isWideScreen && dsChannelLayout({ dsChannel })}
					</CardContent>
					{!presentation && <CardActions className="card-actions">
						<CardMenu onEditClick={onEdit} hasPower={hasPower} onRemoveClick={() => deleteChannel(item)} onNewClick={onNew} onCopyClick={onCopy} />
					</CardActions>}
				</Card>
			</ChannelTooltip>
		</GridListTile >
	)
}
//goes inside card of channelList
const nmChannelLayout = ({ nmChannel, dsChannel, idChannel }) => {
	if (!nmChannel && idChannel) {
		return;
	}
	if (dsChannel) {
		return (
			<Typography component="h3" className="card-channel-title" >{nmChannel}</Typography>
		)
	}
	return (
		<Typography component="h3" className="dsChannel-free" >{nmChannel}</Typography>
	)
}
//goes inside card of channelList
const dsChannelLayout = ({ dsChannel }) => {
	return (
		<Typography component="p" className="description">{dsChannel}</Typography>
	)
}
