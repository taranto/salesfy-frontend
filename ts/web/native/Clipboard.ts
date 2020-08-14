import Alert from './Alert';
class Clipboard {
	public static setString(url) {
		const textField = document.createElement('textarea')
		textField.innerText = url;
		document.body.appendChild(textField)
		textField.select()
		document.execCommand('copy')
		textField.remove();

		Alert.success('Link copiado!')
	}
}

export default Clipboard;
