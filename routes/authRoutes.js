const authController = require("../controllers/authController");

const authRoutes = [
  {
    method: "POST",
    path: "/register",
    options: {
        auth: false,
        },
    handler: authController.register,
  },
  {
    method: "POST",
    path: "/login",
    options: {
        auth: false,
        },
    handler: authController.login,
  },
];

module.exports = authRoutes;
