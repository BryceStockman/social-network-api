const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  addThoughts,
  removeThoughts,
  updateThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughts-controller');

router.route('/').get(getAllThoughts).post(addThoughts);

router
  .route('/:id')
  .get(getThoughtsById)
  .delete(removeThoughts)
  .put(updateThoughts);

router.route('/:userId').post(addThoughts);

router.route('/:userId/:thoughtsId').put(addReaction).delete(removeThoughts);

router.route('/:userId/:thoughtsId/:reactionId').delete(removeReaction);

module.exports = router;
