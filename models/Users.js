const { Schema, model } = require('mongoose');

const UsersSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Users = model('Users', UsersSchema);

module.exports = Users;
