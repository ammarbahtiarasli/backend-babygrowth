const authHandler = require("../handlers/authHandler");

const authRoutes = [
  {
    method: "POST",
    path: "/login",
    options: {
      auth: false,
    },
    handler: authHandler.login,
  },
  {
    method: "POST",
    path: "/register",
    options: {
      auth: false,
    },
    handler: authHandler.register,
  },
  {
    method: "GET",
    path: "/profile",
    handler: authHandler.profile,
  },
  {
    method: "POST",
    path: "/profile",
    handler: authHandler.postProfile,
  }
];

module.exports = authRoutes;
