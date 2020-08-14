import React from 'react';
import FastImage from 'react-native-fast-image';

interface IProps {
	source:any;
	style: any;
	scale?:number
}

interface IState {
	imgWidth: number,
	imgHeight: number
}

export class FastImageOriginalSize extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.onLoad = this.onLoad.bind(this);

		this.state = {
			imgWidth: 0,
			imgHeight: 0
		}
	}

	public onLoad(e) {
		const width = e.nativeEvent.source.width;
		const height = e.nativeEvent.source.height;

		const { scale } = this.props;

		this.setState({ imgWidth: scale ? width/scale : width/2, imgHeight: scale ? height/scale : height/2 })
	}

	public render() {
		const { source, style } = this.props;
		return (
			<FastImage
				resizeMode="contain"
				style={[style,this.state.imgWidth > 0 ? { width: this.state.imgWidth, height: this.state.imgHeight } : {position: "absolute", top: 9999999}]}
				source={source}
				onLoad={this.onLoad}
			/>
		)
	}
}
