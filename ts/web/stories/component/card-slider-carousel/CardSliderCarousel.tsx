import React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { IconButton } from '@material-ui/core';
import { ContentListCard } from 'web/stories/component';
import { ListHeaderTitle } from '../list/List';
import Radio from '@material-ui/core/Radio';
import CardActionsContainer from 'app-core/container/card_actions_container/CardActionsContainer';
import FloatUpload from '../picture-upload/FloatUpload';
import { getNmDefaultContentImage } from 'web/utils/image/ImageUtils';

interface IProps {
	items: any[]
	input
	setFile: (input, url) => void,
	setCurrentSlide: (currentSlide) =>  void,
	toCropImage: (url, file) => void
	change: (key, value) => void;
	onValueChange: () => void;
}

interface IState {
	currentSlide
}

class CardSliderCarousel extends React.Component<IProps, IState> {
	public carousel;

	constructor(props) {
		super(props);

		this.state = {
			currentSlide: props.currentSlide
		}

		this.onChange = this.onChange.bind(this);
		this.onBack = this.onBack.bind(this);
		this.onNext = this.onNext.bind(this);
		this.cardActions = this.cardActions.bind(this);
	}

	public componentDidMount(){
		const { carouselStore } = this.carousel;
		const { currentSlide } = this.state;
		carouselStore.setStoreState({ currentSlide })
	}

	public onNext() {
		const { carouselStore } = this.carousel;
		const { state } = carouselStore;
		let currentSlide = 0;
		if (state.currentSlide !== 3) {
			currentSlide = state.currentSlide + 1;
		}
		carouselStore.setStoreState({ currentSlide })
		this.setState({ currentSlide });
		this.props.setCurrentSlide(currentSlide)
	}

	public onBack() {
		const { carouselStore } = this.carousel;
		const { state } = carouselStore;
		let currentSlide = 3;
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

	public cardActions(item, shShowActionButtons, actionButton) {
		return <CardActionsContainer {...item} shShowActionButtons={shShowActionButtons} actionButton={actionButton} disabled={true} />;
	}

	public render() {
		const { items, input } = this.props;
		const { currentSlide } = this.state;

		return (
			<CarouselProvider
				naturalSlideWidth={300}
				naturalSlideHeight={270}
				totalSlides={items.length}
				className="slider-carousel content-card-container horizontal"
				ref={ref => this.carousel = ref}
				dragEnabled={false}
			>
				<div className="details">
					<IconButton onClick={this.onBack}>
						<KeyboardArrowLeft />
					</IconButton>
					<div className="row-selection">
						<Radio onChange={() => this.onChange(items[currentSlide].cdTemplate)} checked={items[currentSlide].cdTemplate === input.value} className="checkbox" color="primary" />
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
								<ContentListCard {...item} cardActions={this.cardActions}>
									<FloatUpload {...this.props} imagePreviewDefault={getNmDefaultContentImage()} fieldName="piContent"/>
								</ContentListCard>
							</Slide>
						)
					})}
				</Slider>
			</CarouselProvider>
		);
	}
}

export default CardSliderCarousel;
