const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/* Main route */
router.get('/', (req, res, next) => res.send('Hello world'))

/* Auth */
router.get('/signup', authMiddleware.isNotAuthenticated, authController.signup);
router.post('/signup', authMiddleware.isNotAuthenticated, authController.doSignup);

router.get('/login', authMiddleware.isNotAuthenticated, authController.login);
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin);

router.get('/logout', authMiddleware.isAuthenticated, authController.doLogout);

/* User */
router.get('/timeline', authMiddleware.isAuthenticated, userController.timeline);

module.exports = router;
