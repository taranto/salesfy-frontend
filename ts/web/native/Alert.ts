import { toast } from 'react-toastify';

const options = {
	position: toast.POSITION.BOTTOM_LEFT,
	hideProgressBar: true
}

class Alert {
	public static success(text) {
		toast.success(text, options);
	}

	public static warn(text) {
		toast.warn(text, options);
	}

	public static error(text) {
		toast.error(text, options);
	}
}

export default Alert;
