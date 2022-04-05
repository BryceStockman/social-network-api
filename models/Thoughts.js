const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
    },
    reactions: {
      type: Array,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtSchema);

module.exports = Thoughts;
