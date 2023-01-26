const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors, createReviewValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const image = await ReviewImage.findByPk(req.params.imageId, {
        include: [
            { model: Review }
        ]
    });

    if (!image) {
        res.status(404);
        return res.json({
            message: 'Review Image couldn\'t be found',
            statusCode: 404
        })
    };

    if (userId !== image.Review.userId) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    };

    image.destroy();
    res.status(200);
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
})


module.exports = router;