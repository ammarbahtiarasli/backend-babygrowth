const { generateToken } = require("../services/jwt")
const { firestore } = require("../services/firestore")
const crypto = require("crypto")

const getAllRecipe = async (request, h) => {
    const recipes = await firestore.collection("recipes").get()
    const data = []
    recipes.forEach((doc) => {
        data.push(doc.data())
    })

    return h.response({
        status: "success",
        data,
    })
}

const getRecipe = async (request, h) => {
    const { id } = request.params

    if (!id) {
        return h
            .response({
                status: "fail",
                message: "Id is required",
            })
            .code(400)
    }

    const recipe = await firestore.collection("recipes").doc(id).get()

    if (!recipe.exists) {
        return h
            .response({
                status: "fail",
                message: "Recipe not found",
            })
            .code(404)
    }

    return h.response({
        status: "success",
        data: recipe.data(),
    })
}

const createRecipe = async (request, h) => {
    const { name, image, kategori, porsi, langkah, bahan, nutrisi } = request.payload

    if (!name || !image || !kategori || !porsi || !langkah || !bahan || !nutrisi) {
        return h
            .response({
                status: "fail",
                message: "Name, Image, Kategori, Porsi, Langkah, Bahan and Nutrisi are required",
            })
            .code(400)
    }

    const id = crypto.randomUUID(`R${id}`)
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const data = {
        id,
        name,
        image,
        kategori,
        porsi,
        langkah,
        bahan,
        nutrisi,
        createdAt,
        updatedAt,
    }

    await firestore.collection("recipes").doc(id).set(data)

    return h.response({
        status: "success",
        message: "Recipe created",
        data: data,
    })
}

const deleteRecipe = async (request, h) => {
    const { id } = request.params

    if (!id) {
        return h
            .response({
                status: "fail",
                message: "Id is required",
            })
            .code(400)
    }

    await firestore.collection("recipes").doc(id).delete()

    return h.response({
        status: "success",
        message: "Recipe deleted",
    })
}

module.exports = { getAllRecipe, getRecipe, createRecipe, deleteRecipe }
