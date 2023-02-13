import './SpotIndexItem.css';

export default function SpotIndexItem({ spot }) {
    return (
        <div>
            <ul className="spot-ul">
                <li className='spot-li'>
                    <img src={spot.previewImage} alt='demo-image' className="image"></img>
                </li>
                <li className='spot-li'>
                    {spot.city}, {spot.state}
                </li>
                <li className='spot-li'>
                    {spot.avgRating}
                </li>
                <li className='spot-li'>
                    {spot.price}
                </li>
            </ul>
        </div>
    )
}