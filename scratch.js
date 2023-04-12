<div className="delete-review-container">
      <h2>Confirm Delete</h2>
      <p className="delete-question">
        Are you sure you want to remove this product from the listings?
      </p>
      <button onClick={handleSubmit} className="delete-review-button">
        Yes (Delete Product)
      </button>
      <button onClick={closeModal} className="keep-review-button">
        No (Keep Product)
      </button>
</div>