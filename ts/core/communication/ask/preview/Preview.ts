import Send from 'app-core/communication/send/Send'
import { RoutesEnum } from 'salesfy-shared';

export async function getPreview(lkPreview) {
	return Send.get(`${RoutesEnum.preview}?lkPreview=${lkPreview}`, true);
}
