const Tweet = require('../models/Tweet.model');
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
  res.render('user/new-tweet');
}

module.exports.doCreate = (req, res, next) => {
  const newTweet = {
    ...req.body,
    user: req.user.id
  }
  console.log({ newTweet });

  Tweet.create(newTweet)
    .then(tweet => {
      res.redirect('/timeline')
    })
    .catch(err => {
      if (mongoose.Error.ValidationError) {
        res.render('user/new-tweet', { tweet: req.body.body, errors: err.errors })
      }
      next(err)
    })
}