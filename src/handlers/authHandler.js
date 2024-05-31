const { request } = require("http");
const { generateToken } = require("../services/jwt");
const crypto = require("crypto");
const users = require("../models/userModel");

const register = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h
      .response({
        status: "fail",
        message: "Email and password are required",
      })
      .code(400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return h
      .response({
        status: "fail",
        message: "Invalid email format",
      })
      .code(400);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    email,
    password,
    createdAt,
  };

  users.push(data); // Simpan pengguna baru ke array users

  return h
    .response({
      status: "success",
      message: "User created",
      data,
    })
    .code(201);
};

// Login
const login = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h
      .response({
        status: "fail",
        message: "Email and password are required",
      })
      .code(400);
  }

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return h
      .response({
        status: "fail",
        message: "Invalid email or password",
      })
      .code(401);
  }

  const token = generateToken({ email });

  const data = {
    id: user.id,
    email: user.email,
    token,
  };

  return h
    .response({
      status: "success",
      message: "User login",
      data,
    })
    .code(200);
};

module.exports = { register, login };
