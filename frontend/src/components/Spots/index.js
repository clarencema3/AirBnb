import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { useEffect } from 'react';
import SpotIndexItem from './SpotIndexItem';

export default function SpotsIndex() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots);
    const spots = Object.values(spotsObj.allSpots)
    

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <div className='spots__container'>
            <ul>
                {spots.map(spot => {
                    return (
                        <li>
                            <SpotIndexItem spot={spot} />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}