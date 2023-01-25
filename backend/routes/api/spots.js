const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, ReviewImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors, createReviewValidationErrors } = require('../../utils/validation');
const spot = require('../../db/models/spot');
const router = express.Router();

const validateReviewRequestBody = [
    check('review')
      .exists({ checkFalsy: true })
      .withMessage('Review text is required'),
    check('stars')
      .exists({ checkFalsy: true })
      .withMessage('Stars must be an integer from 1 to 5'),
    createReviewValidationErrors
];

const validateSpotRequestBody = [
    check('address')
      .exists({ checkFalsy: true })
      .withMessage('Street address is required'),
    check('city')
      .exists({ checkFalsy: true })
      .withMessage('City is required'),
    check('state')
      .exists({ checkFalsy: true })
      .withMessage('State is required'),
    check('country')
      .exists({ checkFalsy: true })
      .withMessage('Country is required'),
    check('lat')
      .exists({ checkFalsy: true })
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({ checkFalsy: true })
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price')
      .exists({ checkFalsy: true })
      .withMessage('Price per day is required'),
    createSpotValidationErrors
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
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        spot.avgRating = Number(average[0].dataValues.avgRating);
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

//Get all spots owned by the current user
router.get('/current', requireAuth, async(req, res) => {
    const user = req.user;
    const spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
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
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })
        spot.avgRating = Number(average[0].dataValues.avgRating);
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
    
    res.json({
        Spots: spotList
    })
});

//Get all reviews by spot's id
router.get('/:spotId/reviews', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url'] }
        ]
    })

    const Reviews = [];
    for (let review of reviews) {
        Reviews.push(review.toJSON())
    }


    res.json({Reviews})
})

//Get details of a Spot from an id
router.get('/:spotId', async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            { model: User }
        ]
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }
    const reviews = await Review.count({
        where: {
            spotId: req.params.spotId
        }
    })
    
    const average = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: [
            [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
        ]
    })
    
    const spotObj = spot.toJSON();
    
    spotObj.Owner = spotObj.User;
    delete spotObj.User;
    spotObj.avgStarRating = Number(average[0].dataValues.avgRating);
    spotObj.numReviews = reviews;
    
    res.json(spotObj)
});

//Create a spot
router.post('/', [requireAuth, validateSpotRequestBody], async(req, res) => {
    const user = req.user;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if (user) {
        const newSpot = await Spot.create({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
            ownerId: user.id
        });
        res.status(201);
        res.json(newSpot);
    }
});

//Create a review for a spot based on spot's id
router.post('/:spotId/reviews', [requireAuth, validateReviewRequestBody], async(req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        res.status(404);
        return res.json({
            message: 'Spot couldn\'t be found',
            statusCode: 404
        })
    }
    
    const user = req.user;
    const existingReviews = await Review.findAll({
        where: {
            spotId: spot.id,
        }
    })
    for (let review of existingReviews) {
        if (review.dataValues.userId === user.id) {
            res.status(403);
            return res.json({
                message: 'User already has a review for this spot',
                statusCode: 403
            })
        }
    }

    const { review, stars } = req.body;
    const newReview = await Review.create({
        review,
        stars,
        spotId: spot.id,
        userId: user.id
    })
    res.status(201);
    res.json(newReview)
})

//Add an image to a spot based on spot's id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const { url, preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const ownerId = spot.ownerId;

    if (userId !== ownerId) {
        res.status(403);
        res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found',
            statusCode: 404
        })
    }

    const newImage = await SpotImage.create({
        url,
        preview,
        spotId: spot.id
    })

    if (newImage) {
        res.send({
            "id": newImage.id,
            "url": newImage.url,
            "preview": newImage.preview
        })
    }
});

//Edit a Spot
router.put('/:spotId', [requireAuth, validateSpotRequestBody], async(req, res) => {
    const userId = req.user.id;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const ownerId = spot.ownerId;
    if (userId !== ownerId) {
        res.status(403);
        res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    if (!spot) {
      res.status(404);
      res.json({
         message: 'Spot couldn\'t be found',
         statusCode: 404
      })
    }
    spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    res.json(spot);
});

//Delete a Spot
router.delete('/:spotId', requireAuth, async(req, res) => {
    const userId = req.user.id;
    const spot = await Spot.findByPk(req.params.spotId);
    const ownerId = spot.ownerId;

    if (userId !== ownerId) {
        res.status(403);
        return res.json({
            message: 'Forbidden',
            statusCode: 403
        })
    }

    if (!spot) {
        res.status(404);
        res.json({
            message: 'Spot couldn\'t be found',
            statusCode: 404
        })
    } else {
        spot.destroy();
        res.status(200);
        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    }
});


module.exports = router;