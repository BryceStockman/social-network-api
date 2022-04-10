// Definitely need help with this one

const router = require('express').Router();
const userRoutes = require('./users-routes');
const thoughtRoutes = require('./thoughts-routes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// router.use((req, res) => {
//   res.status(404).send('<h1>😝 404 Error!</h1>');
// });

module.exports = router;
