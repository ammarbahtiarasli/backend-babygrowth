const { generateToken } = require("../services/jwt")
const fs_users = require("../services/firestore")
const crypto = require("crypto")

const register = async (request, h) => {
    const { username, email, password } = request.payload

    if (!email || !password || !username) {
        return h
            .response({
                status: "fail",
                message: "Username, Email and Password are required",
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

    if (password.length < 6) {
        return h
            .response({
                status: "fail",
                message: "Password must be at least 6 characters",
            })
            .code(400)
    }

    const userSnapshot = await fs_users
        .collection("users")
        .where("email", "==", email)
        .get()

    if (!userSnapshot.empty) {
        return h
            .response({
                status: "fail",
                message: "Email already registered",
            })
            .code(409)
    }

    const id = crypto.randomUUID()
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const data = {
        id,
        username,
        email,
        password,
        name: null,
        birthday: null,
        height: null,
        weight: null,
        gender: null,
        createdAt,
        updatedAt,
    }

    await fs_users.collection("users").doc(id).set(data)

    return h
        .response({
            status: "success",
            message: "User created",
            data,
        })
        .code(201)
}

//login
// const login = async (request, h) => {
//     const { email, password } = request.payload

//     if (!email || !password) {
//         return h
//             .response({
//                 status: "fail",
//                 message: "Email and password are required",
//             })
//             .code(400)
//     }

//     const userSnapshot = await fs_users
//         .collection("users")
//         .where("email", "==", email)
//         .get()

//     if (userSnapshot.empty) {
//         return h
//             .response({
//                 status: "fail",
//                 message: "User not found",
//             })
//             .code(401)
//     }

//     const user = userSnapshot.docs[0].data()

//     if (user.password !== password) {
//         // Simple password check, consider hashing passwords for better security
//         return h
//             .response({
//                 status: "fail",
//                 message: "Invalid email or password",
//             })
//             .code(401)
//     }

//     const token = generateToken({ id: user.id, email: user.email })

//     const data = {
//         id: user.id,
//         username: user.username,
//         email: user.email,
//         name: user.name,
//         birthday: user.birthday,
//         height: user.height,
//         weight: user.weight,
//         gender: user.gender,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//         token,
//     }

//     return h
//         .response({
//             status: "success",
//             message: "User login success",
//             data,
//         })
//         .code(200)
// }





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

    const userSnapshot = await fs_users
        .collection("users")
        .where("email", "==", email)
        .get()

    if (userSnapshot.empty) {
        return h
            .response({
                status: "fail",
                message: "Login failed. Please check your credentials.",
            })
            .code(401)
    }

    const user = userSnapshot.docs[0].data()

    if (user.password !== password) {

        return h
            .response({
                status: "fail",
                message: "Login failed. Please check your credentials.",
            })
            .code(401)
    }

    const token = generateToken({ id: user.id, email: user.email})

    return h
        .response({
            status: "success",
            message: "User login success",
            data: token,
        })
        .code(200)
}

// profile
const profile = async (request, h) => {
    const user = request.auth.credentials.user

    const data = {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        birthday: user.birthday,
        height: user.height,
        weight: user.weight,
        gender: user.gender,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }

    return h
        .response({
            status: "success",
            message: "User authenticated",
            data: data,
        })
        .code(200)
}

const postProfile = async (request, h) => {
    const { name, birthday, height, weight, gender } = request.payload

    const user = request.auth.credentials.user
    const id = user.id
    const updatedAt = new Date().toISOString()

    const data = {
        name,
        birthday,
        height,
        weight,
        gender,
        updatedAt,
    }

    await fs_users.collection("users").doc(id).update(data)

    return h
        .response({
            status: "success",
            message: "User profile updated",
            data,
        })
        .code(200)
}

module.exports = { register, login, profile, postProfile }
