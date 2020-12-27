const router = require('express').Router();
const articleRouter = require('./article');
const usersRouter = require('./user');
const NotFoundError = require('../errors/not-found-err');
const { errMessage } = require('../errors/err-messages');

router.use('/', articleRouter);
router.use('/', usersRouter);
router.use((req, res, next) => {
  next(new NotFoundError(errMessage[404].source));
});
module.exports = router;
