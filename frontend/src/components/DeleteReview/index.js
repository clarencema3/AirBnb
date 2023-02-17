import React from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { deleteUserReview, getSpotReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';

export default function DeleteReview ({ reviewId }) {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirm = (e) => {
        e.preventDefault();
        dispatch(deleteUserReview(reviewId))
        closeModal();
    }

    return (
        <div className="delete__modal__container">
            <div className="delete__title__container">
                <p className="delete__title">Confirm Delete</p>
            </div>
            <div className="delete__question__container">
                <p className="delete__question">Are you sure you want to delete this review?</p>
            </div>
            <div className="delete__button__container">
                <button onClick={confirm} className="delete__button">Yes (Delete Review)</button>
            </div>
            <div className="delete__button__container">
                <button onClick={closeModal} className="deny__button">No (Keep Review)</button>
            </div>
        </div>
    )
}