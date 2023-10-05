const Joi = require("joi");

class AuthValidator {
  loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  signupSchema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
  });
}

module.exports = AuthValidator;
