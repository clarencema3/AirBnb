import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { useEffect } from 'react';
import SpotIndexItem from './SpotIndexItem';
import { useHistory } from 'react-router-dom';
import './SpotIndex.css';

export default function SpotsIndex() {
    const dispatch = useDispatch();
    const history = useHistory();
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots)
    
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    const handleClick = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className='spots-container'>
            {spots.map(spot => {
                return (
                    <li className='spot-tile' key={spot.id} onClick={() => handleClick(spot.id)}>
                        <SpotIndexItem key={spot.id} spot={spot} />
                    </li>
                )
            })}
        </div>
    )
}