const Tweet = require('../models/Tweet.model');

module.exports.timeline = (req, res, next) => {
  // Tweet.find({ user: { $ne: req.user.id } })
  Tweet.find()
    .populate('user')
    .then(tweets => {
      res.render('user/timeline', { tweets });
    })
    .catch(err => next(err))
}

module.exports.profile = (req, res, next) => {
  Tweet.find({ user: req.user.id })
    .populate('user')
    .then(tweets => {
      res.render('user/profile', { tweets });
    })
    .catch(err => next(err))
}