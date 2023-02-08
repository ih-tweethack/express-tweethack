const Tweet = require('../models/Tweet.model');
const Like = require('../models/Like.model');

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

module.exports.like = (req, res, next) => {
  const user = req.user.id;
  const tweet = req.params.id;

  const like = {
    user,
    tweet
  };

  // Buscar si ya existe uno
  Like.findOne({ user, tweet })
    .then(dbLike => {
      if (dbLike) {
        return Like.findByIdAndDelete(dbLike.id) // Borrar el like = dislike
          .then((createdLike) => {
            res.status(204).json({ like: createdLike })
          })
      } else {
        return Like.create(like)
          .then(() => {
            res.status(201).json({ ok: true })
          })
      }
    })
    .catch(err => next(err))
}