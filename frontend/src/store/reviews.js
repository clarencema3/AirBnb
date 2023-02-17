import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/all';
const ADD_REVIEW = 'review/add'
const USER_REVIEWS = 'review/user'

export const getUserReviews = (reviews) => {
    return {
        type: USER_REVIEWS,
        reviews
    }
}


export const getReviews = (spotId) => {
    return {
        type: GET_REVIEWS,
        spotId
    }
}

export const createReview = (reviewId) => {
    return {
        type: ADD_REVIEW,
        reviewId
    }
}

export const addReview = (review, spotId, currentUser) => async(dispatch) => {
    console.log('review in thunk', review);
    console.log('spotId in thunk', spotId);
    console.log('current user in thunk', currentUser)
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();
        const normalizedData = {};
        normalizedData[review.id] = review;
        dispatch(createReview(normalizedData))
    }

}

export const getCurrentUserReviews = () => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`);
    if (response.ok) {
        const userReview = await response.json();
        const normalizedData = {};
        userReview.Reviews.forEach(review => normalizedData['reviewId'] = review)
        console.log('response in thunk', userReview)
        dispatch(getUserReviews(normalizedData))
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
        case USER_REVIEWS:
            console.log('action in reducer', action)
            return {...state, user: {...state.user, ...action.reviews }, spot: {...state.spot, ...action.reviews}}
        case ADD_REVIEW:
            console.log('action in reducer', action)
            return {...state, spot: {...state.spot, ...action.reviewId }, user: {...state.user, ...action.reviewId } }
        case GET_REVIEWS: 
            return {...state, spot: {...state.spot, ...action.spotId } }
        default: 
            return state;
    }
}

export default reviewsReducer;