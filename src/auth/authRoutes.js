const { options } = require("joi")
const authController = require("../controllers/authController")

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
    {
        method: "PUT",
        path: "/profile/edit",
        handler: authController.edit,
    },
    {
        method: "GET",
        path: "/profile/{id}",
        handler: authController.show,
    },
    {
        method: "POST",
        path: "/logout",
        handler: authController.logout,
    },
]

module.exports = authRoutes
