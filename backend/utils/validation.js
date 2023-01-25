// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }
  next();
};

const createSpotValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    
    const errorsObj = {};
    const errors = validationErrors
      .array()
    for (let error of errors) {
      errorsObj[`${error.param}`] = `${error.msg}`
    }
    
    const err = new Error('Validation Error');
    err.status = 400;
    err.errors = errorsObj;
    next(err)
  }
  next();
};

const createReviewValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    
    const errorsObj = {};
    const errors = validationErrors
      .array()
    for (let error of errors) {
      errorsObj[`${error.param}`] = `${error.msg}`
    }
    
    const err = new Error('Validation Error');
    err.status = 400;
    err.errors = errorsObj;
    next(err)
  }
  next();
}

module.exports = {
  handleValidationErrors,
  createSpotValidationErrors,
  createReviewValidationErrors
};