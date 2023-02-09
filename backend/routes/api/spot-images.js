const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage } = require('../../db/models');
const router = express.Router();

router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const userId = req.user.id;
    const image = await SpotImage.findByPk(req.params.imageId, {
        include: [
            { model: Spot }
        ]
    });

    if (!image) {
        const err = Error("Spot Image couldn't be found");
        err.status = 404;
        next(err);
    };

    if (userId !== image.Spot.ownerId) {
        const err = Error("Forbidden");
        err.status = 403;
        next(err);
    };

    image.destroy();
    res.status(200);
    res.json({
        message: 'Successfully deleted',
        statusCode: 200
    });
})


module.exports = router;