require("dotenv").config()
const Hapi = require("@hapi/hapi")
const Jwt = require("@hapi/jwt")
const authRoutes = require("../routes/authRoutes")
const { verifyToken } = require("../services/jwt")
const fs_users = require("../services/firestore")

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        }
    })

    // Register plugin JWT
    await server.register(Jwt)

    // Deklarasi strategi autentikasi
    server.auth.strategy("jwt", "jwt", {
        keys: process.env.JWT_SECRET,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15,
        },
        validate: async (artifacts, request, h) => {
            try {
                const decoded = await verifyToken(artifacts.token) // Menunggu hasil verifikasi token
                if (!decoded) {
                    return { isValid: false }
                }

                const userSnapshot = await fs_users
                    .collection("users")
                    .doc(artifacts.decoded.payload.id)
                    .get()
                if (!userSnapshot.exists) {
                    return { isValid: false }
                }

                return { isValid: true, credentials: { user: userSnapshot.data() } }
            } catch (err) {
                return { isValid: false }
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
