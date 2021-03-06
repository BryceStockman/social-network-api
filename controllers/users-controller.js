const { Users, Thoughts } = require('../models');

const userController = {
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: 'thoughts',
      })
      .select('-__v')
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
      })
      .select('-__v')
      .populate({
        path: 'friends',
      })
      .select('-__v')
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $set: body },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        return Thoughts.deleteMany({ _id: { $in: dbUsersData.thoughts } });
      })
      .then(() => {
        // If there is an error here I can insert a message here instead
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriends({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $push: { friends: params.friendsId } },
      { new: true, runValidators: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this ID!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.json(err));
  },

  removeFriends({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.usersId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;
