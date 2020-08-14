import { success } from 'app-core/utils/redux/Actions';
import Send from 'app-core/communication/send/Send';
import { RoutesEnum } from 'salesfy-shared';
import DeviceInfo from 'native/DeviceInfo';
import { NavigationActions } from 'native/Navigation';
import { blockedStatus } from 'app-core/utils/app_status/AppStatus';

export const APP_STATUS_ERROR = "APP_STATUS_ERROR";
export const APP_PARAM = "APP_PARAM";

export const appStatusError = response => success(APP_STATUS_ERROR, response);
export const appParams = response => success(APP_PARAM, response);

export const versionCompatibility = () => {
	return dispatch => {
		return Send.get(`${RoutesEnum.notifyMsg}?snVersion=${DeviceInfo.getVersion()}&nmCtSystem=${DeviceInfo.getSystemName()}`, false).then(response => {
			if (response.data) {
				const { isBlocked, dsMsgRaw } = response.data;

				if (isBlocked) {
					dispatch(appStatus(blockedStatus({errorMessage: dsMsgRaw})));
					dispatch(NavigationActions.navigate({ routeName: "LoaderError" }));
				}

				return;
			}

			return response;
		})
	}
};

export const appStatus = (item) => {
	return dispatch => {
		dispatch(appStatusError(item));
	}
}

export const appParam = (item) => {
	return dispatch => {
		dispatch(appParams(item));
	}
}
