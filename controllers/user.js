const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = require('../config');

const UnauthorizedError = require('../errors/unauthorized-err');
const { errMessage } = require('../errors/err-messages');

module.exports.signUp = (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)

    .then((hash) => User.create({

      email,
      password: hash,
      name,

    }))
    .then((user) => res.send({ _id: user._id, name, email }))
    .catch(next);
};

module.exports.singIn = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  const { name } = user;
  User.findOne({ email }).select('+password')
    .then((u) => {
      user = u;
      if (!u) {
        throw new UnauthorizedError(errMessage[401].sing);
      }

      return bcrypt.compare(password, u.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new UnauthorizedError(errMessage[401].sing);
      }
      return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
      });
      return res.send({ token, name });
    })
    .catch(next);
};


module.exports.usersMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      const { name, email } = user;
      return res.send({ name, email });
    })
    .catch(next);
};
