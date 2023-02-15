import React, { useState } from 'react';
import { createSpot } from '../../store/spots';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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
    

    function isImage(url) {
        return /\.(jpg|jpeg|png)$/.test(url);
    }

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
        if (isImage(previewImg) === false || 
        isImage(img2) === false || 
        isImage(img3) === false || isImage(img4) || 
        isImage(img5)) errors.image = 'Image URL must end in .png, .jpg, or .jpeg';
        setValidations(errors);
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        validate();

        if (validations.length) {
            setValidations({})
        }
        
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
       <div className='form__container'>
        <form onSubmit={onSubmit}>
            <div className='title'>
                <h1>Create a new Spot</h1>
            </div>
            <div className='description'>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <div className='country__container'>
                <label>
                    Country {validations.country && (<span>{validations.country}</span>)}
                    <input 
                    placeholder='Country'
                    className='country__input'
                    type='text'
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    />
                </label>
            </div>
            <div className='address__container'>
                <label>
                    Street Address {validations.address && (<span>{validations.address}</span>)}
                    <input
                    placeholder='Address'
                    className='address__input'
                    type='text'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    />
                </label>
            </div>
            <div className='location__container'>
                <label>
                    City {validations.city && (<span>{validations.city}</span>)}
                    <input
                    placeholder='City'
                    className='city__input'
                    type='text'
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                     ,
                </label>
                <label>
                    State {validations.state && (<span>{validations.state}</span>)}
                    <input
                    placeholder='STATE'
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
                    placeholder='Latitude'
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
                    placeholder='Longitude'
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
                    placeholder='Please write at least 30 characters'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    ></textarea>
                    {validations.description && (<p>{validations.description}</p>)}
                </div>
            </div>
            <div className='title__container'>
                <div className='title__description'>
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests' attention with a spot title that highlights what makes your place special</p>
                </div>
                <div className='title__input'>
                    <input
                    placeholder='Name of your spot'
                    type='text'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    />
                    {validations.title && (<p>{validations.title}</p>)}
                </div>
            </div>
            <div className='price__container'>
                <div className='price__description'>
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
                </div>
                <div className='price__input'>
                    <input
                    placeholder='Price per night (USD)'
                    type='text'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    />
                    {validations.price && (<p>{validations.price}</p>)}
                </div>
            </div>
            <div className='url__container'>
                <div className='url__description'>
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot</p>
                </div>
                <div className='preview__url__input'>
                    <input
                    placeholder='Preview Image URL'
                    type='url'
                    value={previewImg}
                    onChange={e => setPreviewImg(e.target.value)}
                    />
                    {validations.previewImg && (<p>{validations.previewImg}</p>)}
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Image URL'
                    type='url'
                    value={img2}
                    onChange={e => setImg2(e.target.value)}
                    />
                    {validations.image && (<p>{validations.image}</p>)}
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Image URL'
                    type='url'
                    value={img3}
                    onChange={e => setImg3(e.target.value)}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Image URL'
                    type='url'
                    value={img4}
                    onChange={e => setImg4(e.target.value)}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Image URL'
                    type='url'
                    value={img5}
                    onChange={e => setImg5(e.target.value)}
                    />
                </div>
            </div>
            <div className='button__container'>
                <button className='create__button'>Create Spot</button>
            </div>
        </form>
       </div>
    )
}

export default CreateSpot;