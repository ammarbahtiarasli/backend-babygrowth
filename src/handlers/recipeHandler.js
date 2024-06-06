const storeData = require("../services/firestore")
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
    const { name, image } = request.payload

    if (!name || !image) {
        return h
            .response({
                status: "fail",
                message:
                    "Name and Image are required",
            })
            .code(400)
    }

    const recipeSnapshot = await firestore
        .collection("recipes")
        .where("id", "==", id)
        .get()

    if (!recipeSnapshot.empty) {
        return h
            .response({
                status: "fail",
                message: "Recipe already exists",
            })
            .code(409)
    }

    const id = `R${crypto.randomUUID()}`
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const data = {
        id,
        name,
        image,
        createdAt,
        updatedAt,
    }

    storeData("recipes", id, data)

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
