import * as Ask from 'app-core/communication/ask/Ask'
import ActionCreator from 'app-core/utils/redux/ActionCreator';

const { actions, defaultReducer, getSimple } = new ActionCreator("filter");
export { actions, defaultReducer };

export const getFilterTagData = getSimple(Ask.getFilterTag);
export const getFilterGroupData = getSimple(Ask.getFilterGroup);
export const getFilterPublisherData = getSimple(Ask.getFilterPublisher);
export const getFilterCtContentData = getSimple(Ask.getFilterCtContent);
export const getFilterChannelData = getSimple(Ask.getFilterChannel);

const invalidate = (field) => {
	return async () => Promise.resolve({ [field]: undefined })
}

export const invalidateFilterTagData = getSimple(invalidate("tags"));
export const invalidateFilterGroupData = getSimple(invalidate("groups"));
export const invalidateFilterPublisherData = getSimple(invalidate("users"));
export const invalidateFilterCtContentData = getSimple(invalidate("ctContent"));
export const invalidateFilterChannelData = getSimple(invalidate("channels"));
