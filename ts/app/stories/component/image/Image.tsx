import * as React from "react";
import FastImage from "react-native-fast-image";
import { Image } from "react-native";
import styles from "./styles";

interface IProps {
	style?: any;
	source: any;
}

interface IState {
	image?: any;
}

const defaultImg1 = require('assets/capa/Insp01.png');

export class FallbackCardImage extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);

		this.state = {
			image: props.source
		}

		this.onFallbackImage = this.onFallbackImage.bind(this);
	}

	public componentWillReceiveProps(nextProps){
		if(this.state.image.uri !== nextProps.source.uri){
			this.setState({image: nextProps.source})
		}
	}

	public render() {
		const { image } = this.state;
		const { style } = this.props;

		return (
			<FastImage
				onError={this.onFallbackImage}
				resizeMode={FastImage.resizeMode.stretch}
				source={image}
				style={style}
			/>
		)
	}

	public onFallbackImage() {
		this.setState({ image: defaultImg1 })
	}
}

// tslint:disable-next-line:variable-name
export const BackgroundImage = () => {
	const image = require('assets/background/background.png');
	return <Image style={styles.backgroundImage} source={image}/>
}
