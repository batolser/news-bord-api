const { Joi } = require('celebrate');

module.exports = {
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().max(24).regex(/^[0-9a-fA-F]{24}$/),
  }),
};
