import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUserSpot } from "../../store/spots";


export default function EditSpot() {
    const history = useHistory();
    const dispatch = useDispatch();

    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.userSpots)  
    let targetSpot = spots[spotId];

    const [country, setCountry] = useState(targetSpot.country);
    const [address, setAddress] = useState(targetSpot.address);
    const [city, setCity] = useState(targetSpot.city);
    const [state, setState] = useState(targetSpot.state);
    const [lat, setLat] = useState(targetSpot.lat || '');
    const [lng, setLng] = useState(targetSpot.lng || '');
    const [description, setDescription] = useState(targetSpot.description);
    const [title, setTitle] = useState(targetSpot.name);
    const [price, setPrice] = useState(targetSpot.price);
    const [validations, setValidations] = useState([]);
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setValidations([]);
        
        targetSpot = {
            country: country,
            city: city,
            address: address,
            state: state,
            lat: lat || 100,
            lng: lng || 100,
            description: description,
            name: title,
            price: price
        }

        const updatedSpot = await dispatch(editUserSpot(targetSpot, spotId))
        if (updatedSpot) {
            history.push(`/spots/${spotId}`)
        }
        
    }
    useEffect(() => {
        const errors = [];
        if (!country) errors.push('Country is required');
        if (!address) errors.push('Address is required');
        if (!city) errors.push('City is required');
        if (!state) errors.push('State is required');
        if (description.length < 30) errors.push('Description needs a minimum of 30 characters');
        if (!title) errors.push('Name is required');
        if (!price) errors.push('Price is required');
        setValidations(errors);
    }, [country, address, city, state, description, title, price])
    

    return (
        <div className='form__container'>
        <form onSubmit={onSubmit}>
            <ul className="errors">
                {validations.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <div className='title'>
                <h1>Update your Spot</h1>
            </div>
            <div className='description'>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <div className='country__container'>
                <label>
                    Country 
                    <input 
                    className='country__input'
                    type='text'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
                </label>
            </div>
            <div className='address__container'>
                <label>
                    Street Address 
                    <input
                    className='address__input'
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                </label>
            </div>
            <div className='location__container'>
                <label>
                    City 
                    <input
                    className='city__input'
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                     ,
                </label>
                <label>
                    State 
                    <input
                    className='state__input'
                    type='text'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    />
                </label>
            </div>
            <div className='coordinate__container'>
                <label>
                    Latitude 
                    <input
                    className='latitude__input'
                    type='text'
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    />
                    ,
                </label>
                <label>
                    Longitude
                    <input
                    className='longitude__input'
                    type='text'
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    />
                </label>
            </div>
            <div className='description__container'>
                <div className='description__title'>
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                </div>
                <div className='description__input'>
                    <textarea 
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    
                </div>
            </div>
            <div className='title__container'>
                <div className='title__description'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                </div>
                <div className='title__input'>
                    <input
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                   
                </div>
            </div>
            <div className='price__container'>
                <div className='price__description'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                </div>
                <div className='price__input'>
                    <input
                    type='text'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
                    
                </div>
            </div>
            <div className='button__container'>
                <button className='Update__button'>Update Spot</button>
            </div>
        </form>
       </div>
    )
}