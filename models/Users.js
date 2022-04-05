const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  thoughts: {
    // Array of _id values referencing the Thought model
  },
  friends: {
    // Array of _id values referencing the User model (self-reference)
  },
});

const Users = model('Users', UsersSchema);

module.exports = Users;
