require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const createError = require('http-errors');

/* DB connection */
require('./config/db.config');
require('./config/hbs.config.js');

const app = express();

app.use(logger('dev')); // logger de morgan para ver las peticiones que se hacen
app.use(express.urlencoded({ extended: false })); // para que el body de las peticiones se pueda leer

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

/** Configure static files */
app.use(express.static('public'));

/* Routes */

const router = require('./config/routes.config');
app.use('/', router)

/* Errors middlewares */

app.use((req, res, next) => {
  next(createError(404, 'Resource not found'));
});

app.use((error, req, res, next) => {
  console.log(error)
  let status = error.status || 500;

  res.status(status).render('error', {
    message: error.message,
    error: req.app.get('env') === 'development' ? error : {}
  })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
