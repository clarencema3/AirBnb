import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/all';

export const getReviews = (spotId) => {
    return {
        type: GET_REVIEWS,
        spotId
    }
}

export const getSpotReviews = (spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        const normalizedData = {};
        data.Reviews.forEach(review => normalizedData[review.id] = review)
        dispatch(getReviews(normalizedData));
        return normalizedData
    }
}

const initialState = { spot: {}, user: {} }

const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_REVIEWS: 
            return {...state, spot: {...state.spot, ...action.spotId } }
        default: 
            return state;
    }
}

export default reviewsReducer;