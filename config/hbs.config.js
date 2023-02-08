const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isOwner', function (options) {
  const { currentUser, tweetOwnerId } = options.hash;

  if (currentUser && currentUser.id === tweetOwnerId) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})

hbs.registerHelper('hasLike', function (options) {
  const { currentUser, tweet } = options.hash;

  // like.tweet no es de tipo string, es de tipo object porque es un objectId
  // así que le metemos un .toString() y asi se compara guay
  if (currentUser.likes.some(like => like.tweet.toString() === tweet.id)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})