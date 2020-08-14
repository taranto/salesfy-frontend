import React from 'react';
import styles from './styles'
import { S3_PATH_CONTENT } from 'root/envVars';
import { Card, Typography, CardMedia, GridListTile, IconButton } from '@material-ui/core';
import { Add, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import ReactResizeDetector from 'react-resize-detector';
import RoutesAppEnum from 'web/utils/routes/RoutesAppEnum';
import { connect, useSelector } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { cardStyleByState } from 'web/utils/cardState/CardState';
import { CtCardState, RegExpConst } from 'salesfy-shared';

const ChannelStoriesListRouter = ({ listRef, data, onRead, scrollToNext, scrollToBack, hasPowerInItem, hasScroll, onResize, history }) => {
	return (
		<div className="stories-list">
			{hasScroll ? <IconButton onClick={scrollToBack}>
				<KeyboardArrowLeft fontSize="large" />
			</IconButton> : <div className="dummy-arrow" />}
			<ul ref={listRef} className="grid-list">
				{data && data.map(item => renderItem({ item }, hasPowerInItem, onRead, history))}
			</ul>
			{hasScroll ? <IconButton onClick={scrollToNext}>
				<KeyboardArrowRight fontSize="large" />
			</IconButton> : <div className="dummy-arrow" />}
			<ReactResizeDetector handleWidth={true} onResize={onResize} />
		</div>
	)
}

interface IChannelStoriesList extends RouteComponentProps<any> {
	listRef, isLoading, data, onRead, scrollToNext, scrollToBack, hasScroll, onResize, isRemaining, onEndReached
}
export const ChannelStoriesList = withRouter<IChannelStoriesList, any>(connect()(ChannelStoriesListRouter))

const renderItem = ({ item }, hasPowerInItem, onConversion, history) => {
	return item.idChannel === 0 ?
		<PublishCard key={item.idChannel} {...item} onConversion={onConversion} history={history} />
		: <ChannelListCard key={item.idChannel} {...item} onConversion={onConversion} history={history} hasPowerInItem={hasPowerInItem} />
}

export const ChannelListCard = (item) => {
	const { piChannel, onConversion, idChannel, history, nmChannel, dsChannel, idCtChannelView, isPlaybook, hasPowerInItem } = item;
	const hasPower = hasPowerInItem(item);
	const presentation = useSelector(state => state.app.presentation);

	const params = {
		idChannel, piChannel, nmChannel, dsChannel, idCtChannelView, isPlaybook, hasPower
	}
	const onTouch = () => {
		history.push(RoutesAppEnum.channelContent.route, { fromChannel: true, isChannel: true, ...params })
		onConversion(item);
	}

	let image = RegExpConst.HTTP_S.test(piChannel) ? piChannel : `${S3_PATH_CONTENT}/${piChannel}`;

	if (!image) {
		image = require('assets/attach.png');
	}

	const cssCardState = presentation?"":cardStyleByState(CtCardState.get(item.keyCtContentState))

	return (
		<GridListTile key={item.idContent} cols={1} rows={1} className={`stories`}>
			<div style={styles.cardImageView} onClick={onTouch} >
				<Card style={styles.card} className={`${cssCardState}`}>
					<CardMedia
						image={image}
						style={styles.cardImage}
					/>
				</Card>
				<Typography component="p" style={styles.tagStorie} className="description">{item.nmChannel}</Typography>
			</div>
		</GridListTile>
	)
}

export const PublishCard = (item) => {
	const { onConversion, history } = item;
	const onTouch = () => {
		history.push(RoutesAppEnum.contentDetails.route, {})
		onConversion(item);
	}

	return (
		<GridListTile key={item.idContent} cols={1} rows={1} className="stories">
			<div style={styles.cardImageView} onClick={onTouch}>
				<Card style={styles.cardPublish} >
					<div style={styles.cardImage}>
						<img style={styles.publishImage} src={require('assets/app-favicon30x30.png')} />
					</div>
					<Add style={styles.iconAdd} />
				</Card>
				<Typography component="p" style={styles.tagStorie}>{item.nmChannel}</Typography>
			</div>
		</GridListTile>
	)
}
