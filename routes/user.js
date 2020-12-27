const usersRouter = require('express').Router();
const { celebrate } = require('celebrate');
const validationCookies = require('../middlewares/validationCookies');
const validationSingUp = require('../middlewares/validationSingUp');
const validationSingIn = require('../middlewares/validationSingIn');

const { signUp, singIn, usersMe } = require('../controllers/user');

const auth = require('../middlewares/auth');

usersRouter.post('/signup', celebrate(validationSingUp), signUp);
usersRouter.post('/signin', celebrate(validationSingIn), singIn);
usersRouter.get('/users/me', celebrate(validationCookies), auth, usersMe);

module.exports = usersRouter;
