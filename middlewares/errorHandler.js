const { errMessage, validationError } = require('../errors/err-messages');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;

  if (err.code === 11000) {
    return res.status(409).json({ err: errMessage[409] });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ err: validationError });
  }

  if (status === 500) {
    return res.status(status).json({ err: errMessage[500] });
  }
  res.status(status).json({ err: message });
  return next();
};

module.exports = {
  errorHandler,
};
