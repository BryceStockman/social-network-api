const { Thoughts, Users } = require('../models');

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
      .then((dbUsersData) => res.json(dbUsersData))
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
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return Users.findOneAndUpdate(
          { _id: params.usersId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  addReactions({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
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
        return Users.findOneAndUpdate(
          { _id: params.usersId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  removeThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.thoughtsId })
      .then((deletedThoughts) => {
        if (!deletedThoughts) {
          return res.status(404).json({ message: 'No thoughts with this id!' });
        }
        return Users.findOneAndUpdate(
          { _id: params.usersId },
          { $pull: { thoughts: params.thoughtsId } },
          { new: true }
        );
      })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  removeReactions({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtsId },
      { $pull: { reactions: { reactionsId: params.reactionsId } } },
      { new: true }
    )
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtsController;
