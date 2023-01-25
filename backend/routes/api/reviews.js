const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, ReviewImage, Review, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
    }

    res.json({Reviews})
});



module.exports = router;