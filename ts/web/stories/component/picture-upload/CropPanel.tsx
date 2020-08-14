import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { OutlineButton } from 'web/stories/component/button/Button';
import { Translation } from 'app-core/utils/translate/Translation';

export class CropPanel extends React.Component<{ imageToCrop, onCrop, aspectRatio }> {
	constructor(props){
		super(props)

		this.onCrop = this.onCrop.bind(this);
	}
	public onCrop(){
		const cropper: any = this.refs.cropper;
		this.props.onCrop(cropper);
	}
	public render() {
		const { imageToCrop, aspectRatio } = this.props;
		return imageToCrop && (
			<>
				<Cropper
					className="picture"
					ref={"cropper"}
					src={imageToCrop}
					aspectRatio={aspectRatio}
					dragMode="move"
					guides={true}
				/>
				<OutlineButton placeholder={Translation.cut} onClick={this.onCrop} className={"picture-crop-button"}/>
			</>
		)
	}
}
