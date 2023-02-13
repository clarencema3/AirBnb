import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSingleSpot } from "../../store/spots";

export default function SingleSpotIndex({ spot }) {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spotObj = useSelector(state => state.spots.singleSpot)
    const images = spotObj.SpotImages;
    console.log('spotObj', spotObj)
    useEffect(() => {
        dispatch(fetchSingleSpot(spotId))
    }, [dispatch])
    
    

    return (
        <div className="single__spot__container">
            <div className="spot__name">
                {spotObj.name}
            </div>
            <div className="spot__location">
                {spotObj.city}, {spotObj.state}, {spotObj.country}
            </div>
            <div className="spot__images__container">
                <ul className="spot__images">
                    {images.map(image => {
                        return (
                            <li>
                                <img src={image.url}></img>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="description__price__container">
                <div className="description__section">
                    <p>Hosted by {spotObj.Owner.firstName} {spotObj.Owner.lastName}</p>
                    <p>{spotObj.description}</p>
                </div>
                <div className="price__section">
                    <div className="price__info">
                        <p>${spotObj.price} night</p>
                        <p><i className="fa-solid fa-star"></i> {spotObj.avgStarRating.toFixed(1)}</p>
                        <p>{spotObj.numReviews} reviews</p>
                    </div>
                    <div className="reserve-button">
                        <button>Reserve</button>
                    </div>
                </div>
            </div>
        </div>
    )
}