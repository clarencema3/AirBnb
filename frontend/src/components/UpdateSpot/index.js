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
    const user = useSelector(state => state.session.user)
    let targetSpot = spots[spotId];
    if (user.id !== targetSpot?.ownerId) history.push('/')
    
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
    const [submitted, setSubmitted] = useState(false)

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

    useEffect(() => {
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
        validate();
    }, [country, address, city, state, description, title, price])

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        
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
        <form className='form__container' onSubmit={onSubmit}>
            <div className='form__contents'>
                <div>
                    <p className='title'>Update your Spot</p>
                </div>
                <div className='description__container'>
                    <p className='header'>Where's your place located?</p>
                    <p className='description'>Guests will only get your exact address once they booked a reservation.</p>
                </div>
                <div className='country__container'>
                    <label>
                        Country {submitted && validations.country && (<span className='create__spot__error'>{validations.country}</span>)}
                    </label>
                    <input 
                    placeholder='Country'
                    className='country__input'
                    type='text'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
                </div>
                <div className='address__container'>
                    <label>
                        Street Address {submitted && validations.address && (<span className='create__spot__error'>{validations.address}</span>)}
                    </label>
                    <input
                    placeholder='Address'
                    className='address__input'
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                </div>
                <div className='location__label__container'>
                    <div className='city__label__div'>
                        <label className='city__label'>
                            City {submitted && validations.city && (<span className='create__spot__error'>{validations.city}</span>)}
                        </label>
                    </div>
                    <div className='state__label__div'>
                        <label className='state__label'>
                            State {submitted && validations.state && (<span className='create__spot__error'>{validations.state}</span>)}
                        </label>
                    </div>
                </div>
                <div className='location__input__container'>
                    <input
                    placeholder='City'
                    className='city__input'
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                    <p className='comma'> , </p>
                    <input
                    placeholder='State'
                    className='state__input'
                    type='text'
                    value={state}
                    onChange={e => setState(e.target.value)}
                    />
                </div>
                <div className='coordinate__label__container'>
                    <label className='lat__label'>
                        Latitude 
                    </label>
                    <label className='lng__label'>
                        Longitude
                    </label>
                </div>
                <div className='coordinate__input__container'>
                    <input
                    placeholder='Latitude'
                    className='latitude__input'
                    type='text'
                    value={lat}
                    onChange={e => setLat(e.target.value)}
                    />
                    <p className='comma'>,</p>
                    <input
                    placeholder='Longitude'
                    className='longitude__input'
                    type='text'
                    value={lng}
                    onChange={e => setLng(e.target.value)}
                    />
                </div>
                <div className='description__container'>
                    <div className='description__title'>
                        <p className='header'>Describe your place to guests</p>
                        <p className='description'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                    </div>
                    <div>
                        <textarea 
                        className='description__input'
                        placeholder='Please write at least 30 characters'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        {submitted && validations.description && (<p className='create__spot__error'>{validations.description}</p>)}
                    </div>
                </div>
                <div className='title__container'>
                    <div className='title__description'>
                        <p className='header'>Create a title for your spot</p>
                        <p className='description'>Catch guests' attention with a spot title that highlights what makes your place special</p>
                    </div>
                    <div className='title__input__container'>
                        <input
                        className='title__input'
                        placeholder='Name of your spot'
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        />
                        {submitted && validations.title && (<p className='create__spot__error'>{validations.title}</p>)}
                    </div>
                </div>
                <div className='formprice__container'>
                    <div className='price__description'>
                        <p className='header-price'>Set a base price for your spot</p>
                        <p className='description-price'>Competitive pricing can help your listing stand out and rank higher in search results</p>
                    </div>
                    <div className='price__input__container'>
                        <span className='sign'>$</span>
                        <input
                        className='price__input'
                        placeholder='Price per night (USD)'
                        type='text'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        />  
                    </div>
                    <div>
                        {submitted && validations.price && (<p className='create__spot__error'>{validations.price}</p>)}
                    </div>
                </div>
                <div className='form__button__container'>
                    <button className='form__create__button'>Create Spot</button>
                </div>
            </div>
        </form>
    )
}