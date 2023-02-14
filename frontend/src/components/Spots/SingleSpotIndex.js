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
            <div className="spot__name">
                {spotObj.name}
            </div>
            <div className="spot__location">
                {spotObj.city}, {spotObj.state}, {spotObj.country}
            </div>
            <div>
                <ul className="spot__images__list">
                    {images.map(image => {
                        return (
                            <li>
                                <img className="spot__images" src={image.url}></img>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="description__price__container">
                <div className="information">
                    <div className="owner">
                        <p>Hosted by {spotObj.Owner.firstName} {spotObj.Owner.lastName}</p>
                    </div>
                    <div className="description">
                        <p>{spotObj.description}</p>
                    </div>
                </div>
                <div className="price__section">
                    <div className="price__info">
                        <p className="price">${spotObj.price.toFixed(2)}</p>
                        <p className="night">night</p>
                        <p className="stars"><i className="fa-solid fa-star"></i> {spotObj.avgStarRating === 0 ? 'New' : spotObj.avgStarRating.toFixed(1)}</p>
                        <p className="reviews">{spotObj.numReviews === 0 ? '' : `${spotObj.numReviews} review(s)`} </p>
                    </div>
                    <div className="reserve__button__container">
                        <button onClick={showMessage} className="reserve__button">Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
//{spot.avgRating === 0 ? 'New' :spot.avgRating.toFixed(1)}