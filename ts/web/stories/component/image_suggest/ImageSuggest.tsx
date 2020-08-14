import React, { useEffect, useState } from 'react';
import { searchImages } from 'pixabay-api';
import '@brainhubeu/react-carousel/lib/style.css';
import { PIXABAY_API, S3_ACCESS_PATH } from 'root/envVars';
import { Translation } from 'app-core/utils/translate/Translation';
import { HorizontalList } from 'web/stories/component/horizontal-list/HorizontalList';
import { Typography } from '@material-ui/core';
import styles from "./styles";

let msfilterTimeout;
const arNmImageEmpty = []

const doFilter = async (term, options) => {
	return searchImages(PIXABAY_API, term, options).then(r => r.hits)
}

const getArDefaultImagePath = (arNmDefaultImage) => {
	const arDefaultImagePath = arNmDefaultImage.map((nmDefaultImage) => {
		return { previewURL: S3_ACCESS_PATH + nmDefaultImage }
	})
	return arDefaultImagePath
}

export const ImageSuggest = ({ onImageChange, dsSearchTerm, options, arNmDefaultImage }) => {
	const [arImage, setImages] = useState(arNmDefaultImage);
	const [isLoading, setLoading] = useState(false);

	useEffect(() => {
		const arNmImageEmptyPath = getArDefaultImagePath(arNmImageEmpty)
		setImages(arNmImageEmptyPath)
		if (msfilterTimeout) {
			clearTimeout(msfilterTimeout);
		}
		msfilterTimeout = setTimeout(async () => {
			setLoading(true);
			const split = (dsSearchTerm||"").split(' ')
			const promises = await split.map(async term => {
				return doFilter(term, options)
			})

			await Promise.all(promises).then(async items => {
				let arData = [];
				items.map((arItem: any) => {
					arData = arData.concat(arItem)
				})
				if (arData.length > 0 && dsSearchTerm) {
					setImages(arData)
					setLoading(false)
				} else {
					const arNmDefaultImagePath = getArDefaultImagePath(arNmDefaultImage)
					setImages(arNmDefaultImagePath)
					setLoading(false)
				}
			})
		}, 1000)
	}, [dsSearchTerm]);

	const onDown = (url) => {
		onImageChange(url)
	}

	return (
		<div className="google-image-suggest">
			{arImage.length > 0 && <p>{Translation.imageSuggestion}</p>}
			{arImage.length > 0 && <HorizontalList
				isLoading={isLoading}
				data={arImage}
				renderItem={image => {
					return (
						<div
							key={image.previewURL}
							className="image-container"
							onMouseDown={() => onDown(image.previewURL)}
						>
							<img src={image.previewURL} />
						</div>
					)
				}}
			/>}
			{arImage.length > 0 && dsSearchTerm && <Typography style={{ ...styles.poweredByText }}>{Translation.poweredByImageSuggest}</Typography>}
		</div>
	)
}
