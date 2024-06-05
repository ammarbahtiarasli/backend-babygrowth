const { firestore } = require("../services/firestore");
const crypto = require("crypto");

const getAllRecipe = async (request, h) => {
  const recipes = await firestore.collection("datarecipes").get();
  const data = [];
  recipes.forEach((doc) => {
    data.push(doc.data());
  });

  return h.response({
    status: "success",
    data,
  });
};

const getRecipe = async (request, h) => {
  const { id } = request.params;

  if (!id) {
    return h
      .response({
        status: "fail",
        message: "Id is required",
      })
      .code(400);
  }

  const recipe = await firestore.collection("datarecipes").doc(id).get();

  if (!recipe.exists) {
    return h
      .response({
        status: "fail",
        message: "Recipe not found",
      })
      .code(404);
  }

  return h.response({
    status: "success",
    data: recipe.data(),
  });
};

const createRecipe = async (request, h) => {
  const { name, image, kategori, porsi, langkah, bahan, nutrisi } =
    request.payload;

  if (
    !name ||
    !image ||
    kategori === undefined ||
    !porsi ||
    !langkah ||
    !bahan ||
    !nutrisi
  ) {
    return h
      .response({
        status: "fail",
        message:
          "Name, Image, Kategori, Porsi, Langkah, Bahan and Nutrisi are required",
      })
      .code(400);
  }

  const id = `R${crypto.randomUUID()}`;
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

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
  };

  await firestore.collection("datarecipes").doc(id).set(data);

  return h.response({
    status: "success",
    message: "Recipe created",
    data: data,
  });
};

const updateRecipe = async (request, h) => {
  const { id } = request.params;
  const { name, image, kategori, porsi, langkah, bahan, nutrisi } =
    request.payload;

  if (!id) {
    return h
      .response({
        status: "fail",
        message: "Id is required",
      })
      .code(400);
  }

  if (
    !name ||
    !image ||
    kategori === undefined ||
    !porsi ||
    !langkah ||
    !bahan ||
    !nutrisi
  ) {
    return h
      .response({
        status: "fail",
        message:
          "Name, Image, Kategori, Porsi, Langkah, Bahan and Nutrisi are required",
      })
      .code(400);
  }

  const updatedAt = new Date().toISOString();

  const data = {
    name,
    image,
    kategori,
    porsi,
    langkah,
    bahan,
    nutrisi,
    updatedAt,
  };

  const recipeRef = firestore.collection("datarecipes").doc(id);
  const recipeSnapshot = await recipeRef.get();

  if (!recipeSnapshot.exists) {
    return h
      .response({
        status: "fail",
        message: "Recipe not found",
      })
      .code(404);
  }

  await recipeRef.update(data);

  return h
    .response({
      status: "success",
      message: "Recipe updated",
      data: { id, ...data },
    })
    .code(200);
};

const deleteRecipe = async (request, h) => {
  const { id } = request.params;

  if (!id) {
    return h
      .response({
        status: "fail",
        message: "Id is required",
      })
      .code(400);
  }

  await firestore.collection("datarecipes").doc(id).delete();

  return h.response({
    status: "success",
    message: "Recipe deleted",
  });
};

module.exports = {
  getAllRecipe,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
