const recipeHandler = require("../handlers/recipeHandler")

const recipeRoutes = [
    // kebutuhan MD
    {
        method: "GET",
        path: "/recipe",
        handler: recipeHandler.getAllRecipe,
    },
    {
        method: "GET",
        path: "/recipe/{id}",
        handler: recipeHandler.getRecipe,
    },
    // kebutuhan internal
    {
        method: "POST",
        path: "/recipe",
        options: {
            auth: false
        },
        handler: recipeHandler.createRecipe,
    },
    {
        method: "DELETE",
        path: "/recipe/{id}",
        handler: recipeHandler.deleteRecipe,
    },
]

module.exports = recipeRoutes
