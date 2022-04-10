const router = require('express').Router();

const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriends,
  removeFriends,
} = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:userId').get(getUsersById).put(updateUsers).delete(deleteUsers);

router
  .route('/:userId/friends/:friendId')
  .post(addFriends)
  .delete(removeFriends);

module.exports = router;
