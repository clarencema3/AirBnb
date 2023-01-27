const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors, createReviewValidationErrors } = require('../../utils/validation');
const router = express.Router();


//Get all of the current user's bookings
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

router.put('/:bookingId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const booking = await Booking.findByPk(req.params.bookingId);
    const { startDate, endDate } = req.body;
    const startDateObj = new Date(startDate.toString());
    const endDateObj = new Date(endDate.toString())
    const startTime = startDateObj.getTime();
    const endTime = endDateObj.getTime();
    console.log(booking)
    if (!booking) {
        res.status(404);
        return res.json({
            message: 'Booking couldn\'t be found',
            statusCode: 404
        })
    }
    
    if (userId !== booking.userId) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    };

    if (startTime > endTime) {
        res.status(400);
        return res.json({
            message: 'Validation error',
            statusCode: 400,
            errors: {
                endDate: 'endDate cannot come before startDate'
            }
        })
    }
    
    const currentStartStr = booking.startDate.toDateString();
    const currentEndStr = booking.endDate.toDateString();
    const currentStartDateObj = new Date(currentStartStr);
    const currentEndDateObj = new Date(currentEndStr);
    const currentStartTime = currentStartDateObj.getTime();
    const currentEndTime = currentEndDateObj.getTime();

    if (currentEndTime < startTime) {
        res.status(403);
        return res.json({
            message: 'Past bookings can\'t be modified',
            statusCode: 403
        })
    }

    if ((startTime >= currentStartTime && startTime <= currentEndTime) || 
            startTime === currentStartTime || 
            startTime === currentEndTime) {
        res.status(403);
        return res.json({
            message: 'Sorry, this spot is already booked for the specified dates',
            statusCode: 403,
            errors: {
                startDate: 'Start date conflicts with an existing booking'
            }
        })
    }

    if ((endTime <= currentEndTime && endTime >= currentStartTime) ||
            endTime === currentStartTime ||
            endTime === currentEndTime) {
        res.status(403);
        return res.json({
            message: 'Sorry, this spot is already booked for the specified dates',
            statusCode: 403,
            errors: {
                endDate: 'End date conflicts with an existing booking'
            }
        })
    }

    booking.update({
        startDate,
        endDate
    });

    return res.json(booking)
});

router.delete('/:bookingId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const currentDate = Date.now();
    const booking = await Booking.findByPk(req.params.bookingId, {
        include: [
            { model: Spot }
        ]
    });

    if (!booking) {
        res.status(404);
        return res.json({
            message: 'Booking couldn\'t be found',
            statusCode: 404
        })
    };

    if (currentDate > booking.startDate && currentDate < booking.endDate) {
        res.status(403);
        return res.json({
            message: 'Bookings that have been started can\'t be deleted',
            statusCode: 403
        })
    }

    if (userId === booking.userId || userId === booking.Spot.ownerId) {
        booking.destroy();
        res.status(200)
        return res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    };
    
    res.status(403);
    res.json({
        message: 'Forbidden',
        statusCode: 403
    })

})

module.exports = router;