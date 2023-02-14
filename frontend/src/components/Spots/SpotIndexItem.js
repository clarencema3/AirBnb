import './SpotIndexItem.css';

export default function SpotIndexItem({ spot }) {
    const priceNum = Number(spot.price);
    const price = priceNum.toFixed(2)
    if (!price) return null;
    return (
        <ul className="spot-ul">
            <li>
                <img src={spot.previewImage} alt='demo-image' className="image"></img>
            </li>
            <div className='spot__text__row1'>
                <li className='spot-location'>
                    {spot.city}, {spot.state}
                </li>
                <li className='spot-rating'>
                    <i className="fa-solid fa-star"></i> {spot.avgRating === 0 ? 'New' : spot.avgRating.toFixed(1)}
                </li>
            </div>
            <div className='spot__text__row2'>
                <li className='spot-price'>
                    ${price}
                </li>
                <li>
                    <p>night</p>
                </li>
            </div>
        </ul>
    )
}