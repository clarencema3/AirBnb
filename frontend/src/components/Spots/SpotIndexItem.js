

export default function SpotIndexItem({ spot }) {
    return (
        <div>
            <ul className="spot-ul">
                <li>
                    {spot.previewImage}
                </li>
                <li>
                    {spot.city}, {spot.state}
                </li>
                <li>
                    {spot.avgRating}
                </li>
                <li>
                    {spot.price}
                </li>
            </ul>
        </div>
    )
}