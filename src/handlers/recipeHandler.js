const { firestore, storeData } = require("../services/firestore")

const getAllRecipe = async (request, h) => {
    const recipes = await firestore.collection("recipes").get()
    const data = []
    recipes.forEach((doc) => {
        const recipe = doc.data()
        data.push({
            id: recipe.id,
            name: recipe.name,
            image: recipe.image,
            kategori: recipe.kategori || 0, // Default value 0 if not provided
            porsi: recipe.porsi || 1, // Default value 1 if not provided
            langkah: recipe.steps || [], // Default empty array if not provided
            bahan: recipe.ingredients || [], // Default empty array if not provided
            nutrisi: recipe.nutrition || {}, // Default empty object if not provided
            createdAt: recipe.createdAt,
            updatedAt: recipe.updatedAt,
        })
    })

    return h.response({
        status: "success",
        message: "All Recipes found",
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
        message: "Recipe found",
        data: {
            id: data.id,
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

const getRecipeByName = async (request, h) => {
    const { name } = request.params

    if (!name) {
        return h
            .response({
                status: "fail",
                message: "Name is required",
            })
            .code(400)
    }

    const recipe = await firestore.collection("recipes").doc(name).get()

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
        message: "Recipe found",
        data: {
            id: data.id,
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

    const recipes = await firestore.collection("recipes").get()
    const newId = `R${recipes.size + 1}`

    const createdAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()

    const data = {
        id: newId,
        name,
        image,
        steps: steps || [], // Use provided steps or default to empty array
        ingredients: ingredients || [], // Use provided ingredients or default to empty array
        nutrition: nutrition || {}, // Use provided nutrition or default to empty object
        createdAt,
        updatedAt,
    }

    await storeData("recipes", newId, data)

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
                message: "Id Recipe is required",
            })
            .code(400)
    }

    await firestore.collection("recipes").doc(id).delete()

    return h.response({
        status: "success",
        message: "Recipe deleted",
    })
}

module.exports = { getAllRecipe, getRecipe, getRecipeByName, createRecipe, deleteRecipe }
