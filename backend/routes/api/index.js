const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js')
const bookingsRouter = require('./bookings.js');
const spotImagesRouter = require('./spot-images.js');
const { restoreUser } = require('../../utils/auth.js');
router.use(restoreUser);

router.use('/users', usersRouter);
router.use('/session', sessionRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImagesRouter);
// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
// });



module.exports = router;