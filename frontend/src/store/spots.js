import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/all'
const GET_SINGLE_SPOT = 'spot/spotId'

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

export const fetchSingleSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleSpot(data))
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
        case GET_SINGLE_SPOT:
            return {...state, allSpots: {...state.allSpots} ,singleSpot: {...state.spot, ...action.spot}}
        case GET_SPOTS:
            return {...state, allSpots: {...state.allSpots, ...action.spots} }
        default:
            return state;
    }
}

export default spotsReducer;