import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";
import './SingleSpotIndex.css'

export default function SingleSpotIndex() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot)
    const images = spotObj.SpotImages;
    
    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    }, [dispatch])
    
    if (!images) return null;

    function showMessage() {
        window.alert('Feature coming soon')
    }

    return (
        <div className="single__spot__container">
            <div className="spot__header-div">
                <div className="single__spot__name">
                    {spotObj.name}
                </div>
                <div className="single__spot__location">
                    {spotObj.city}, {spotObj.state}, {spotObj.country}
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
                        <p>Hosted by {spotObj.Owner.firstName} {spotObj.Owner.lastName}</p>
                    </div>
                    <p className="single__spot__description">{spotObj.description}</p>
                </div>
                <div className="single__spot__infoarea">
                    <div className="border-div">
                        <div className="one__spot__details">
                            <div className="spot__price-div">
                                <p className="price">${spotObj.price.toFixed(2)}</p>
                                <p className="night">night</p>
                            </div>
                            <div className="spot-review-div">
                                <p className="stars"><i className="fa-solid fa-star"></i> {spotObj.avgStarRating === 0 ? 'New' : spotObj.avgStarRating.toFixed(1)}</p>
                                <p className="dot">{spotObj.numReviews === 0 ? '' : '.'}</p>
                                <p className="reviews">
                                {spotObj.numReviews === 0 ? '' : 
                                spotObj.numReviews === 1 ? `${spotObj.numReviews} review` :
                                `${spotObj.numReviews} reviews`
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
        </div>
    )
}
//{spot.avgRating === 0 ? 'New' :spot.avgRating.toFixed(1)}