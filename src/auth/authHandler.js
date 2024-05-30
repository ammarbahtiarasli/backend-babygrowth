const { generateToken } = require("../services/jwt");
const crypto = require("crypto");

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
  const createAt = new Date().toISOString();

  const data = {
    id,
    email,
    password,
    createAt,
  };
  return {
    status: "success",
    message: "User created",
    data,
  };
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

  const token = generateToken({ id: user.id, email: user.email });
  const loginResult = {
    userId: user.id,
    email: user.email,
    token: token,
  };

  return {
    status: "success",
    message: "Login success",
    loginResult,
  };

  // const profile = async (request, h) => {
  //   return { user: request.auth.credentials.user };
  // };
};

module.exports = { register, login };
