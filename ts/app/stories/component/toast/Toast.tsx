import { Toast } from 'native-base';

const fireErrorMessage = (error) => {
	Toast.show({
		text: error,
		type: "danger",
		duration: 5000
	});
};

const fireSuccessMessage = (msg) => {
	Toast.show({
		text: msg,
		type: "success",
		duration: 5000
	});
};

export { fireErrorMessage, fireSuccessMessage };
