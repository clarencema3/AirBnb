const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, sequelize, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, createSpotValidationErrors } = require('../../utils/validation');
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

const validateRequestBody = [
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
router.post('/', [requireAuth, validateRequestBody], async(req, res) => {
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

//Add an image to a spot based on spot's id
router.post('/:spotId/images', requireAuth, async(req, res) => {
    const user = req.user;
    const { url, preview } = req.body;
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
            ownerId: user.id
        }
    });
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
router.put('/:spotId', [requireAuth, validateRequestBody], async(req, res) => {
    const user = req.user;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
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
})


module.exports = router;