const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');

/* Main route */
router.get('/', (req, res, next) => res.send('Hello world'))

/* Auth */
router.get('/signup', authController.signup);
router.post('/signup', authController.doSignup);

router.get('/login', authController.login);
router.post('/login', authController.doLogin);

router.get('/logout', authController.doLogout);

/* User */
router.get('/timeline', userController.timeline);

module.exports = router;