import * as Ask from 'app-core/communication/ask/Ask'
import ActionCreator from 'app-core/utils/redux/ActionCreator';

const { actions, defaultReducer, add, update, get, remove } = new ActionCreator("contentChannel");
export { actions, defaultReducer };

export const addContentChannelData = add(Ask.addContentChannel);
export const updateContentChannelData = update(Ask.updateContentChannel);
export const getContentChannelData = get(Ask.getContentChannel);
export const removeContentChannelData = remove(Ask.removeContentChannel);
