const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, ReviewImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { nonSignUpValidationErrors } = require('../../utils/validation');
const router = express.Router();

const validateReviewRequestBody = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
    nonSignUpValidationErrors
];

//Get all reviews of the current user
router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const reviews = await Review.findAll({
        where: {
            userId: userId
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { 
              model: Spot, 
              attributes: [
              'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'
              ] 
            },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    });
    
    const Reviews = [];
    for (let review of reviews) {
        Reviews.push(review.toJSON())
    };
    for (let review of Reviews) {
        review.ReviewImages.forEach(image => {
            if (image.url) {
                review.Spot.previewImage = image.url
            } 
        })
    };

    res.json({Reviews});
});

//Add an image to a review based on the review's id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const review = await Review.findByPk(req.params.reviewId);
    const userId = req.user.id;
    const { url } = req.body;

    if (!review) {
        const err = Error("Review couldn't be found");
        err.status = 404;
        next(err);
    };

    if (userId !== review.userId) {
        const err = Error("Forbidden");
        err.status = 403;
        next(err);
    };

    if (!url) {
        res.status(400);
        return res.json({
            message: 'Please provide a url to the image you want to create'
        })
    };

    const reviewImageCount = await ReviewImage.count({
        where: {
            reviewId: review.id
        }
    });

    if (reviewImageCount >= 10) {
        res.status(403);
        return res.json({
            message: 'Maximum number of images for this resource was reached',
            statusCode: 403
        })
    };

    const newImage = await ReviewImage.create({
        url,
        reviewId: review.id
    });

    res.json({
        id: newImage.id,
        url: newImage.url
    });
});

//Edit a review
router.put('/:reviewId', [requireAuth, validateReviewRequestBody], async(req, res, next) => {
    const userId = req.user.id;
    const currentReview = await Review.findByPk(req.params.reviewId);
    const { review, stars } = req.body;

    if (!currentReview) {
        const err = Error("Review couldn't be found");
        err.status = 404;
        next(err);
    };

    if (userId !== currentReview.userId) {
        const err = Error("Forbidden");
        err.status = 403;
        next(err);
    };

    currentReview.update({
        review,
        stars
    });

    res.json(currentReview);
});

//Delete a review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const userId = req.user.id;
    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        const err = Error("Review couldn't be found");
        err.status = 404;
        next(err);
    };

    if (userId !== review.userId) {
        const err = Error("Forbidden");
        err.status = 403;
        next(err);
    };

    review.destroy();
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
});

module.exports = router;