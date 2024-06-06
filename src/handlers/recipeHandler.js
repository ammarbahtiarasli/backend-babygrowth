const { firestore, storeData } = require("../services/firestore")
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

    const data = recipe.data()
    return h.response({
        status: "success",
        data: {
            id_resep: data.id,
            name: data.name,
            image: data.image,
            kategori: data.kategori || 0, // Default value 0 if not provided
            porsi: data.porsi || 1, // Default value 1 if not provided
            langkah: data.steps || [], // Default empty array if not provided
            bahan: data.ingredients || [], // Default empty array if not provided
            nutrisi: data.nutrition || {}, // Default empty object if not provided
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        },
    })
}

const createRecipe = async (request, h) => {
    const { name, image, steps, ingredients, nutrition } = request.payload

    if (!name || !image || !steps || !ingredients || !nutrition) {
        return h
            .response({
                status: "fail",
                message: "Name, image, steps, ingredients, and nutrition are required",
            })
            .code(400)
    }

    const id = `R${crypto.randomUUID()}`
    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const data = {
        id,
        name,
        image,
        steps: steps || [], // Use provided steps or default to empty array
        ingredients: ingredients || [], // Use provided ingredients or default to empty array
        nutrition: nutrition || {}, // Use provided nutrition or default to empty object
        createdAt,
        updatedAt,
    }

    await storeData("recipes", id, data)

    return h.response({
        status: "success",
        message: "Recipe created",
        data,
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
