const { request } = require("http")
const { generateToken } = require("../services/jwt")
const crypto = require("crypto")

const register = async (request, h) => {
    const { email, password } = request.payload

    if (!email || !password) {
        return h
            .response({
                status: "fail",
                message: "Email and password are required",
            })
            .code(400)
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return h
            .response({
                status: "fail",
                message: "Invalid email format",
            })
            .code(400)
    }

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()

    const data = {
        id,
        email,
        password,
        createdAt,
    }
    return {
        status: "success",
        message: "User created",
        data,
    }
}

// Login
const login = async (request, h) => {
    const { email, password } = request.payload

    if (!email || !password) {
        return h
            .response({
                status: "fail",
                message: "Email and password are required",
            })
            .code(400)
    }

    const token = generateToken({ email })

    const data = {
        id: user.id,
        email: user.email,
        token,
    }
        .response({
            status: "success",
            message: "User login",
            data,
        })
        .code(200)
}


module.exports = { register, login }
