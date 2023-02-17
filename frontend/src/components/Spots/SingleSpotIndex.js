import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import { getSpotReviews, getCurrentUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import './SingleSpotIndex.css'
import CreateReview from "../CreateReview";
import DeleteReview from "../DeleteReview";

export default function SingleSpotIndex() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot);
    const reviews = useSelector(state => state.reviews.spot);
    const user = useSelector(state => state.session.user);
    const images = spotObj?.SpotImages;
    const reviewsArr = Object.values(reviews);
    
    let price = spotObj?.price;
    if (price) {
        price = Number(price).toFixed(2)
    }
    let avgRating = spotObj?.avgStarRating;
    if (avgRating) {
        avgRating = Number(avgRating).toFixed(1)
    }

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
        dispatch(getSpotReviews(spotId))
        
    }, [dispatch, spotId, reviewsArr.length])
    
    if (!images) return null;
    //function for hiding or showing the post a review button
    const postReviewButton = () => {
        //if there is no user logged in, hide the button
        if (!user) {
            return true
            //if the current user is logged in and they own the spot, hide the button
        } else if (user?.id === spotObj?.Owner?.id) {
            return true
        } 
        //if the current user is logged in and they already have a review, hide the button
        
        for (let review of reviewsArr) {
            if (user?.id === review.User?.id) {
                return true
            }
        }
        //if the current user is logged in and hasn't posted a review for the spot, show the button
        
        return false
    }

    function showMessage() {
        window.alert('Feature coming soon')
    }

    return (
        <div className="single__spot__container">
            <div className="spot__header-div">
                <div className="single__spot__name">
                    {spotObj?.name}
                </div>
                <div className="single__spot__location">
                    {spotObj?.city}, {spotObj?.state}, {spotObj?.country}
                </div>
            </div>
            <div className="spot__image__container">
                <div className="big__image__container">
                    <div className="big__spot__image">
                        <img className="big__image" src={images[0].url}></img>
                    </div>
                </div>
                <div className="small__image__container">
                    {images[1] && <img className="small__image" src={images[1].url}></img>}
                    {images[2] && <img className="small__image" src={images[2].url}></img>}
                    {images[3] && <img className="small__image" src={images[3].url}></img>}
                    {images[4] && <img className="small__image" src={images[4].url}></img>}      
                </div>
            </div>
            <div className="single__spot__info-div">
                <div className="single__spot__textarea">
                    <div className="single__spot__header">
                        <p>Hosted by {spotObj?.Owner?.firstName} {spotObj?.Owner?.lastName}</p>
                    </div>
                    <p className="single__spot__description">{spotObj?.description}</p>
                </div>
                <div className="single__spot__infoarea">
                    <div className="border-div">
                        <div className="one__spot__details">
                            <div className="spot__price-div">
                                <p className="price">${price}</p>
                                <p className="night">night</p>
                            </div>
                            <div className="spot-review-div">
                                <p className="stars"><i className="fa-solid fa-star"></i> {avgRating === 0.0 ? 'New' : avgRating}</p>
                                <p className="dot">{spotObj?.numReviews === 0 ? '' : '.'}</p>
                                <p className="reviews">
                                {spotObj?.numReviews === 0 ? '' : 
                                spotObj?.numReviews === 1 ? `${spotObj?.numReviews} review` :
                                `${spotObj?.numReviews} reviews`
                                } 
                                </p>
                            </div>
                        </div>
                        <div className="reserve__button__container">
                            <button onClick={showMessage} className="reserve__button">Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="review__container">
                <div className="review__header">
                    <p className="review__stars"><i className="fa-solid fa-star"></i> {avgRating === 0.0 ? 'New' : avgRating}</p>
                    <p className="review__dot">{spotObj?.numReviews === 0 ? '' : '·'}</p>
                    <p className="review__numReviews">
                    {spotObj?.numReviews === 0 ? '' : 
                    spotObj?.numReviews === 1 ? `${spotObj?.numReviews} review` :
                    `${spotObj?.numReviews} reviews`
                    } 
                    </p>
                </div>
                <div className={postReviewButton() ? 'hideReviewButton' : 'showReviewButton'}>
                    <OpenModalButton 
                    modalComponent={<CreateReview spotId={spotId}/>}
                    buttonText='Post Your Review'
                    />
                </div>
                <div className="review__display">
                {/* display reviews if there are any, and none if there aren't*/}
                    {reviewsArr.length ? 
                        reviewsArr.map(review => {
                            return (
                                <div key={review.id} className="reviewer__container">
                                    <div className="reviewer__firstName">{review.User?.firstName}</div>
                                    <div className="review__date">{review.createdAt?.substring(0, 10)}</div>
                                    <div className="review__text">{review.review}</div>
                                    {review.userId === user.id ? 
                                    <OpenModalButton
                                    buttonText={'Delete'}
                                    modalComponent={<DeleteReview reviewId={review.id} />} 
                                    /> :
                                    <></>
                                    }
                                </div>
                            )
                        }) :
                        <></>
                    }
                    {/* if the current logged in user isn't the owner and there aren't any reviews, display this*/}
                    {user?.id !== spotObj?.Owner?.id && !reviewsArr.length ? 
                        <div className="first__review">Be the first to post a review!</div> :
                        <></>
                    }
                </div>
            </div>
        </div>
    )
}