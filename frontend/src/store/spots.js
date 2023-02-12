import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/all'

export const getSpots = (spots) => {
    return {
        type: GET_SPOTS,
        spots
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
        case GET_SPOTS:
            return {...state, allSpots: {...state.allSpots, ...action.spots} }
        default:
            return state;
    }
}

export default spotsReducer;