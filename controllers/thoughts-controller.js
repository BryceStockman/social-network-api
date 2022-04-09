const { Thoughts, User } = require('../models');

const thoughtsController = {
  // Need help with the get
  getAllThoughts({ params }, res) {
    Thoughts.find({ _id: params.thoughtsId })
      .populate({
        path: 'thoughtText',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Need help with the get
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.thoughtsId })
      .populate({
        path: 'thoughtText',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
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

  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedThoughts) => {
        if (!updatedThoughts) {
          return res.status(404).json({ message: 'No thoughts with this id!' });
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

  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then((deletedThoughts) => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: 'No thoughts with this id!' });
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

  removeReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { replyId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
