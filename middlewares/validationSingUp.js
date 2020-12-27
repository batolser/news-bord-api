const { Joi } = require('celebrate');

module.exports = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30)
      .required(),
  }),
};
