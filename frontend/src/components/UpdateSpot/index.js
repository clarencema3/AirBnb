import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editUserSpot, fetchSingleSpot } from "../../store/spots";
import './UpdateSpot.css';

export default function EditSpot() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spots = useSelector(state => state.spots.userSpots); 
    let targetSpot = spots[spotId];
    
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [validations, setValidations] = useState({});

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
        const getValues = async () => {
            let previousValues = await dispatch(fetchSingleSpot(spotId));
            setCountry(previousValues.country);
            setAddress(previousValues.address);
            setCity(previousValues.city);
            setState(previousValues.state);
            setLat(previousValues.lat);
            setLng(previousValues.lng);
            setDescription(previousValues.description);
            setTitle(previousValues.name);
            setPrice(previousValues.price);
        }
        getValues();
    }, [dispatch])

    const validate = () => {
        const errors = {};
        if (!country) errors.country = 'Country is required';
        if (!address) errors.address = 'Address is required';
        if (!city) errors.city = 'City is required';
        if (!state) errors.state = 'State is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!title) errors.title = 'Name is required';
        if (!price) errors.price = 'Price is required';
        setValidations(errors);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        validate();
        console.log('errors object', validations)
        if (validations.length) {
            setValidations({})
        }
        
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
    
    return (
        <form className='update__form__container' onSubmit={onSubmit}>
            <div className='update__form__contents'>
                <div className='update__form__title'>
                    <h1>Update your Spot</h1>
                </div>
                <div className='update__form__description'>
                    <h2>Where's your place located?</h2>
                    <p>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <div className='update__country__container'>
                    <label>
                        Country {validations.country && (<span className='create__spot__error'>{validations.country}</span>)}
                        <input 
                        className='update__country__input'
                        type='text'
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        />
                    </label>
                </div>
                <div className='update__address__container'>
                    <label>
                        Street Address {validations.address && (<span className='create__spot__error'>{validations.address}</span>)}
                        <input
                        className='update__address__input'
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                </div>
                <div className='update__location__container'>
                    <label>
                        City {validations.city && (<span className='create__spot__error'>{validations.city}</span>)}
                        <input
                        className='update__city__input'
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        />
                        ,
                    </label>
                    <label>
                        State {validations.state && (<span className='create__spot__error'>{validations.state}</span>)}
                        <input
                        className='update__state__input'
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        />
                    </label>
                </div>
                <div className='update__coordinate__container'>
                    <label>
                        Latitude 
                        <input
                        className='update__latitude__input'
                        type='text'
                        value={lat}
                        onChange={e => setLat(e.target.value)}
                        />
                        ,
                    </label>
                    <label>
                        Longitude
                        <input
                        className='update__longitude__input'
                        type='text'
                        value={lng}
                        onChange={e => setLng(e.target.value)}
                        />
                    </label>
                </div>
                <div className='update__description__container'>
                    <div className='update__description__title'>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    </div>
                    <div className='update__description__input'>
                        <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        {validations.description && (<span className='create__spot__error'>{validations.description}</span>)}
                    </div>
                </div>
                <div className='update__title__container'>
                    <div className='update__title__description'>
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                    </div>
                    <div className='update__title__input'>
                        <input
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                        {validations.title && (<span className='create__spot__error'>{validations.title}</span>)}
                    </div>
                </div>
                <div className='update__price__container'>
                    <div className='update__price__description'>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    </div>
                    <div className='update__price__input'>
                        <input
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        />
                        {validations.price && (<span className='create__spot__error'>{validations.price}</span>)}
                    </div>
                </div>
                <div className='update__button__container'>
                    <button className='update__button'>Update Spot</button>
                </div>
            </div>
        </form>
    )
}