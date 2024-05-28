const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(100).required(),
  birthday: Joi.date().iso().required(),
  height: Joi.number().positive().required(),
  weight: Joi.number().positive().required(),
});

module.exports = { userSchema };
