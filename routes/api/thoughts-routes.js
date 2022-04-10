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
  .route('/:thoughtsId')
  .get(getThoughtsById)
  .delete(removeThoughts)
  .put(updateThoughts);

router.route('/:thoughtsId/reactions').post(addReactions);

router.route('/:thoughtsId/reactions/:reactionId').delete(removeReactions);

module.exports = router;
