import Alert from 'native/Alert';

class Share {
	public static open(shareOptions) {
		const textField = document.createElement('textarea')
		textField.innerText = shareOptions.url;
		document.body.appendChild(textField)
		textField.select()
		document.execCommand('copy')
		textField.remove();

		Alert.success('Link copiado!')
	}
}

export default Share;
