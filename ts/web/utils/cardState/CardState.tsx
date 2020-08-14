import { CtCardState } from "salesfy-shared";

export const cardStateStyle = ({ qtView, dhLastConversion, dhUpdate }) => {
	const state = CtCardState.getContentState({ qtView, dhLastConversion, dhUpdate });
	return cardStyleByState(state);
}

export const cardStyleByState = (state) => {
	if (state === CtCardState.notViewed) {
		return 'ind never-view'
	} else if (state === CtCardState.notConverted) {
		return 'ind not-read'
	} else if (state === CtCardState.notConvertedUpdate) {
		return 'ind not-read-recent'
	} else {
		return 'ind'
	}
}

export const cardStateLabel = ({ qtView, dhLastConversion, dhUpdate }) => {
	const state = CtCardState.getContentState({ qtView, dhLastConversion, dhUpdate });

	return cardLabelByState(state);
}

export const cardLabelByState = (state) => {
	if (state === CtCardState.notViewed) {
		return ' (Novo conteúdo)'
	} else if (state === CtCardState.notConverted) {
		return ' (Conteúdo não visto)'
	} else if (state === CtCardState.notConvertedUpdate) {
		return ' (Conteúdo atualizado)'
	} else {
		return ''
	}
}
