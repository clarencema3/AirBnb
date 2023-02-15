import React, { useEffect, useState } from "react";
import { getUserSpots } from "../../store/spots";
import { useSelector, useDispatch } from "react-redux";
import CreateSpot from "../CreateSpot";
import { NavLink } from "react-router-dom";
import SpotIndexItem from "../Spots/SingleSpotIndex";
import './ManageSpot.css';

export default function ManageSpots() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const spotsObj = useSelector(state => state.spots.allSpots)
    const spotsArr = Object.values(spotsObj)
    const userSpots = [];
    for (let obj of spotsArr) {
        if (obj.ownerId === user.id) {
            userSpots.push(obj)
        }
    }
    
    return (
        <div className="spots__container">
            <div className="top__container">
                <div className="title__container">
                    <p className="title">Manage Spots</p>
                </div>
                <div className="create__container">
                    <NavLink className='link' to='/spots/new'>Create a New Spot</NavLink>
                </div>
        </div>
        <div className="spots-container">
        {userSpots.map(spot => (
                <div className="spot-tile">
                    <ul className="spot-ul">
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
                            <li className='spot-price'>
                                ${Number(spot.price).toFixed(2)}
                            </li>
                            <li>
                                <button>Update</button>
                                <button>Delete</button>
                            </li>
                        </div>
                    </ul>
                </div>
            ))}
        </div>
        </div>
    )
}