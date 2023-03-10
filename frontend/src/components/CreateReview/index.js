import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { fetchSingleSpot } from "../../store/spots";
import { getSpotReviews, addReview } from "../../store/reviews";
import './CreateReview.css';

export default function CreateReview ({ spotId }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)
    const { closeModal } = useModal();
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [errors, setErrors] = useState([]);

    const handleClick = (value) => {
        setStars(value)
    }

    const submit = async (e) => {
        e.preventDefault();

        const newReview = {
            review: reviewText,
            stars: stars
        }

        dispatch(addReview(newReview, spotId, currentUser))
            .then(closeModal())
            .catch(async(res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }

    return (
        <div className="create__review__container">
            <div className="create__review-header">
                <p className="create__review-title">How was your stay?</p>
            </div>
            <ul>
                {errors && errors.map((err, idx) => (
                    <li className="server-errors" key={idx}> 
                        {err}
                    </li>
                ))}
            </ul>
            <div className="create__review__text__container">
                <textarea 
                rows='10'
                cols='35'
                className="review__input-text"
                placeholder="Leave your review here..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                >
                </textarea>
            </div>
            <div className="star__container">
                <div className="rate">
                    <input type="radio" id="star5" name="rate" value={stars} onClick={() => handleClick(5)}/>
                    <label htmlFor="star5" title="text">5 stars</label>
                    <input type="radio" id="star4" name="rate" value={stars} onClick={() => handleClick(4)}/>
                    <label htmlFor="star4" title="text">4 stars</label>
                    <input type="radio" id="star3" name="rate" value={stars} onClick={() => handleClick(3)}/>
                    <label htmlFor="star3" title="text">3 stars</label>
                    <input type="radio" id="star2" name="rate" value={stars} onClick={() => handleClick(2)}/>
                    <label htmlFor="star2" title="text">2 stars</label>
                    <input type="radio" id="star1" name="rate" value={stars} onClick={() => handleClick(1)}/>
                    <label htmlFor="star1" title="text">1 star</label>
                </div>
                <div>
                    <span className="star__text">Stars</span>
                </div>
            </div>
            <div className="review__submit__container">
                <button 
                onClick={submit}
                disabled={reviewText.length < 10 || stars === 0}
                className="submit__review-btn"
                >Submit Your Review</button>
            </div>
        </div>
    )
}