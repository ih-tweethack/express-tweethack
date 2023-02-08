const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Body of the tweet is required'],
      maxLength: [320, 'Max length must be 320 characters'],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'A tweet must have an user']
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

tweetSchema.virtual('likes', {
  ref: 'Like',
  foreignField: 'tweet',
  localField: '_id',
  justOne: false
})

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;