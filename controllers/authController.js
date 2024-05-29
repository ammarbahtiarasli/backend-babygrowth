const bcrypt = require("bcryptjs");
const jwt = require("@hapi/jwt");
const users = require("../models/userModel");
const { userSchema } = require("../utils/validators");
require("dotenv").config(); // Memuat variabel lingkungan dari .env file

const register = async (request, h) => {
  const {
    username,
    password,
    email,
    name,
    birthday,
    height,
    weight,
    jenisKelamin,
  } = request.payload;

  // Validasi input
  const { error } = userSchema.validate({
    username,
    password,
    email,
    name,
    birthday,
    height,
    weight,
    jenisKelamin,
  });
  if (error) {
    return h.response({ error: error.details[0].message }).code(400);
  }

  // Cek apakah pengguna sudah ada
  const userExists = users.find(
    (user) => user.username === username || user.email === email
  );
  if (userExists) {
    return h.response({ error: "User already exists" }).code(400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan pengguna baru
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    email,
    name,
    birthday,
    height,
    weight,
    jenisKelamin,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  users.push(newUser);

  // Buat JWT
  const token = jwt.token.generate(
    { aud: "urn:audience:test", iss: "urn:issuer:test", user: newUser.id },
    { key: process.env.JWT_SECRET, algorithm: "HS256" }
  );

  return h
    .response({
      message: "User registered successfully",
      loginResult: {
        userID: newUser.id,
        name: newUser.name,
        token,
        username: newUser.username,
        email: newUser.email,
        birthday: newUser.birthday,
        height: newUser.height,
        weight: newUser.weight,
        jenisKelamin: newUser.jenisKelamin,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    })
    .code(201);
};

const login = async (request, h) => {
  const { username, password } = request.payload;

  // Validasi input
  const { error } = userSchema.validate({ username, password });
  if (error) {
    return h.response({ error: error.details[0].message }).code(400);
  }

  // Cari pengguna
  const user = users.find((user) => user.username === username);
  if (!user) {
    return h.response({ error: "Invalid username or password" }).code(400);
  }

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return h.response({ error: "Invalid username or password" }).code(400);
  }

  // Update updatedAt
  user.updatedAt = new Date().toISOString();

  // Buat JWT
  const token = jwt.token.generate(
    { aud: "urn:audience:test", iss: "urn:issuer:test", user: user.id },
    { key: process.env.JWT_SECRET, algorithm: "HS256" }
  );

  return h
    .response({
      message: "Login successful",
      loginResult: {
        userID: user.id,
        name: user.name,
        token,
        username: user.username,
        email: user.email,
        birthday: user.birthday,
        height: user.height,
        weight: user.weight,
        jenisKelamin: user.jenisKelamin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
    .code(200);
};

module.exports = { register, login };
