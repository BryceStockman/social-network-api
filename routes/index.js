const router = require('express').Router();
const apiRoutes = require('./api/user-routes');

router.use('/', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
