import React from "react";
import { AddPhotoAlternateOutlined } from "@material-ui/icons";
import { S3_PATH_CONTENT } from 'root/envVars';
import { imageNameUtils } from "app-core/utils/string/StringUtils";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { NewButton } from 'web/stories/component/button/Button';
import { urltoFile } from "web/utils/image/ImageUtils";

interface IState {
	isPreview?: boolean,
	file?: any;
	imagePreviewUrl?: any;
	imageToCrop?: any;
}

interface IProps {
	input: any;
	idUser: number;
	setFile: any;
	onValueChange: any;
	meta: { error, touched };
	aspectRatio: number;
}
class PictureUpload extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			file: null,
			imageToCrop: null
		};
		this.handleImageChange = this.handleImageChange.bind(this);
		this.onCrop = this.onCrop.bind(this);
	}
	public handleImageChange(e) {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		if (file) {
			reader.onloadend = () => {
				const imageToCrop = reader.result;
				this.setState({
					isPreview: true,
					file,
					imageToCrop
				});
				return;
			};
			reader.readAsDataURL(file);
		}
	}

	public async onCrop() {
		const { file } = this.state;

		const cropper: any = this.refs.cropper;
		const imagePreviewUrl = cropper.getCroppedCanvas().toDataURL();
		this.setState({ imageToCrop: undefined, imagePreviewUrl })

		const fileName = imageNameUtils(this.props.idUser, file.name);

		const newFile = await urltoFile(imagePreviewUrl, fileName);

		this.props.setFile(newFile);
		this.props.input.onChange(fileName);
		this.props.onValueChange();
	}

	public onCropImage() {
		const { imageToCrop } = this.state;
		return imageToCrop && (
			<>
				<Cropper
					className="picture"
					ref='cropper'
					src={imageToCrop}
					aspectRatio={this.props.aspectRatio}
					dragMode="move"
					guides={true}
				/>
				<NewButton placeholder={"Cortar"} onClick={this.onCrop} className={"picture-crop-button"}/>
			</>
		)
	}

	public onInputField() {
		const { input, meta: { error, touched } } = this.props;
		const { file, imageToCrop, imagePreviewUrl, isPreview } = this.state;
		const hasValue = input.value || imagePreviewUrl;
		return !imageToCrop && (
			<>
				<div className={`picture ${(!hasValue && error && touched) && 'error-field'}`}>
					{(file || input.value) ?
						<img src={(input.value && !isPreview) ? `${S3_PATH_CONTENT}/${input.value}` : imagePreviewUrl} className="picture" alt="..." /> : <AddPhotoAlternateOutlined />
					}
					<input type="file" accept='.jpg, .png, .jpeg' onChange={e => this.handleImageChange(e)} />
				</div>
				{(!hasValue && error && touched) && <span className="error">{error}</span>}
			</>
		)
	}

	public render() {
		return (
			<>
				<div className="picture-container">
					{this.onCropImage()}
					{this.onInputField()}
				</div>
			</>
		);
	}
}

export default PictureUpload;
