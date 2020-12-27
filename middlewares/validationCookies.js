const { Joi } = require('celebrate');

module.exports = {
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
};
