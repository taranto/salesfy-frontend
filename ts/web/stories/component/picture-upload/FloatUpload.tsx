import React from "react";
import { AddPhotoAlternateOutlined, CancelOutlined } from "@material-ui/icons";
import IconButton from '@material-ui/core/IconButton';
import 'cropperjs/dist/cropper.css';
import { executeAwait } from 'app-core/utils/delay_control/DelayControl';

interface IProps {
	setFile: (file, imagePreviewUrl) => void
	toCropImage: (url, file) => void,
	change: (key, value) => void;
	onValueChange: () => void;
	fieldName?:string;
	imagePreviewDefault:string
}

interface IState {
	imagePreviewUrl?
}

class FloatUpload extends React.Component<IProps, IState> {

	constructor(props) {
		super(props);
		this.state = {
			imagePreviewUrl: props.imagePreviewUrl
		};
		this.handleImageChange = this.handleImageChange.bind(this);
		this.clearImage = this.clearImage.bind(this);
	}

	public componentWillReceiveProps(nextProps){
		if(this.state.imagePreviewUrl !== nextProps.imagePreviewUrl){
			this.setState({imagePreviewUrl: nextProps.imagePreviewUrl})
		}
	}

	public handleImageChange(e) {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		const { toCropImage } = this.props;
		if (file) {
			reader.onloadend = () => {
				const imagePreviewUrl = reader.result;
				this.setState({imagePreviewUrl})
				toCropImage(imagePreviewUrl, file);
				return;
			};
			reader.readAsDataURL(file);
		}
	}

	public clearImage() {
		this.setState({imagePreviewUrl: this.props.imagePreviewDefault})
		this.props.setFile(undefined, undefined);
		if (this.props.change) {
			this.props.change(this.props.fieldName, this.props.imagePreviewDefault)
		}

		if (this.props.onValueChange) {
			executeAwait(this.props.onValueChange);
		}
	}

	public onButtonClick(e){
		e.stopPropagation();
		const { imagePreviewUrl } = this.state;

		if(imagePreviewUrl){
			this.clearImage()
		}
	}

	public render() {
		const { imagePreviewUrl } = this.state;
		return (
			<>
				<IconButton className={`float-upload`} onClick={(e) => this.onButtonClick(e)}>
					{(imagePreviewUrl && imagePreviewUrl !== this.props.imagePreviewDefault) ? <CancelOutlined /> :
						<>
							<AddPhotoAlternateOutlined />
							<input type="file" accept='.jpg, .png, .jpeg' onChange={e => this.handleImageChange(e)} />
						</>
					}
				</IconButton>
			</>
		);
	}
}

export default FloatUpload;
