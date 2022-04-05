const { Thoughts, User } = require('../models');

const thoughtsController = {
  // add comment to user
  addThoughts({ params, body }, res) {
    console.log(body);
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // remove comment
  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then((deletedThoughts) => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: 'No Thoughts with this id!' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { Thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;