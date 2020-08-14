import * as Ask from 'app-core/communication/ask/Ask'
import ActionCreator from 'app-core/utils/redux/ActionCreator';

const { actions, defaultReducer, update } = new ActionCreator("userContent");
export { actions, defaultReducer };

export const updateUserContentData = update(Ask.updateUserContent);
