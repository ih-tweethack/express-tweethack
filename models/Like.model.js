const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A like must have a user']
    },
    tweet: {
      type: mongoose.Types.ObjectId,
      ref: 'Tweet',
      required: [true, 'A like must have a tweet']
    }
  },
  {
    timestamps: true,
  }
)

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;