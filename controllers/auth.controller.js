const User = require('../models/User.model');
const mongoose = require('mongoose');

module.exports.signup = (req, res, next) => {
  res.render('auth/signup')
}

module.exports.doSignup = (req, res, next) => {
  const renderWithErrors = (errors) => {
    const userData = { ...req.body }
    delete userData.password
    delete userData.repeatPassword // Para que no se manden a la vista estos campos

    res.render('auth/signup', {
      user: userData,
      errors
    })
  }

  const { password, repeatPassword, username, email } = req.body;

  if (password && repeatPassword && password === repeatPassword) {
    // Todo guay
    User.findOne({ username, email })
      .then(user => {
        if (user) {
          renderWithErrors({ email: 'Username or email already in use' })
        } else {
          return User.create(req.body)
            .then(userCreated => {
              console.log({ userCreated })
              res.redirect('/login')
            })
        }
      })
      .catch(err => {
        if (err instanceof mongoose.Error.ValidationError) {
          renderWithErrors(err.errors)
        } else {
          next(err)
        }
      })
  } else {
    renderWithErrors({ password: 'Passwords don\'t match' })
  }
}

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
  res.redirect('/login');
}