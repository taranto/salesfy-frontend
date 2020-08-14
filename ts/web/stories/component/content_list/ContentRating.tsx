import React, { useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { Star, StarBorderOutlined, Close } from '@material-ui/icons';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';
import { updateUserContentData } from 'app-core/redux_store/userContent/Actions';

export const ContentRating = ({vlEval, vlEvalUser , idContent}) => {
	const [loading, setLoading] = useState(false);
	const [userRating, setUserRating] = useState(vlEvalUser);
	const [rating, setRating] = useState(vlEval);
	const dispatch = useDispatch();

	const onChange = (value) => {
		setLoading(true);
		setUserRating(value);
		value = fixUndefiningValue(value)

		dispatch(updateUserContentData({idContent, vlEval: value})).then(item => {
			setRating(item.vlEval);
			setLoading(false);
		}).catch(() => setLoading(false));
	}

	const fixUndefiningValue = (value:number) : number | null => {
		return value === 0 ? null : value
	}

	return (
		<div className="rating">
			<div className="dropup">
				<Button className="rating-button dropbtn" disableRipple={true}>
					{rating && <span>{rating}</span>}
					{userRating ? <Star color="primary"/> : <StarBorderOutlined/>}
					{loading && <CircularProgress size={26} className="rating-button-loading" />}
				</Button>
				<div className="dropup-content" onClick={(e) => e.stopPropagation()}>
					<Rating
						start={-1}
						stop={0}
						initialRating={-1}
						emptySymbol={<Close/>}
						fullSymbol={<Close color="primary"/>}
						onChange={onChange}
					/>
					<Rating
						stop={5}
						initialRating={userRating}
						emptySymbol={<StarBorderOutlined/>}
						fullSymbol={<Star color="primary"/>}
						onChange={onChange}
					/>
				</div>
			</div>
		</div>
	)
};
