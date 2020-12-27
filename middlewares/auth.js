const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');
const { errMessage } = require('../errors/err-messages');


module.exports = (req, res, next) => {
  // const token = req.cookies.jwt;
  // if (!token) {
  //   throw new UnauthorizedError(errMessage[401].auth);
  // }

  // let payload;
  // try {
  //   payload = jwt.verify(token, JWT_SECRET);
  // } catch (err) {
  //   next(err);
  // }
  // req.user = payload;
  // return next();

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errMessage[401].auth);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(err);
  }

  req.user = payload;

 return next();
};
