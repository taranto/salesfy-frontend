import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { IconButton } from '@material-ui/core';

interface IProps {
	children: any[]
}

export default class extends React.Component<IProps> {
	public render() {
		const { children } = this.props;
		return (
			<CarouselProvider
				naturalSlideWidth={300}
				naturalSlideHeight={120}
				totalSlides={children.length}
				className="slider-carousel"
			>
				<Slider>
					{children && children.map((item, index) => {
						return <Slide key={`${index}`} index={index}>{item}</Slide>
					})}
				</Slider>
				<div className="details">
					<ButtonBack>
						<IconButton>
							<ArrowBack />
						</IconButton>
					</ButtonBack>
					<ButtonNext>
						<IconButton>
							<ArrowForward />
						</IconButton>
					</ButtonNext>
				</div>
			</CarouselProvider>
		);
	}
}
