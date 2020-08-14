import React from 'react';
import styles from './styles'
import { PageCircularLoader } from 'components';
import { S3_PATH_CONTENT, DEFAULT_ENTER_DELAY } from 'root/envVars';
import { Card, CardActions, CardContent, Typography, CardMedia, GridListTile, Tooltip } from '@material-ui/core';
import { ShadeGradient } from 'web/stories/component/gradient/Gradient';
import { ProgressiveList } from 'web/stories/component/progressive-list/ProgressiveList';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { CardContentMenu } from 'web/stories/component/card_menu/CardContentMenu';
import { ContentRating } from 'web/stories/component/content_list/ContentRating';
import { Translation } from 'app-core/utils/translate/Translation';
import moment from 'moment';
import { cardStateLabel, cardStyleByState } from 'web/utils/cardState/CardState';
import { ContentWizardContainer } from '../../../container/content_wizard/ContentWizardContainer';
import { CtCardState, RegExpConst } from 'salesfy-shared';
import { SimpleText } from 'web/stories/component/logo/Logo';


// tslint:disable
const formatDate = (date) => {
	let formatted = '';
	if (date) {
		moment.locale('pt_br');
		formatted = moment(date).fromNow();
	}
	return formatted;
}


const ContentListRouter = ({ listHeader, isLoading, data, onEndReached, onConversion, deleteContent, history, hasPowerInItem, isTagChange, location }) => {
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
		<>
			<div className={`content-list`}>
				<ProgressiveList
					listHeader={listHeader}
					rowHeight={(250 * 4 / 3) + 40}
					listHeaderHeight={255}
					cardWidth={290}
					renderItem={renderContentListItem}
					data={data}
					onEndReached={onEndReached}
					onConversion={onConversion}
					history={history}
					deleteContent={deleteContent}
					hasPowerInItem={hasPowerInItem}
					isLoading={isLoading}
					location={location}
				/>
			</div>
		</>
	)

}

interface IContentListProps extends RouteComponentProps<any> {
	listHeader?, isLoading?, data?, onEndReached?, onConversion?, hasToolbar?, deleteContent?, hasPowerInItem?, extraData?, isRemaining?,
	onScrollEndDrag?, flatRef?, onViewableItemsChanged?, refreshing?,
	showFavorite?, showFeed?, showChannelsAward?, onScroll?, isChannel?, isTagChange?,
	insertMultiLink?
}

export const ContentList = withRouter<IContentListProps, any>(ContentListRouter);

export const emptyComponent = () => {
	return (
		<div className="list-empty">
			<SimpleText text={Translation.emptyFeed} textStyle={{ marginLeft: 30, marginRight: 30, textAlign: "center" }} />
		</div>
	)
}

export const listLoading = (isLoading, isRemaining) => {
	if (isRemaining) {
		return <PageCircularLoader style={styles.cardFullDummy} />;
	} else {
		if (isLoading) {
			return <PageCircularLoader style={styles.cardFullDummy} />;
		} else {
			return <div />
		}
	}
}
// const keyExtractor = (item, index: number) => `${item.idContent}-${index}`;
export const renderContentListItem = ({ item, onConversion, deleteContent, hasPowerInItem, location }) => {
	if (item.isWizard) {
		return <ContentWizardContainer location={location} />
	}
	return <RouterContentListCard key={item.idContent} {...item} onConversion={onConversion} deleteContent={deleteContent} hasPowerInItem={hasPowerInItem} />
}

const ContentTooltip = (item) => {
	const { children, nmContent, dsContent, nmPublisher, dhPublish, dhUpdate } = item;

	if (!nmContent) {
		return <>{children}</>
	}

	const placeholder = <React.Fragment>
		<p>{nmContent}{cardStateLabel(item)}</p>
		{dsContent && <p>{dsContent}</p>}
		{nmPublisher ? (<p>{`${Translation.nmPublisher} ${nmPublisher}`}</p>) : ''}
		{dhPublish ? (<p>{`${Translation.dhPublish} ${formatDate(dhPublish)}`}</p>) : ''}
		{dhUpdate ? (<p>{`${Translation.dhUpdate} ${formatDate(dhUpdate)}`}</p>) : ''}
	</React.Fragment>

	return (
		<Tooltip enterDelay={DEFAULT_ENTER_DELAY} title={placeholder}>
			{children}
		</Tooltip>
	)
}


export const ContentListCard = (item) => {
	const { idContent, nmContent,
		piContent, dsContent, nmPublisher, isFavorite,
		shShowTitle, shShowPublisher, shShowDescription, shShowActionButtons,
		nmCtContent, lkContent, shShowShareButton,
		shShowShortCard, shShowFullscreenImage, imagePreviewUrl,
		idCtContent, deleteContent, hasPowerInItem, children, onConversion
	} = item;
	const dataRow = {
		idContent, nmContent,
		piContent, dsContent, nmPublisher, children, isFavorite,
		shShowTitle, shShowPublisher, shShowDescription, shShowActionButtons, shShowShareButton, nmCtContent,
		shShowShortCard, shShowFullscreenImage, lkContent, ctContent: { value: idCtContent, label: nmCtContent }
	}
	const presentation = useSelector(state => state.app.presentation);

	let href;
	if(lkContent){
		href = lkContent.includes('http') ? lkContent : `//${lkContent}`;
	}

	const cssCardState = presentation?"":cardStyleByState(CtCardState.get(item.keyCtContentState))
	const cssClassName = `card ${shShowShortCard ? 'short' : 'full'} ${shShowFullscreenImage ? 'card-full-image' : ''}  ${cssCardState}`

	return (
		<GridListTile key={item.idContent} cols={1} rows={1}>
			<ContentTooltip {...item}>
				<Card className={cssClassName} >
					{children}
					<a href={href} target="_blank" onMouseDown={(e) => e.button !== 2 && onConversion(item)} >
						{CardImage({ shShowFullscreenImage, piContent, imagePreviewUrl })}
						{CardContentList({ shShowTitle, shShowShortCard, shShowDescription, nmContent, dsContent })}
						{shShowFullscreenImage && <ShadeGradient style={styles.topShade}><div /></ShadeGradient>}
						{shShowFullscreenImage && <ShadeGradient style={styles.footerShade} inverse={true}><div /></ShadeGradient>}
					</a>
					{(!presentation && !children) && <CardActions className="footer" onClick={()=> window.open(href) }>
						<div className="left">
							<ContentRating {...item} />
						</div>
						<CardContentMenu hasPower={hasPowerInItem && hasPowerInItem(item)} deleteContent={deleteContent} dataRow={dataRow} />
					</CardActions>}
				</Card>
			</ContentTooltip>
		</GridListTile >
	)
}

// {CardAuthor({ shShowPublisher, nmPublisher, nmCtContent })}

export const RouterContentListCard = withRouter(ContentListCard);
/*
const CardAuthor = ({ shShowPublisher, nmPublisher, nmCtContent }) => {
	if (!shShowPublisher || !nmCtContent || !nmPublisher) {
		return <Typography className="author"/>;
	}
	return <Typography className="author">{`${capitalize(nmCtContent)} por ${nmPublisher}`}</Typography>
}
*/

const CardContentList = ({ shShowTitle, shShowShortCard, shShowDescription, dsContent, nmContent }) => {
	if (shShowShortCard || (!shShowTitle && !shShowDescription)) {
		return;
	}

	return (
		<CardContent className="card-content">
			{nmContentLayout({ shShowTitle, nmContent, dsContent })}
			{dsContentLayout({ shShowDescription, dsContent })}
		</CardContent>
	)
}

const nmContentLayout = ({ shShowTitle, nmContent, dsContent }) => {
	if (!shShowTitle) {
		return;
	}
	if (dsContent) {
		return (
			<Typography component="h3">{nmContent}</Typography>
		)
	}
	return (
		<Typography component="h3" className="dsContent-free" >{nmContent}</Typography>
	)
}

const dsContentLayout = ({ shShowDescription, dsContent }) => {
	if (!shShowDescription) {
		return;
	}

	return (
		<Typography component="p" className="description">{dsContent}</Typography>
	)
}

const CardImage = ({ shShowFullscreenImage, piContent, imagePreviewUrl }) => {
	const image = RegExpConst.HTTP_S.test(piContent) ? piContent : `${S3_PATH_CONTENT}/${piContent}`;
	return (
		<CardMedia
			className={`card-image ${shShowFullscreenImage && 'full-image'}`}
			image={imagePreviewUrl ? imagePreviewUrl : image}
		/>
	)
}
