import React, { Component } from 'react';
import { View } from 'native-base';
// import { RNS3 } from 'react-native-aws3';
import styles from 'app/stories/component/camera_roll/styles';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { Dimensions } from 'react-native';

class CameraRollComponent extends Component {
	public camera;

	constructor(props) {
		super(props);
		this.takePicture = this.takePicture.bind(this);
		this.camera = React.createRef();
	}

	public takePicture() {
		this.camera.current.capture()
			.then((data) => {
				// tslint:disable-next-line:no-console
				// console.log(data);
				/*
				const file = {
					uri: data.path,
					name: 'photo.jpg',
					type: 'image/jpeg'
				};

				const options = {
					keyPrefix: 'photos/',
					bucket: '<bucket_name>',
					region: 'eu-west-1',
					accessKey: '<your_access_key>',
					secretKey: '<your_secret_key>',
					successActionStatus: 201
				};

				RNS3.put(file, options).then(response => {
					if (response.status !== 201) {
						throw new Error('Failed to upload image to S3', response);
					}
					console.log('*** BODY ***', response.body);
				});
				*/
			})
			.catch(err => {
				// tslint:disable-next-line:no-console
				console.error(err)
			});
	}

	public render() {
		return (
			<View style={styles.container}>
				<CameraRollPicker
					selectSingleItem={true}
					imagesPerRow={2}
					containerWidth={Dimensions.get("screen").width-20}
				/>
			</View>
		);
	}
}

export default CameraRollComponent;
