const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
];

//Get All Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review }
        ]
    });

    const spotList = [];
    for (let spot of spots) {
        spotList.push(spot.toJSON())
    }

    for (let spot of spotList) {
        const average = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: [
                    [ sequelize.fn('AVG', sequelize.col('stars')), 'avgRating' ]
                ],
                group: ['Review.id']
            }
        })
        spot.avgRating = average[0].dataValues.avgRating;
        delete spot.Reviews;

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url
            }
            if (image.preview === false) {
                spot.previewImage = 'no url available'
            }
            delete spot.SpotImages;
        })
    }
    
    res.json(spotList)
});

module.exports = router;