import React, { useEffect } from "react";
import { fetchSpots, getUserSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import DeleteSpot from '../DeleteSpot';
import './ManageSpot.css';
import UpdateSpot from '../UpdateSpot'

export default function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)
    const spotsObj = useSelector(state => state.spots.userSpots)
    const spotsArr = Object.values(spotsObj)
    const userSpots = [];
    for (let obj of spotsArr) {
        if (obj.ownerId === user.id) {
            userSpots.push(obj)
        }
    }


    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    useEffect(() => {
        dispatch(getUserSpots())
    }, [dispatch])
    
    if (!user) return null;

    return (
        <div className="spots__container">
            <div className="top__container">
                <div className="manage__title__container">
                    <p className="title">Manage Spots</p>
                </div>
                <div className="create__container">
                    <NavLink className={userSpots.length ? 'hidden' : 'link'} to='/spots/new'>Create a New Spot</NavLink>
                </div>
        </div>
        <div className="spots-container">
        {userSpots.map(spot => (
            <div key={spot.id} className="tileButton__separator">
                <div className="spot-tile" key={spot.id}>
                    <ul className="spot-ul" onClick={() => handleClick(spot.id)}>
                        <li>
                            <img src={spot.previewImage} alt='demo-image' className="image"></img>
                        </li>
                        <div className='spot__text__row1'>
                            <li className='spot-location'>
                                {spot.city}, {spot.state}
                            </li>
                            <li className='spot-rating'>
                                <i className="fa-solid fa-star"></i>{Number(spot.avgRating).toFixed(1) == 0 ? 'New' : Number(spot.avgRating).toFixed(1)}
                            </li>
                        </div>
                        <div className='spot__text__row2'>
                            <div className="price__container">
                                <li className='spot-price'>
                                    ${Number(spot.price).toFixed(2)}
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>
                <div className="button__container">
                    <li>
                        <NavLink className='edit' to={`/spots/${spot.id}/edit`}>Update</NavLink>     
                    </li>
                    <div className='delete'>
                        <OpenModalButton
                            buttonText="Delete" 
                            modalComponent={<DeleteSpot spotId={spot.id} />}
                        />
                    </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    )
}