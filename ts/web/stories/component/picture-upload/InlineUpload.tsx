import React from "react";
import { Clear } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { imageNameUtils } from "app-core/utils/string/StringUtils";

interface IState {
	file?: any;
	imagePreviewUrl?: any;
}

interface IProps {
	input: any;
	idUser: number;
	setFile: any;
	onValueChange: any
	icon?
	title?
}
class InlineUpload extends React.Component<IProps, IState> {

	constructor(props) {
		super(props);
		this.state = {
			file: null,
			imagePreviewUrl: null
		};
		this.handleImageChange = this.handleImageChange.bind(this);
		this.clearImage = this.clearImage.bind(this);
	}

	public handleImageChange(e) {
		e.preventDefault();
		const reader = new FileReader();
		const file = e.target.files[0];
		if (file) {
			reader.onloadend = () => {
				const imagePreviewUrl = reader.result;
				this.setState({
					file,
					imagePreviewUrl
				});

				const fileName = imageNameUtils(this.props.idUser, file.name);

				const newFile = new File([file], fileName);
				this.props.setFile(newFile, imagePreviewUrl);
				this.props.input.onChange(fileName);
				this.props.onValueChange();
				return;
			};
			reader.readAsDataURL(file);
		}
	}

	public clearImage(){
		this.props.setFile(undefined, undefined);
		this.props.input.onChange('');
		setTimeout(() => {
			this.props.onValueChange();
		}, 100)

		this.setState({
			file: undefined,
			imagePreviewUrl: undefined
		});
	}

	public render() {
		const { input, icon, title } = this.props;
		const { file } = this.state;

		return (
			<div className="editable-field">
				<div className="title">
					{icon && <i className="material-icons">{icon}</i>}
					{title && <h3>{title}</h3>}
				</div>
				<div className="editable picture-inline-label">
					<p>
						{(file || input.value) ?
							<span className="fake-field fake-text-field">{"Trocar imagem"}<IconButton className="button-clear" onClick={this.clearImage}><Clear/></IconButton></span>
							: <><span className="fake-field fake-text-field">{"Selecione uma imagem"}</span></>
						}
						<input type="file" accept='.jpg, .png, .jpeg' onChange={e => this.handleImageChange(e)} />
					</p>
				</div>
			</div>
		);
	}
}

export default InlineUpload;
