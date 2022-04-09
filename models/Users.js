const { Schema, model } = require('mongoose');

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const UsersSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [validateEmail, 'Please use a valid email address'],
      match: [
        /^\w+([\.-]?\w)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please use a valid email address',
      ],
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const Users = model('Users', UsersSchema);

UsersSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

module.exports = Users;
