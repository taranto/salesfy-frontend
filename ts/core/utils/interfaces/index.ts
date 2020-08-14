export interface IAuthentication {
	initAuthentication: () => void;
	reAuthentication: () => Promise<any>;
	authenticate: (username, password) => any;
	genericAuthentication: (username, password) => void;
	resetAuthentication: () => Promise<any>;
}

export interface IComponents {
	HatchersLogo: any,
	FormInput: any,
	SimpleFormInput: any,
	FormButtons: any,
	AcceptTerms: any,
	SignIn: any,
	BlueGradient: any,
	PurpleGradient: any,
	CircularLoader: any,
	PageCircularLoader: any,
	fireErrorMessage: any,
}

export interface ILoading {
	isLoading?: boolean;
}

export interface INavigation {
	navigation: any;
}

export interface ISignInContainer extends INavigation {
	valid: boolean;
	email?: string;
	password?: string;
	isLoading: boolean;
}

export interface ISignInScreen extends ILoading {
	goToTermsOfUse?: () => void;
	changeAcceptTerms?: () => void;
	isAcceptedTerms?: boolean;
	onRegister: () => void;
	onLogin: () => void;
	onRecovery: () => void;
	errorMessage: string;
}

export interface IStyleSheet {
	classes: any;
}

export interface IAuthToken {
	emUser?: string,
	unKeyPassword?: string,
	dsFacebookToken?: string,
	dsGoogleToken?: string
}

export interface IProgressiveList {
	isLoading?: boolean,
	items: any[],
	offset: number,
	remaining?: boolean
}

export interface IChannelList {
	flatRef?, headerMessage?, headerDescription?, showFavorite?, showChannelsAward?, showFeed?,
	onScrollEndDrag?, onViewableItemsChanged?, refreshing?, isLoading?, isRemaining?, data,
	onEndReached?, onConversion,
	location?: any, dispatch?: any, options?: any, history?: any, canPostSeChannel?, isTagChange?
}

export interface IChannelDetails extends IConnect {
	saveData, nmChannel, dsChannel, options, initialize,
	idUser, piChannel, idChannel, isLoading, updateLabel,
	onDriveImportContent?: (arIdFile, joToken) =>  void;
	params, change, ctChannelView, setOpenModal, location
}

export interface IContentDetails extends IConnect {
	saveData, nmContent, dsContent, idContent, options, types, initialize, dispatch, idUser,
	piContent, channels, lkContent, nmPublisher, nmCtContent, idCtContent, ctContent, updateLabel,
	isLoading, nmUser, getLinkDetails?, isLoadingLink?, users?, idPublisher?, change?
}

export interface IContentList {
	items, isLoading, remaining, refreshing, showFavorite, showChannelsAward,
	showFeed, listHeader, onConversion, cardActions, onEndReached, onScrollEndDrag,
	flatListRef, onViewableItemsChanged, onScroll, dispatch?: any, options?: any, history?: any, location?: any, deleteContent,
	hasPowerInItem, isChannel, isTagChange?, presentation?, idUser?
}

export interface IConnect {
	dispatch: any;
}

export interface IChannelDetailsContainer extends IConnect{
	nmChannel, dsChannel, piChannel, idChannel,
	settedNewGroups, settedGroups, initialize, change,
	isPlaybook, valid, isCopy?, idCopy?, openDetails,
	setOpenModal, idCtChannelView, reloadList
}

export interface IContentDetailsContainer extends IConnect {
	idContent, nmContent, dsContent, piContent, idTemplate,
	ctContent, lkContent, oldChannels, settedChannels,
	settedNewChannels, isPlaybook, initialize, change,
	types, valid, idPublisher?
}

export interface ILocation {
	dispatch: any;
	history?: any;
	location?: any;
}
