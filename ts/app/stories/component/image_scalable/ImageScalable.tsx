import * as React from 'react';
import { Image } from 'react-native'
import { View } from 'native-base'

interface ImageScalable {
	source: any;
	style?: any;
	imageStyle?: any;
}

export function ImageScalable({ source, style, imageStyle }:ImageScalable) {
	return (
		<View style={style}>
			<Image resizeMode="contain" style={imageStyle} source={source} />
		</View>
	)
}
