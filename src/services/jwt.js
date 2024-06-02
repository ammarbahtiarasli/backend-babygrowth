const jwt = require("@hapi/jwt")
require("dotenv").config()

const secretKey = process.env.SECRET_KEY

const generateToken = (payload) => {
    return jwt.token.generate(payload, { key: secretKey, algorithm: "HS256" })
}

const verifyToken = (token) => {
    try {
        return jwt.token.decode(token, { key: secretKey, algorithms: ["HS256"] })
    } catch (error) {
        return error.message
    }
}

module.exports = { generateToken, verifyToken }
