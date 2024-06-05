const recipeHandler = require("../handlers/recipeHandler");

const recipeRoutes = [
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
  {
    method: "POST",
    path: "/recipe",
    handler: recipeHandler.createRecipe,
  },
  {
    method: "PUT",
    path: "/recipe/{id}",
    handler: recipeHandler.updateRecipe,
  },
  {
    method: "DELETE",
    path: "/recipe/{id}",
    handler: recipeHandler.deleteRecipe,
  },
];

module.exports = recipeRoutes;
