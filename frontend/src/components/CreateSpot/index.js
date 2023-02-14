import React, { useState } from 'react';

function CreateSpot() {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState([]);
    const [validations, setValidations] = useState([]);

    

    return (
       <div className='form__container'>
        <form>
            <div className='title'>
                <h1>Create a new Spot</h1>
            </div>
            <div className='description'>
                <h2>Where's your place located?</h2>
                <p>Guests will only get your exact address once they booked a reservation.</p>
            </div>
            <div className='country__container'>
                <label>
                    Country
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
                    Street Address
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
                    City
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
                    State
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
                    value={img}
                    onChange={e => setImg([...img, e.target.value])}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Preview Image URL'
                    type='url'
                    value={img}
                    onChange={e => setImg([...img, e.target.value])}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Preview Image URL'
                    type='url'
                    value={img}
                    onChange={e => setImg([...img, e.target.value])}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Preview Image URL'
                    type='url'
                    value={img}
                    onChange={e => setImg([...img, e.target.value])}
                    />
                </div>
                <div className='url__input'>
                    <input
                    placeholder='Preview Image URL'
                    type='url'
                    value={img}
                    onChange={e => setImg([...img, e.target.value])}
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