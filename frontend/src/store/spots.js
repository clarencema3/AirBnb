import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/all';
const GET_SINGLE_SPOT = 'spot/spotId';
const ADD_SPOT = 'spots/add';
const USER_SPOTS = 'user/spots'
const EDIT_SPOT = 'spot/edit'

export const editSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
    }
}

export const getSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}

export const addSpot = (spot) => {
    return {
        type: ADD_SPOT,
        spot
    }
}

export const userSpots = (spots) => {
    return {
        type: USER_SPOTS,
        spots
    }
}

export const editUserSpot = (spot, spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json();
        const normalizedData = {};
        normalizedData[spot.id] = spot;
        dispatch(editSpot(normalizedData))
        return normalizedData
    }
}

export const getUserSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const spots = await response.json();
        const normalizedData = {};
        spots.Spots.forEach(item => normalizedData[item.id] = item)
        dispatch(userSpots(normalizedData));
        return normalizedData
    }
}

export const createSpot = (spot, images) => async(dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    //get the response from fetching the spot first
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,                  
            lng,
            name,
            description,
            price
        })
    });
    //if we are able to find the spot
    if (response.ok) {
        //we want to turn into into a json object
        const spot = await response.json();
        //now we loop through the images array that we passed in through the dispatch
        //for every image object in that array, we want to fetch that image
        spot['SpotImages'] = [];
        for (let i = 0; i < images.length; i++) {
            let nextResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(images[i])
            })
            //if the response is ok from the fetch
            if (nextResponse.ok) {
                //we want to attach that image object to the property called SpotImages(array)
                let singleImage = await nextResponse.json();
                spot.SpotImages.push(singleImage)
            }
        }
        //once we are done with the loop, we can dispatch the spot
        // dispatch(addSpot(spot))
        dispatch(getSingleSpot(spot.id))
        return spot
    }
}

export const fetchSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleSpot(data))
        return data
    }
}

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots');
    if (response.ok) {
        const data = await response.json();
        const normalizedData = {};
        data.Spots.forEach(item => normalizedData[item.id] = item)
        dispatch(getSpots(normalizedData));
    }
}

const initialState = { allSpots: {}, singleSpot: {}, userSpots: {} };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_SPOT:
            console.log('action passed into reducer',action)
            return {...state, userSpots: {...state.userSpots, ...action.spot }, singleSpot: {...state.singleSpot, ...action.spot}, allSpots: {...state.allSpots, ...action.spot} }
        case USER_SPOTS:
            return {...state, userSpots: {...state.userSpots, ...action.spots}}
        case ADD_SPOT:
            const newState = {...state, allSpots: {...state.allSpots, ...action.spot}, singleSpot: {...state.spot, ...action.spot} }
            newState.allSpots['previewImage'] = newState.allSpots.SpotImages[0].url;
            delete newState.allSpots.SpotImages
            return newState
        case GET_SINGLE_SPOT:
            return {...state, allSpots: {...state.allSpots} ,singleSpot: {...state.spot, ...action.spot}}
        case GET_SPOTS:
            return {...state, allSpots: {...state.allSpots, ...action.spots} }
        default:
            return state;
    }
}

export default spotsReducer;