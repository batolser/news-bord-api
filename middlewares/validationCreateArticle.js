const { Joi } = require('celebrate');

module.exports = {
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i),
    image: Joi.string().required()
      .regex(/(https?:\/\/)(www\.)?((\w+\.\w{2,})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d{2,5})?.*#?/i),
  }),
};
