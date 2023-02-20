import React, { useState, useEffect } from 'react';
import { createSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateSpot.css';

function CreateSpot() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [validations, setValidations] = useState({});
    const [submitted, setSubmitted] = useState(false)

    function isImage(url) {
        return /(.*)(\.png|.jpg|.jpeg)/.test(url);
    }
    
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
            if (!previewImg) errors.previewImg = 'Preview image is required'
            if (isImage(previewImg) === false) errors.image = 'Image URL must end in .png, .jpg, or .jpeg';
            if (img2 && isImage(img2) === false ||
                img3 && isImage(img3) === false||
                img4 && isImage(img4) === false||
                img5 && isImage(img5) === false
            ) errors.image = 'Image URL must end in .png, .jpg, or .jpeg';
            setValidations(errors);
        }
        validate();
    }, [country, address, city, state, description, title, price, previewImg, img2, img3, img4, img5])
    
    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        
        const newSpotObj = {
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

        const imageList = [];
        const newImage = {
            url: previewImg,
            preview: true
        }

        imageList.push(newImage)
        if (img2) {
            const secondImage = {
                url: img2,
                preview: false
            }
            imageList.push(secondImage)
        }
        if (img3) {
            const secondImage = {
                url: img3,
                preview: false
            }
            imageList.push(secondImage)
        }
        if (img4) {
            const secondImage = {
                url: img4,
                preview: false
            }
            imageList.push(secondImage)
        }
        if (img5) {
            const secondImage = {
                url: img5,
                preview: false
            }
            imageList.push(secondImage)
        }

        setPrice('');
        setTitle('');
        setAddress('');
        setCity('');
        setCountry('');
        setState('');
        setLat('');
        setLng('');
        setDescription('');
        setPreviewImg('');
        setImg2('');
        setImg3('');
        setImg4('');
        setImg5('');

        const createdSpot = await dispatch(createSpot(newSpotObj, imageList))
        if (createdSpot) {
            history.push(`/spots/${createdSpot.id}`)
        }
    }
    
    return (
        <form className='form__container' onSubmit={onSubmit}>
            <div className='form__contents'>
                <div>
                    <p className='title'>Create a new Spot</p>
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
                <div className='url__container'>
                    <div className='url__description'>
                        <p className='header'>Liven up your spot with photos</p>
                        <p className='description'>Submit a link to at least one photo to publish your spot</p>
                    </div>
                    <div>
                        <input
                        className='url__input preview'
                        placeholder='Preview Image URL'
                        type='url'
                        value={previewImg}
                        onChange={e => setPreviewImg(e.target.value)}
                        />
                        {submitted && validations.previewImg && (<p className='create__spot__error'>{validations.previewImg}</p>)}
                    </div>
                    <div>
                        <input
                        className='url__input img2'
                        placeholder='Image URL'
                        type='url'
                        value={img2}
                        onChange={e => setImg2(e.target.value)}
                        />
                        {submitted && validations.image && (<p className='create__spot__error'>{validations.image}</p>)}
                    </div>
                    <div>
                        <input
                        className='url__input img3'
                        placeholder='Image URL'
                        type='url'
                        value={img3}
                        onChange={e => setImg3(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                        className='url__input img4'
                        placeholder='Image URL'
                        type='url'
                        value={img4}
                        onChange={e => setImg4(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                        className='url__input img5'
                        placeholder='Image URL'
                        type='url'
                        value={img5}
                        onChange={e => setImg5(e.target.value)}
                        />
                    </div>
                </div>
                <div className='form__button__container'>
                    <button className='form__create__button'>Create Spot</button>
                </div>
            </div>
        </form>
        
       
    )
}

export default CreateSpot;