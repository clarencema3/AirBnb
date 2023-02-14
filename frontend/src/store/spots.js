import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/all';
const GET_SINGLE_SPOT = 'spot/spotId';
const ADD_SPOT = 'spots/add';

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

export const createSpot = (spot) => async(dispatch) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = spot;
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

    if (response.ok) {
        const spot = await response.json();
        dispatch(addSpot(spot));
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

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SPOT:
            return {...state, allSpots: {...state.allSpots, ...action.spot}}
        case GET_SINGLE_SPOT:
            return {...state, allSpots: {...state.allSpots} ,singleSpot: {...state.spot, ...action.spot}}
        case GET_SPOTS:
            return {...state, allSpots: {...state.allSpots, ...action.spots} }
        default:
            return state;
    }
}

export default spotsReducer;