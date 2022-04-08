const router = require('express').Router();
const {
  addThoughts,
  removeThoughts,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughts-controller');

router.route('/:userId').post(addThoughts);

router.route('/:userId/:thoughtsId').put(addReaction).delete(removeThoughts);

router.route('/:userId/:thoughtsId/:reactionId').delete(removeReaction);

module.exports = router;
