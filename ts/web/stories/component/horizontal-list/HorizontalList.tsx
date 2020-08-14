import React, { useRef, useMemo } from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import useComponentSize from '@rehooks/component-size'
import { CircularLoader } from 'web/stories/component';

export const HorizontalList = ({ data, renderItem, isLoading, qtComponentHeight = 70,
	qtSlidesPerPage = 1, qtSeparatorSize = 20, isAutoSlidePerPage = false, qtItemWidth = 0 }) => {
	const ref = useRef(null);
	const size = useComponentSize(ref);
	const { width, height } = size;
	const qtPageWidth = width
	qtComponentHeight = height ? height : qtComponentHeight

	qtSlidesPerPage = getQtSlidesPerPage({ qtSeparatorSize, qtPageWidth, qtItemWidth, isAutoSlidePerPage, qtSlidesPerPage })

	return useMemo(() => {
		return (
			<div ref={ref} className="horizontal-list" style={{ minHeight: qtComponentHeight }}>
				{isLoading ? <CircularLoader /> :
					<Carousel
						infinite={true}
						slidesPerPage={qtSlidesPerPage}
						draggable={false}
						arrows={true}
					>
						{data.map((item, index) => renderItem(item, index))}
					</Carousel>
				}
			</div>
		)
	}, [data, qtSlidesPerPage, isLoading])
};

const getQtSlidesPerPage = ({ qtSeparatorSize, qtPageWidth, qtItemWidth, isAutoSlidePerPage, qtSlidesPerPage }): number => {
	if (isAutoSlidePerPage) {
		const qtMarginForArrows = 42
		let qtAutoSlidesPerPage = (qtPageWidth - qtMarginForArrows) / (qtItemWidth + qtSeparatorSize);
		qtAutoSlidesPerPage = qtAutoSlidesPerPage < 0 ? 0 : qtAutoSlidesPerPage
		return qtAutoSlidesPerPage
	}
	return qtSlidesPerPage
}
