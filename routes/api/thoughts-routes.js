const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  removeThoughts,
  updateThoughts,
  addReactions,
  removeReactions,
} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts).post(addThoughts);

router
  .route('/:id')
  .get(getThoughtsById)
  .delete(removeThoughts)
  .put(updateThoughts);

router.route('/:usersId').post(addThoughts);

router.route('/:usersId/:thoughtsId').put(addReactions).delete(removeThoughts);

router.route('/:usersId/:thoughtsId/:reactionId').delete(removeReactions);

module.exports = router;
