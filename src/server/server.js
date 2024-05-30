require("dotenv").config()
const Hapi = require("@hapi/hapi")
const Jwt = require("@hapi/jwt")
const authRoutes = require("../routes/authRoutes")

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    })

    // Register plugin JWT
    await server.register(Jwt)

    // Deklarasi strategi autentikasi
    server.auth.strategy("jwt", "jwt", {
        keys: process.env.JWT_SECRET, // Menggunakan kunci rahasia dari variabel lingkungan
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15,
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user },
            }
        },
    })

    server.auth.default("jwt")

    // Register routes
    server.route(authRoutes)

    await server.start()
    console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", (err) => {
    console.log(err)
    process.exit(1)
})

init()
