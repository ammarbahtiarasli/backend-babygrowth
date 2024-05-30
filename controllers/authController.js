require("dotenv").config(); // Memuat variabel lingkungan dari .env file
const bcrypt = require("bcryptjs");
const jwt = require("@hapi/jwt");
const users = require("../models/userModel");
const {
  userSchema,
  registerSchema,
  loginSchema,
} = require("../utils/validators");

const register = async (request, h) => {
  const { username, password, email, name } = request.payload;

  // Validasi input pendaftaran
  const { error } = registerSchema.validate({
    username,
    name,
    password,
    email,
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
    birthday: null,
    height: null,
    weight: null,
    jenisKelamin: null,
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
        token,
        userID: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    })
    .code(201);
};

// Login dan editProfile tetap sama seperti sebelumnya

const login = async (request, h) => {
  const { email, password } = request.payload;

  // Validasi input login
  const { error } = loginSchema.validate({ email, password });
  if (error) {
    return h.response({ error: error.details[0].message }).code(400);
  }

  // Cari pengguna
  const user = users.find((user) => user.email === email);
  if (!user) {
    return h.response({ error: "Invalid email or password" }).code(400);
  }

  // Verifikasi password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return h.response({ error: "Invalid email or password" }).code(400);
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
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
    .code(200);
};

const logout = async (request, h) => {
  return h.response({ message: "Logout successful" }).code(200);
};

// editProfile tetap sama seperti sebelumnya

const editProfile = async (request, h) => {
  const { id } = request.auth.credentials;
  const { name, birthday, height, weight, jenisKelamin } = request.payload;

  // Cari pengguna
  const user = users.find((user) => user.id === id);
  if (!user) {
    return h.response({ error: "User not found" }).code(404);
  }

  // Edit data pengguna
  user.name = name || user.name;
  user.birthday = birthday || user.birthday;
  user.height = height || user.height;
  user.weight = weight || user.weight;
  user.jenisKelamin = jenisKelamin || user.jenisKelamin;
  user.updatedAt = new Date().toISOString();

  return h
    .response({
      message: "User profile updated successfully",
      updatedProfile: {
        userID: user.id,
        name: user.name,
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

module.exports = { register, login, logout, editProfile };
