import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteUserSpot } from "../../store/spots";

export default function DeleteSpot ({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const confirm = (e) => {
        e.preventDefault();
        dispatch(deleteUserSpot(spotId))
            .then(closeModal())
    }

    return (
        <div className="modal__container">
            <div className="title__container">
                <p className="title">Confirm Delete</p>
            </div>
            <div className="question__container">
                <p className="question">Are you sure you want to remove this spot from the listings?</p>
            </div>
            <div className="confirm__container">
                <button onClick={confirm} className="confirm">Yes (Delete Spot)</button>
            </div>
            <div className="deny__container">
                <button onClick={closeModal} className="deny">No (Keep Spot)</button>
            </div>
        </div>
    )
}