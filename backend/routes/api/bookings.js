const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors, createReviewValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            { model: Spot,
              attributes: [
                'id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'
              ],
              include: [
                { model: SpotImage }
              ]
            }
        ]
    })

    const Bookings = [];
    for (let booking of bookings) {
        Bookings.push(booking.toJSON())
    };

    for (let booking of Bookings) {
        for (let spotImage of booking.Spot.SpotImages) {
            if (spotImage.preview === true) {
                booking.Spot.previewImage = spotImage.url
            }
            if (spotImage.preview === false) {
                booking.Spot.previewImage = 'No preview available'
            }
            delete booking.Spot.SpotImages
        }
    }
    res.json({Bookings})
});

module.exports = router;