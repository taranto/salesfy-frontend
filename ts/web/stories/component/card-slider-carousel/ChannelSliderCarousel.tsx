import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { IconButton } from '@material-ui/core';
import { ListHeaderTitle } from 'web/stories/component/list/List';
import Radio from '@material-ui/core/Radio';
import FloatUpload from 'web/stories/component/picture-upload/FloatUpload';
import { ChannelListCard } from 'web/stories/component/channel_list/ChannelList';
import { getNmDefaultChannelImage } from 'web/utils/image/ImageUtils';

interface IProps {
	items: any[]
	input
	setFile: (input, url) => void,
	setCurrentSlide: (currentSlide) => void,
	toCropImage: (url, file) => void
	change: (key, value) => void;
	onValueChange: () => void;
}

interface IState {
	currentSlide
}

class ChannelSliderCarousel extends React.Component<IProps, IState> {
	public carousel;

	constructor(props) {
		super(props);

		this.state = {
			currentSlide: props.currentSlide
		}

		this.onChange = this.onChange.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onNext = this.onNext.bind(this);
	}

	public componentDidMount() {
		const { carouselStore } = this.carousel;
		const { currentSlide } = this.state;
		carouselStore.setStoreState({ currentSlide })
	}

	public onNext() {
		const { carouselStore } = this.carousel;
		const { state } = carouselStore;
		let currentSlide = 0;
		if (state.currentSlide !== 1) {
			currentSlide = state.currentSlide + 1;
		}
		carouselStore.setStoreState({ currentSlide })
		this.setState({ currentSlide });
		this.props.setCurrentSlide(currentSlide)
	}

	public onBack() {
		const { carouselStore } = this.carousel;
		const { state } = carouselStore;
		let currentSlide = 1;
		if (state.currentSlide !== 0) {
			currentSlide = state.currentSlide - 1;
		}
		carouselStore.setStoreState({ currentSlide })
		this.setState({ currentSlide });
		this.props.setCurrentSlide(currentSlide)
	}

	public onChange(idTemplate) {
		const { onValueChange, input } = this.props;

		input.onChange(idTemplate);
		setTimeout(() => {
			onValueChange();
		}, 400);
	}

	public render() {
		const { items, input } = this.props;
		const { currentSlide } = this.state;

		return (
			<div className="channel-slider">
				<CarouselProvider
					naturalSlideWidth={460}
					naturalSlideHeight={270}
					totalSlides={items.length}
					className="slider-carousel content-card-container channel-list"
					ref={ref => this.carousel = ref}
					dragEnabled={false}
				>
					<div className="details">
						<IconButton onClick={this.onBack}>
							<KeyboardArrowLeft />
						</IconButton>
						<div className="row-selection">
							<Radio onChange={() => this.onChange(items[currentSlide].idCtChannelView)} checked={items[currentSlide].idCtChannelView === input.value} className="checkbox" color="primary" />
							<ListHeaderTitle title={`${currentSlide + 1} - ${items[currentSlide].info}`} />
						</div>
						<IconButton onClick={this.onNext}>
							<KeyboardArrowRight />
						</IconButton>
					</div>
					<Slider>
						{items && items.map((item, index) => {
							return (
								<Slide key={`${index}`} index={index}>
									<ChannelListCard {...item}>
										<FloatUpload {...this.props} imagePreviewDefault={getNmDefaultChannelImage()} fieldName="piChannel"/>
									</ChannelListCard>
								</Slide>
							)
						})}
					</Slider>
				</CarouselProvider>
			</div>
		);
	}
}

export default ChannelSliderCarousel;
