
import { Toast } from 'native-base';

export class Alert {
	public static success(text) {
		Toast.show({
			text,
			type: "success"
		})
	}

	public static warn(text) {
		Toast.show({
			text,
			type: "warning"
		})
	}

	public static error(text) {
		Toast.show({
			text,
			type: "danger"
		})
	}

}

export default Alert;
