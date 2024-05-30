const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(100).required(),
  birthday: Joi.date().iso(),
  height: Joi.number().positive(),
  weight: Joi.number().positive(),
  jenisKelamin: Joi.string().valid("Laki-laki", "Perempuan"),
});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  name: Joi.string().min(3).max(100).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { userSchema, registerSchema, loginSchema };
