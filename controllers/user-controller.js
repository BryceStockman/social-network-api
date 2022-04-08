const { Users } = require('../models');

const userController = {
  // get all Users networks
  getAllUsers(req, res) {
    Users.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one Users by id
  getUsersById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .select('-__v')
      .then((dbUsersData) => {
        // If no Users is found, send 404
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

  // createUsers
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(400).json(err));
  },

  // update Users by id
  updateUsers({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete Users
  deleteUsers({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
