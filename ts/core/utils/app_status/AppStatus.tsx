import { I18n, KeyEnum } from "salesfy-shared";

export const offlineStatus = () => ({
	type: 0,
	errorTitle: I18n.t(KeyEnum.ops),
	errorMessage: I18n.t(KeyEnum.appOffline),
	buttonText: I18n.t(KeyEnum.reload),
	linkText: I18n.t(KeyEnum.contact)
})

export const problemStatus = () => ({
	type: 1,
	errorTitle: I18n.t(KeyEnum.ops),
	errorMessage: I18n.t(KeyEnum.appProblem),
	buttonText: I18n.t(KeyEnum.reload),
	linkText: I18n.t(KeyEnum.contact)
})

export const blockedStatus = ({errorMessage}) => ({
	type: 2,
	errorMessage,
	buttonText: I18n.t(KeyEnum.refresh)
})
