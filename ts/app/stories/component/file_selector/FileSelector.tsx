import React, { Component } from 'react';
import { Button, View, Text, Icon } from 'native-base';
import styles from './styles';
import { FireGradient } from 'app/stories/component';
// import ImagePicker from 'react-native-image-crop-picker';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { Platform } from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import { KeyEnum, I18n } from 'salesfy-shared';
import { Translation } from 'app-core/utils/translate/Translation';

interface IProps {
	onSelect: any;
	ctTemplate: number;
	urlImage?: string;
	input?:any;
	meta?: { touched, error }
}
interface IState {
	visible: boolean;
}

class FileSelector extends Component<IProps, IState> {
	public camera;

	constructor(props) {
		super(props);
		this.camera = React.createRef();
		this.state = {
			visible: false
		}
		this.openFileSelector = this.openFileSelector.bind(this);
	}

	public takePicture() {

	}

	public getTemplateSize() {
		const { ctTemplate } = this.props;

		switch (ctTemplate) {
			case 8:
				return { width: 600, height: 360 };
			default:
				return { width: 600, height: 300 };
		}
	}

	public openFileSelector() {
		const { onSelect } = this.props;
		if (Platform.OS === 'android') {
			FilePickerManager.showFilePicker({}, (image: any) => {
				onSelect({uri: 'file://' + image.path, type: image.type, name: image.fileName});
			});
		} else {
			DocumentPicker.show({filetype: [DocumentPickerUtil.images()]}, (_error, image) => {
				onSelect(image)
			});
		}

	}

	public render() {
		const { meta: { touched, error } } = this.props;
		return (
			<View style={styles.container}>
				<Button style={styles.button} transparent={true} onPress={this.openFileSelector}>
					<FireGradient style={styles.buttonCircle}>
						<Icon style={styles.icon} name="image" type="MaterialIcons" />
					</FireGradient>
					<Text style={(error && touched) ? styles.errorField : {}}>{this.props.urlImage ? Translation.changePicture : Translation.selectAPicture}</Text>
				</Button>
			</View>
		);
	}
}

export default FileSelector;
